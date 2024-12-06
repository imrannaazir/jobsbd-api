import { AppliedJob } from '@prisma/client';
import { IOptions, paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import { getIo } from '../../../socket';
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
    include: {
      company: true,
    },
  });

  const resume = await prisma.resume.findFirstOrThrow({
    where: {
      candidateId: candidate.id,
      isDefault: true,
    },
  });
  const result = prisma.$transaction(async tx => {
    const appliedJob = await tx.appliedJob.create({
      data: {
        resumeId: resume.id,
        candidateId: candidate.id,
        jobId: payload.jobId,
        companyId: job.companyId,
      },
    });

    const notification = await tx.notification.create({
      data: {
        isRead: false,
        message: `${candidate.fullName} applied to your posted job.`,
        redirectUrl: `/recruiter-dashboard`,
        title: 'Job applied',
        type: 'APPLIED',
        receiverId: job?.company?.userId,
        senderId: candidate.userId,
      },
    });

    if (notification.id) {
      const io = getIo();
      io.to(job?.company.userId).emit('newNotification', notification);
    }
    return appliedJob;
  });

  return result;
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
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  return appliedJobs;
};

const AppliedJobServices = { applyJob, getAllMyAppliedJobs };
export default AppliedJobServices;
