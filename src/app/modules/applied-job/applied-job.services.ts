import { AppliedJob, AppliedJobStatus } from '@prisma/client';
import { IOptions, paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import { TAppliedJobInput } from './applied-job.types';

const applyJob = async (
  payload: TAppliedJobInput,
  userId: string,
): Promise<AppliedJob> => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const job = await prisma.job.findFirstOrThrow({
    where: {
      id: payload.jobId,
    },
  });

  const resume = await prisma.resume.findFirstOrThrow({
    where: {
      candidateId: candidate.id,
      isDefault: true,
    },
  });
  const appliedJob = await prisma.appliedJob.create({
    data: {
      resumeId: resume.id,
      candidateId: candidate.id,
      jobId: payload.jobId,
      companyId: job.companyId,
    },
  });

  return appliedJob;
};

const getAllMyAppliedJobs = async (
  userId: string,
  options: IOptions,
): Promise<AppliedJob[]> => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const { limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const appliedJobs = await prisma.appliedJob.findMany({
    where: {
      candidateId: candidate.id,
    },
    skip,
    take: limit,
    include: {
      job: {
        include: {
          company: true,
          address: true,
        },
      },
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  return appliedJobs;
};

const getAllApplicantsOfJob = async (jobId: string, userId: string) => {
  const company = await prisma.company.findFirstOrThrow({
    where: {
      userId,
    },
  });

  await prisma.job.findFirstOrThrow({
    where: {
      companyId: company.id,
      id: jobId,
    },
  });

  const appliedJobs = await prisma.appliedJob.findMany({
    where: {
      companyId: company.id,
      jobId,
    },
    include: {
      candidate: {
        include: {
          educations: {
            select: {
              instituteName: true,
            },
          },
          skills: true,
          user: {
            select: {
              phoneNumber: true,
            },
          },
        },
      },
    },
  });
  return appliedJobs;
};

const updateApplyStatus = async (
  appliedJobId: string,
  status: AppliedJobStatus,
  userId: string,
) => {
  const company = await prisma.company.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const appliedJob = await prisma.appliedJob.findFirstOrThrow({
    where: {
      id: appliedJobId,
      companyId: company.id,
    },
  });

  const updateAppliedJob = await prisma.appliedJob.update({
    where: {
      id: appliedJob.id,
    },
    data: {
      status,
    },
  });

  return updateAppliedJob;
};

const AppliedJobServices = {
  applyJob,
  getAllMyAppliedJobs,
  getAllApplicantsOfJob,
  updateApplyStatus,
};
export default AppliedJobServices;
