import prisma from '../../../shared/prisma';

const followCompany = async (companyId: string, userId: string) => {
  const company = await prisma.company.findFirstOrThrow({
    where: {
      id: companyId,
    },
  });

  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const followedCompany = await prisma.followedCompany.create({
    data: {
      candidateId: candidate.id,
      companyId: company.id,
    },
  });
  return followedCompany;
};

const getAllFollowedCompany = async (userId: string) => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      userId,
    },
  });

  const followCompanies = await prisma.followedCompany.findMany({
    where: {
      candidateId: candidate.id,
    },
    include: {
      company: {
        include: {
          job: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  const transformedData = followCompanies?.map(company => {
    const { job, ...rest } = company?.company;
    return {
      postedJobsCount: job?.length,
      ...rest,
    };
  });

  return transformedData;
};

const FollowedCompanyServices = { followCompany, getAllFollowedCompany };
export default FollowedCompanyServices;
