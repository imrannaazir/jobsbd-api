import { Resume } from '@prisma/client';
import { IOptions, paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';

const addNewResume = async (
  payload: Pick<Resume, 'url' | 'file_name'>,
  userId: string,
): Promise<Resume> => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const result = await prisma.$transaction(async tx => {
    await tx.resume.updateMany({
      where: {
        candidateId: candidate.id,
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    });

    const newResume = await tx.resume.create({
      data: {
        url: payload.url,
        file_name: payload.file_name,
        isDefault: true,
        candidateId: candidate.id,
      },
    });

    return newResume;
  });

  return result;
};

const markAsDefault = async (
  resumeId: string,
  userId: string,
): Promise<Resume> => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const result = await prisma.$transaction(async tx => {
    await tx.resume.updateMany({
      where: {
        isDefault: true,
        candidateId: candidate.id,
      },
      data: {
        isDefault: false,
      },
    });
    const updatedResume = await tx.resume.update({
      where: {
        id: resumeId,
        candidateId: candidate.id,
      },
      data: {
        isDefault: true,
      },
    });
    return updatedResume;
  });

  return result;
};

const getAllMyResumes = async (
  userId: string,
  options: IOptions,
): Promise<Resume[]> => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const { limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const resumes = await prisma.resume.findMany({
    where: {
      candidateId: candidate.id,
    },
    skip: skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  return resumes;
};
const ResumeServices = { addNewResume, markAsDefault, getAllMyResumes };
export default ResumeServices;
