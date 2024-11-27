import { Address, Experience } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createExperience = async (
  payload: Experience & Address,
  userId: string,
) => {
  const isCandidateExists = await prisma.candidate.findUniqueOrThrow({
    where: {
      userId: userId,
    },
  });

  const result = await prisma.$transaction(async transactionClient => {
    const createAddress = await transactionClient.address.create({
      data: {
        district: payload.district,
        addressLine: payload.addressLine,
      },
    });

    const createExperience = await transactionClient.experience.create({
      data: {
        designation: payload.designation,
        companyName: payload.companyName,
        startDate: new Date(payload.startDate),
        endDate: new Date(payload.endDate),
        isWorking: payload.isWorking,
        industryId: payload.industryId,
        jobResponsibilities: payload.jobResponsibilities,
        departmentId: payload.departmentId,
        employmentType: payload.employmentType,
        candidateId: isCandidateExists.id,
        locationId: createAddress.id,
      },
    });

    return createExperience;
  });

  return result;
};
const getAllExperiences = async (userId: string) => {
  const experiences = await prisma.experience.findMany({
    where: { candidate: { userId } },
    include: { location: true },
  });
  return experiences;
};

const getExperience = async (experienceId: string, userId: string) => {
  const experience = await prisma.experience.findUnique({
    where: { id: experienceId, candidate: { userId } },
    include: { location: true },
  });
  if (!experience) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Experience not found');
  }
  return experience;
};

const updateExperience = async (
  experienceId: string,
  payload: Partial<Experience & Address>,
  userId: string,
) => {
  const experience = await prisma.experience.findUnique({
    where: { id: experienceId, candidate: { userId } },
    include: { location: true },
  });
  if (!experience) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Experience not found');
  }
  return await prisma.$transaction(async transactionClient => {
    if (payload.district || payload.addressLine) {
      await transactionClient.address.update({
        where: { id: experience.locationId },
        data: {
          district: payload.district,
          addressLine: payload.addressLine,
        },
      });
    }

    const updatedExperience = await transactionClient.experience.update({
      where: { id: experienceId },
      data: {
        designation: payload.designation,
        companyName: payload.companyName,
        startDate: payload.startDate ? new Date(payload.startDate) : undefined,
        endDate: payload.endDate ? new Date(payload.endDate) : undefined,
        isWorking: payload.isWorking,
        industryId: payload.industryId,
        jobResponsibilities: payload.jobResponsibilities,
        departmentId: payload.departmentId,
        employmentType: payload.employmentType,
      },
    });

    return updatedExperience;
  });
};

const deleteExperience = async (experienceId: string, userId: string) => {
  const experience = await prisma.experience.findUnique({
    where: { id: experienceId, candidate: { userId } },
    include: { location: true },
  });
  if (!experience) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Experience not found');
  }
  await prisma.$transaction(async transactionClient => {
    await transactionClient.experience.delete({ where: { id: experienceId } });

    await transactionClient.address.delete({
      where: { id: experience.locationId },
    });
  });

  return { message: 'Experience deleted successfully' };
};

const ExperienceServices = {
  createExperience,
  getAllExperiences,
  getExperience,
  updateExperience,
  deleteExperience,
};

export default ExperienceServices;
