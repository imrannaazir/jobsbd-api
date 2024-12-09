import httpStatus from 'http-status';
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
  const isAlreadyFollowed = await prisma.followedCompany.findFirst({
    where: {
      candidateId: candidate.id,
      companyId: company.id,
    },
  });

  let followedCompany;
  if (!isAlreadyFollowed) {
    followedCompany = await prisma.followedCompany.create({
      data: {
        candidateId: candidate.id,
        companyId: company.id,
      },
    });
  } else {
    followedCompany = await prisma.followedCompany.delete({
      where: {
        id: isAlreadyFollowed.id,
        candidateId: candidate.id,
        companyId: company.id,
      },
    });
  }
  return {
    data: followedCompany,
    statusCode: isAlreadyFollowed ? httpStatus.OK : httpStatus.CREATED,
    message: isAlreadyFollowed
      ? 'Company un followed successfully.'
      : 'Company followed successfully.',
  };
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
