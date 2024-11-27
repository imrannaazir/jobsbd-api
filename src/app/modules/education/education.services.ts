import prisma from '../../../shared/prisma';
import { TEducation, TUpdateEducation } from './education.types';

const getCandidateEducationsFromDB = async (userId: string) => {
  const candidate = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!candidate) {
    throw new Error('Candidate not found');
  }

  const result = await prisma.education.findMany({
    where: {
      candidateId: userId,
    },
  });

  return result;
};

const createCandidateEducationInDB = async (
  payload: TEducation,
  userId: string,
) => {
  const candidate = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!candidate) {
    throw new Error('Candidate not found');
  }

  const newEducation = await prisma.education.create({
    data: {
      candidateId: candidate.id,
      ...payload,
    },
  });

  return newEducation;
};

const updateCandidateEducationInDB = async (
  educationId: string,
  payload: TUpdateEducation,
) => {
  const updatedEducation = await prisma.education.update({
    where: {
      id: educationId,
    },
    data: payload,
  });

  return updatedEducation;
};

const deleteCandidateEducationFromDB = async (educationId: string) => {
  const deletedEducation = await prisma.education.delete({
    where: {
      id: educationId,
    },
  });

  return deletedEducation;
};

export const EducationServices = {
  getCandidateEducationsFromDB,
  createCandidateEducationInDB,
  updateCandidateEducationInDB,
  deleteCandidateEducationFromDB,
};
