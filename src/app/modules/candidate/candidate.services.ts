import { Address, Candidate } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const updateCandidate = async (
  payload: Candidate & Address,
  userId: string,
) => {
  const isCandidateExist = await prisma.candidate.findFirst({
    where: {
      userId,
    },
  });

  if (!isCandidateExist?.id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Candidate is not founded.');
  }

  const addressPayload: Partial<Address> = {};

  addressPayload.addressLine = payload.addressLine;
  addressPayload.district = payload.district;

  const candidatePayload = payload;
  delete candidatePayload.addressLine;
  delete candidatePayload.district;

  const result = await prisma.$transaction(async transactionClient => {});
};

const CandidateServices = { updateCandidate };
export default CandidateServices;
