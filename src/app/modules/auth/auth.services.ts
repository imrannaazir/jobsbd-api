import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { TRegister } from './auth.types';
import { hashedPassword } from './auth.utils';

const register = async (payload: TRegister) => {
  /* 
1. if user already exist by email or phone number 
2. hash the password 
3. 
*/

  const isUserAlreadyExist = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: payload.email,
        },
        {
          phoneNumber: payload.phoneNumber,
        },
      ],
    },
  });

  if (isUserAlreadyExist?.id) {
    throw new ApiError(httpStatus.CONFLICT, 'User is already registered.');
  }

  const hashPassword = await hashedPassword(payload.password);

  const result = await prisma.$transaction(async transactionClient => {
    const newUser = await transactionClient.user.create({
      data: {
        email: payload.email,
        password: hashPassword,
        phoneNumber: payload.phoneNumber,
        role: payload.role,
        status: 'PENDING',
      },
      select: {
        id: true,
        email: true,
        phoneNumber: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (payload.role === 'EMPLOYER') {
      await transactionClient.employer.create({
        data: {
          companyName: payload.companyName!,
          userId: newUser?.id,
        },
      });
    } else {
      await transactionClient.candidate.create({
        data: {
          fullName: payload.fullName!,
          userId: newUser?.id,
        },
      });
    }

    return newUser;
  });

  return result;
};

const AuthServices = {
  register,
};

export default AuthServices;
