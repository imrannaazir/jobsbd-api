import { Address, Job } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createJob = async (
  payload: Job & Address & { skills: { skill: string; duration: number }[] },
  userId: string,
) => {
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
        userId: userId,
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

const JobsServices = {
  createJob,
};
export default JobsServices;
