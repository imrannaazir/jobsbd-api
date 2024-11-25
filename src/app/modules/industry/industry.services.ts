import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { TIndustry } from './industry.types';

const createIndustry = async (payload: TIndustry) => {
  const isIndustryExists = await prisma.industry.findFirst({
    where: {
      name: payload.name,
    },
  });

  if (isIndustryExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `Industry with name "${payload.name}" already exists.`,
    );
  }
  const result = await prisma.industry.create({
    data: payload,
  });

  return result;
};

const getAllIndustry = async () => {
  const result = await prisma.industry.findMany();
  return result;
};
const deleteAIndustry = async (id: string) => {
  const result = await prisma.industry.delete({
    where: {
      id,
    },
  });
  return result;
};

const IndustryServices = {
  createIndustry,
  getAllIndustry,
  deleteAIndustry,
};
export default IndustryServices;
