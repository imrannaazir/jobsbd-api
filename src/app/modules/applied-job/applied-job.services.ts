import { AppliedJob } from '@prisma/client';
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
      job: true,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  return appliedJobs;
};

const AppliedJobServices = { applyJob, getAllMyAppliedJobs };
export default AppliedJobServices;
