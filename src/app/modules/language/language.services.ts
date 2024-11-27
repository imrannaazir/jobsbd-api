import prisma from '../../../shared/prisma';
import { TLanguage, TUpdateLanguage } from './language.types';

const getCandidateLanguagesFromDB = async (userId: string) => {
  const candidate = await prisma.candidate.findFirst({
    where: {
      userId,
    },
  });
  if (!candidate) {
    throw new Error('Candidate not found');
  }

  const result = await prisma.language.findMany({
    where: {
      candidateId: candidate.id,
    },
    select: {
      id: true,
      language: true,
      proficiency: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const createCandidateLanguageInDB = async (
  userId: string,
  payload: TLanguage,
) => {
  const candidate = await prisma.candidate.findFirst({
    where: {
      userId,
    },
  });

  if (!candidate) {
    throw new Error('Candidate not found');
  }

  const newLanguage = await prisma.language.create({
    data: {
      candidateId: candidate.id,
      ...payload,
    },
  });

  return newLanguage;
};

const updateCandidateLanguageInDB = async (
  userId: string,
  languageId: string,
  payload: TUpdateLanguage,
) => {
  const candidate = await prisma.candidate.findFirst({
    where: {
      userId,
    },
  });

  if (!candidate) {
    throw new Error('Candidate not found');
  }

  const updatedLanguage = await prisma.language.update({
    where: {
      id: languageId,
      candidateId: candidate.id,
    },
    data: payload,
  });

  return updatedLanguage;
};

const deleteCandidateLanguageInDB = async (
  userId: string,
  languageId: string,
) => {
  const candidate = await prisma.candidate.findFirst({
    where: {
      userId,
    },
  });

  if (!candidate) {
    throw new Error('Candidate not found');
  }

  const deletedLanguage = await prisma.language.delete({
    where: {
      id: languageId,
      candidateId: candidate.id,
    },
  });

  return deletedLanguage;
};

export const LanguageServices = {
  getCandidateLanguagesFromDB,
  createCandidateLanguageInDB,
  updateCandidateLanguageInDB,
  deleteCandidateLanguageInDB,
};
