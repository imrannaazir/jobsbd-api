import { AppliedJob, NotificationType } from '@prisma/client';
import { IOptions, paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import NotificationServices from '../notification/notification.services';
import { TNotificationPayload } from '../notification/notification.types';
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
  const appliedJob = await prisma.appliedJob.create({
    data: {
      resumeId: resume.id,
      candidateId: candidate.id,
      jobId: payload.jobId,
      companyId: job.companyId,
    },
  });

  const notificationPayload: TNotificationPayload = {
    title: 'New Job Application Received',
    message: `You have received a new application for the job post: ${job.title}. Check the candidate's profile now.`,
    type: NotificationType.APPLIED,
    redirectUrl: `/recruiter/dashboard`,
    receiverId: job?.company?.userId,
    senderId: candidate?.userId,
  };

  if (appliedJob.id) {
    await NotificationServices.sendNotification(notificationPayload);
  }

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
