import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createDepartment = async (payload: TDepartment) => {
  const isDepartmentExists = await prisma.department.findFirst({
    where: {
      name: payload.name,
    },
  });

  if (isDepartmentExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `Department with name "${payload.name}" already exists.`,
    );
  }
  const result = await prisma.department.create({
    data: payload,
  });

  return result;
};

const getAllDepartment = async () => {
  const result = await prisma.department.findMany();
  return result;
};

const deleteADepartment = async (id: string) => {
  const result = await prisma.department.delete({
    where: {
      id,
    },
  });
  return result;
};

const DepartmentServices = {
  createDepartment,
  getAllDepartment,
  deleteADepartment,
};
export default DepartmentServices;
export type TDepartment = {
  name: string;
};
