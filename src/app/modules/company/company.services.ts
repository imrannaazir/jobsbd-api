import { Company, Prisma } from '@prisma/client';
import { IOptions, paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import { TCompanyFilters, TCompanyInput } from './company.types';

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

    if (district || addressLine) {
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
    }
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
const getCompanyById = async (companyId: string): Promise<Company> => {
  const company = prisma.company.findUniqueOrThrow({
    where: {
      id: companyId,
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

const getAllCompanies = async (
  filters: TCompanyFilters,
  options: IOptions,
): Promise<Company[]> => {
  const whereOptions: Prisma.CompanyWhereInput = {};
  if (filters.companyName) {
    whereOptions.companyName = {
      contains: String(filters.companyName),
      mode: 'insensitive',
    };
  }

  if (filters.address) {
    whereOptions.address = {
      OR: [
        {
          district: {
            contains: String(filters.address),
            mode: 'insensitive',
          },
        },
        {
          addressLine: {
            contains: String(filters.address),
            mode: 'insensitive',
          },
        },
      ],
    };
  }

  const { limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const companies = await prisma.company.findMany({
    where: whereOptions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      address: true,
      job: {
        select: {
          id: true,
        },
      },
    },
  });
  const transformedData = companies?.map(company => {
    const { job, ...rest } = company;
    return {
      postedJobsCount: job?.length,
      ...rest,
    };
  });

  return transformedData;
};
const CompanyServices = {
  updateCompany,
  getMyCompany,
  getAllCompanies,
  getCompanyById,
};
export default CompanyServices;
