import prisma from '../../../shared/prisma';
import { TAppliedJobInput } from './applied-job.types';

const applyJob = async (payload: TAppliedJobInput, userId: string) => {
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

  const appliedJob = await prisma.appliedJob.create({
    data: {
      resume: payload.resume,
      candidateId: candidate.id,
      jobId: payload.jobId,
      companyId: job.companyId,
    },
  });

  return appliedJob;
};

const AppliedJobServices = { applyJob };
export default AppliedJobServices;
