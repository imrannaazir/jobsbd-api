import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { CandidateUpdatePayload } from './candidate.types';

const updateCandidate = async (
  payload: CandidateUpdatePayload,
  userId: string,
) => {
  const candidate = await prisma.candidate.findUnique({
    where: { userId },
  });

  if (!candidate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Candidate not found.');
  }

  const { addressLine, district, ...candidateData } = payload;

  const result = await prisma.$transaction(async transactionClient => {
    if (addressLine !== undefined || district !== undefined) {
      await transactionClient.address.upsert({
        where: {
          candidateId: candidate.id,
        },
        create: {
          addressLine: addressLine ?? '',
          district: district ?? '',
          candidateId: candidate.id,
        },
        update: {
          addressLine: addressLine !== undefined ? addressLine : undefined,
          district: district !== undefined ? district : undefined,
        },
      });
    }

    const updatedCandidate = await transactionClient.candidate.update({
      where: {
        id: candidate.id,
      },
      data: candidateData,
      include: {
        address: true,
      },
    });

    return updatedCandidate;
  });

  return result;
};

const getMyCandidateData = async (userId: string) => {
  const candidate = await prisma.candidate.findFirstOrThrow({
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
  return candidate;
};

const CandidateServices = { updateCandidate, getMyCandidateData };
export default CandidateServices;
