import { NotificationType, SavedJob } from '@prisma/client';
import httpStatus from 'http-status';
import { IOptions, paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import NotificationServices from '../notification/notification.services';
import { TNotificationPayload } from '../notification/notification.types';

const toggleInSavedJob = async (jobId: string, userId: string) => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const job = await prisma.job.findFirstOrThrow({
    where: {
      id: jobId,
    },
    include: {
      company: true,
    },
  });

  const isAlreadySaved = await prisma.savedJob.findFirst({
    where: {
      candidateId: candidate?.id,
      jobId,
    },
  });

  let newSavedJob: SavedJob;
  if (!isAlreadySaved) {
    newSavedJob = await prisma.savedJob.create({
      data: {
        candidateId: candidate?.id,
        jobId,
      },
    });
    const notificationPayload: TNotificationPayload = {
      title: 'Your Job Post Has Been Saved',
      message: `${candidate?.fullName} has saved your job post: ${job?.title}. They might apply soon!`,
      type: NotificationType.SAVED_JOB,
      redirectUrl: `/recruiter/dashboard`,
      receiverId: job?.company?.userId,
      senderId: candidate?.userId,
    };
    if (newSavedJob?.id) {
      await NotificationServices.sendNotification(notificationPayload);
    }
  } else {
    newSavedJob = await prisma.savedJob.delete({
      where: {
        id: isAlreadySaved?.id,
      },
    });
  }

  return {
    data: newSavedJob,
    statusCode: isAlreadySaved ? httpStatus.OK : (httpStatus.CREATED as number),
  };
};

const getAllMyJobs = async (
  userId: string,
  options: IOptions,
): Promise<SavedJob[]> => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const { limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const savedJobs = await prisma.savedJob.findMany({
    where: {
      candidateId: candidate.id,
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      job: true,
    },
  });

  return savedJobs;
};

const SavedJobServices = { toggleInSavedJob, getAllMyJobs };
export default SavedJobServices;
