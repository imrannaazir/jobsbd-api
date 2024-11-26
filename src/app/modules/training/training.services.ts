import { Training } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { TTrainingInput } from './training.types';

const createTraining = async (
  payload: TTrainingInput,
  userId: string,
): Promise<Training> => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const training = await prisma.training.create({
    data: {
      ...payload,
      candidateId: candidate?.id,
    },
  });
  return training;
};

const getAllTrainingsOfUser = async (userId: string): Promise<Training[]> => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const trainings = await prisma.training.findMany({
    where: {
      candidateId: candidate.id,
    },
  });

  return trainings;
};

const deleteTrainingById = async (
  trainingId: string,
  userId: string,
): Promise<Training> => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const isTrainingBelongToCandidate = await prisma.training.findFirst({
    where: {
      id: trainingId,
      candidateId: candidate.id,
    },
  });

  if (!isTrainingBelongToCandidate) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to delete this training.',
    );
  }

  const deletedTraining = await prisma.training.delete({
    where: {
      id: isTrainingBelongToCandidate?.id,
    },
  });

  return deletedTraining;
};

const updateTrainingById = async (
  payload: Partial<TTrainingInput>,
  trainingId: string,
  userId: string,
): Promise<Training> => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const isTrainingBelongToCandidate = await prisma.training.findFirst({
    where: {
      id: trainingId,
      candidateId: candidate.id,
    },
  });

  if (!isTrainingBelongToCandidate) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to edit this training.',
    );
  }

  const updatedTraining = await prisma.training.update({
    where: {
      id: trainingId,
    },
    data: payload,
  });

  return updatedTraining;
};

const TrainingServices = {
  createTraining,
  getAllTrainingsOfUser,
  deleteTrainingById,
  updateTrainingById,
};
export default TrainingServices;
