import { Address, Job, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { IOptions, paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import { TJobFilters } from './job.types';

const createJob = async (
  payload: Job & Address & { skills: { skill: string; duration: number }[] },
  userId: string,
) => {
  const company = await prisma.company.findFirstOrThrow({
    where: {
      userId,
    },
  });

  await prisma.industry.findFirstOrThrow({
    where: {
      id: payload.industryId,
    },
  });

  await prisma.department.findFirstOrThrow({
    where: {
      id: payload.departmentId,
    },
  });
  const result = await prisma.$transaction(async transactionClient => {
    const job = await transactionClient.job.create({
      data: {
        title: payload.title,
        vacancy: payload.vacancy,
        deadline: new Date(payload.deadline),
        minSalary: payload.minSalary,
        maxSalary: payload.maxSalary,
        experienceInMonths: payload.experienceInMonths,
        jobType: payload.jobType,
        minAge: payload.minAge,
        jobDescription: payload.jobDescription,
        jobRequirements: payload.jobRequirements,
        degreeName: payload.degreeName,
        degreeTitle: payload.degreeTitle,
        compensationBenefits: payload.compensationBenefits,
        negotiable: payload.negotiable,
        industryId: payload.industryId,
        departmentId: payload.departmentId,
        companyId: company.id,
      },
    });

    if (payload.skills && payload.skills.length > 0) {
      const skills = payload.skills.map(skill => ({
        skill: skill.skill,
        duration: skill.duration,
        jobId: job.id,
      }));

      await transactionClient.skill.createMany({
        data: skills,
      });
    }

    const address = await transactionClient.address.create({
      data: {
        addressLine: payload.addressLine,
        district: payload.district,
        jobId: job.id,
      },
    });

    return { job, address };
  });

  return result;
};

const deleteJob = async (jobId: string, userId: string) => {
  const company = await prisma.company.findFirstOrThrow({
    where: {
      userId,
    },
  });
  const isJobsExists = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });
  if (!isJobsExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Job not found');
  }
  const result = await prisma.$transaction(async transactionClient => {
    await transactionClient.skill.deleteMany({
      where: { jobId },
    });

    await transactionClient.address.delete({
      where: { jobId },
    });
    const job = await transactionClient.job.delete({
      where: {
        id: jobId,
        companyId: company.id,
      },
    });

    return job;
  });

  return result;
};

const getSingleJob = async (jobId: string) => {
  const result = await prisma.job.findUniqueOrThrow({
    where: {
      id: jobId,
    },
    include: {
      company: {
        include: {
          user: {
            select: {
              phoneNumber: true,
              email: true,
            },
          },
          address: true,
        },
      },
    },
  });
  return result;
};

const getAllJobs = async (
  filters: TJobFilters,
  options: IOptions,
  token: string | null,
) => {
  const query = filters.query;
  const location = filters.location;
  const industry = filters.industry;
  const department = filters.department;
  const minExperience = Number(filters.minExperience);
  const minSalary = Number(filters.minSalary);
  const maxSalary = Number(filters.maxSalary);
  const negotiable = filters.negotiable && filters.negotiable.toLowerCase();
  const expiresIn = filters.expiresIn;

  const { limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const whereOptions: Prisma.JobWhereInput = {};

  if (negotiable) {
    whereOptions.negotiable = negotiable === 'true';
  }

  if (expiresIn) {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + Number(expiresIn));
    whereOptions.deadline = {
      gte: now,
      lte: futureDate,
    };
  }

  if (query) {
    whereOptions.OR = [
      {
        title: {
          contains: String(query),
          mode: 'insensitive',
        },
      },
      {
        company: {
          companyName: {
            contains: String(query),
            mode: 'insensitive',
          },
        },
      },
    ];
  }

  if (location) {
    whereOptions.address = {
      OR: [
        {
          addressLine: { contains: String(location), mode: 'insensitive' },
        },
        {
          district: { contains: String(location), mode: 'insensitive' },
        },
      ],
    };
  }

  if (industry) {
    whereOptions.industry = {
      name: {
        contains: String(industry),
        mode: 'insensitive',
      },
    };
  }

  if (department) {
    whereOptions.department = {
      name: {
        contains: String(department),
        mode: 'insensitive',
      },
    };
  }

  if (minExperience) {
    whereOptions.experienceInMonths = {
      gte: minExperience,
    };
  }

  if (minSalary) {
    whereOptions.minSalary = {
      gte: minSalary,
    };
  }

  if (maxSalary) {
    whereOptions.maxSalary = {
      lte: maxSalary,
    };
  }

  if (token) {
    const decodedToken = jwtHelpers.verifyToken(
      token,
      config.jwt__access_secret!,
    );
    if (decodedToken) {
      const candidate = await prisma.candidate.findFirst({
        where: {
          userId: decodedToken.id,
        },
      });
      if (candidate) {
        const appliedJobs = await prisma.appliedJob.findMany({
          where: {
            candidateId: candidate.id,
          },
        });
        const appliedJobIds = appliedJobs?.map(item => item.jobId);
        if (appliedJobIds?.length > 0) {
          whereOptions.id = {
            notIn: appliedJobIds,
          };
        }
      }
    }
  }

  const jobs = await prisma.job.findMany({
    where: whereOptions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      company: {
        select: {
          companyName: true,
          id: true,
          image: true,
        },
      },
      address: {
        select: {
          district: true,
        },
      },
      department: true,
      industry: true,
    },
  });

  return jobs;
};

