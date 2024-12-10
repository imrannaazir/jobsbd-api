import { SavedJob } from '@prisma/client';
import httpStatus from 'http-status';
import { IOptions, paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';

const toggleInSavedJob = async (jobId: string, userId: string) => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  await prisma.job.findFirstOrThrow({
    where: {
      id: jobId,
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
      job: {
        include: {
          company: true,
          address: true,
        },
      },
    },
  });

  return savedJobs;
};

const SavedJobServices = { toggleInSavedJob, getAllMyJobs };
export default SavedJobServices;
