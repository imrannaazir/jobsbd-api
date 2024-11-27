import prisma from '../../../shared/prisma';
import { TSocial, TUpdateSocial } from './social.types';

const getCandidateSocialsFromDB = async (userId: string) => {
  const candidate = await prisma.candidate.findFirst({
    where: {
      userId,
    },
  });
  if (!candidate) {
    throw new Error('Candidate not found');
  }

  const result = await prisma.social.findMany({
    where: {
      candidateId: candidate.id,
    },
    select: {
      id: true,
      name: true,
      url: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const createCandidateSocialsInDB = async (userId: string, payload: TSocial) => {
  const candidate = await prisma.candidate.findFirst({
    where: {
      userId,
    },
  });

  if (!candidate) {
    throw new Error('Candidate not found');
  }

  const newSocial = await prisma.social.create({
    data: {
      candidateId: candidate.id,
      ...payload,
    },
  });

  return newSocial;
};

const updateCandidateSocialInDB = async (
  userId: string,
  socialId: string,
  payload: TUpdateSocial,
) => {
  const candidate = await prisma.candidate.findFirst({
    where: {
      userId,
    },
  });

  if (!candidate) {
    throw new Error('Candidate not found');
  }

  const updatedSocial = await prisma.social.update({
    where: {
      id: socialId,
      candidateId: candidate.id,
    },
    data: payload,
  });

  return updatedSocial;
};

const deleteCandidateSocialFromDB = async (
  userId: string,
  socialId: string,
) => {
  const candidate = await prisma.candidate.findFirst({
    where: {
      userId,
    },
  });

  if (!candidate) {
    throw new Error('Candidate not found');
  }

  const deletedSocial = await prisma.social.delete({
    where: {
      id: socialId,
      candidateId: candidate.id,
    },
  });

  return deletedSocial;
};

export const SocialServices = {
  getCandidateSocialsFromDB,
  createCandidateSocialsInDB,
  updateCandidateSocialInDB,
  deleteCandidateSocialFromDB,
};