const getAllMyPostedJobs = async (userId: string) => {
  const company = await prisma.company.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const jobs = await prisma.job.findMany({
    where: {
      companyId: company.id,
    },
    include: {
      appliedJobs: {
        select: {
          id: true,
        },
      },
    },
  });
  const transformedJobs = jobs?.map(job => {
    const { appliedJobs, ...rest } = job || {};
    return {
      totalApplicant: appliedJobs?.length,
      ...rest,
    };
  });
  return transformedJobs;
};

const updateJobById = async (
  jobId: string,
  payload: Partial<
    Job & Address & { skills: { skill: string; duration: number }[] }
  >,
  userId: string,
) => {
  // Fetch the company to validate the user
  const company = await prisma.company.findFirstOrThrow({
    where: { userId },
  });

  // Check if the job exists and belongs to the company
  await prisma.job.findFirstOrThrow({
    where: {
      id: jobId,
      companyId: company.id,
    },
  });

  // Validate the referenced industry and department, if updated
  if (payload.industryId) {
    await prisma.industry.findFirstOrThrow({
      where: { id: payload.industryId },
    });
  }

  if (payload.departmentId) {
    await prisma.department.findFirstOrThrow({
      where: { id: payload.departmentId },
    });
  }

  const result = await prisma.$transaction(async transactionClient => {
    // Update the job details
    const updatedJob = await transactionClient.job.update({
      where: { id: jobId },
      data: {
        title: payload.title,
        vacancy: payload.vacancy,
        deadline: payload.deadline ? new Date(payload.deadline) : undefined,
        minSalary: payload.minSalary,
        maxSalary: payload.maxSalary,
        experienceInMonths: payload.experienceInMonths,
        jobType: payload.jobType,
        minAge: payload.minAge,
        jobDescription: payload.jobDescription,
        jobRequirements: payload.jobRequirements,
        degreeName: payload.degreeName,
        degreeTitle: payload.degreeTitle,
        compensationBenefits: payload.compensationBenefits,
        negotiable: payload.negotiable,
        industryId: payload.industryId,
        departmentId: payload.departmentId,
      },
    });

    // Update the address, if provided
    let updatedAddress = null;
    if (payload.addressLine || payload.district) {
      updatedAddress = await transactionClient.address.updateMany({
        where: { jobId },
        data: {
          addressLine: payload.addressLine,
          district: payload.district,
        },
      });
    }

    // Update skills, if provided
    if (payload.skills && payload.skills.length > 0) {
      // Delete existing skills for the job
      await transactionClient.skill.deleteMany({
        where: { jobId },
      });

      // Add new skills
      const newSkills = payload.skills.map(skill => ({
        skill: skill.skill,
        duration: skill.duration,
        jobId,
      }));

      await transactionClient.skill.createMany({
        data: newSkills,
      });
    }

    return { updatedJob };
  });

  return result;
};

const getJobsCount = async () => {
  const count = await prisma.job.count();

  return count;
};

const JobsServices = {
  createJob,
  deleteJob,
  getSingleJob,
  getAllJobs,
  getAllMyPostedJobs,
  getJobsCount,
};
export default JobsServices;
