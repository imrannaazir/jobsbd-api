import { Company } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { TCompanyInput } from './company.types';

const updateCompany = async (
  payload: TCompanyInput,
  userId: string,
): Promise<Company> => {
  const { addressLine, district, ...companyPayload } = payload;

  const result = prisma.$transaction(async transactionClient => {
    await prisma.company.findUniqueOrThrow({
      where: {
        userId,
      },
    });

    const company = await transactionClient.company.update({
      where: {
        userId,
      },
      data: companyPayload,
    });

    await transactionClient.address.upsert({
      where: {
        companyId: company.id,
      },
      create: {
        district,
        addressLine,
        companyId: company.id,
      },
      update: {
        district,
        addressLine,
      },
    });
    return company;
  });
  return result;
};

const getMyCompany = async (userId: string): Promise<Company> => {
  const company = prisma.company.findUniqueOrThrow({
    where: {
      userId,
    },
    include: {
      address: true,
      user: {
        select: {
          phoneNumber: true,
          email: true,
          role: true,
          id: true,
        },
      },
    },
  });

  return company;
};

const CompanyServices = { updateCompany, getMyCompany };
export default CompanyServices;
