import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { TLogin, TRegister } from './auth.types';
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

const login = async (payload: TLogin) => {
  console.log(payload);
  const isUserAlreadyExist = await prisma.user.findFirst({
    where: {
      AND: [{ email: payload.email }],
    },
  });

  if (!isUserAlreadyExist?.id) {
    throw new ApiError(httpStatus.CONFLICT, 'User Not Found!!!');
  }
  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    isUserAlreadyExist.password,
  );
  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Incorrect password');
  }
  const accessToken = jwtHelpers.generateToken(
    {
      id: isUserAlreadyExist.id,
      email: isUserAlreadyExist.email,
      role: isUserAlreadyExist.role,
    },
    config.jwt__access_secret as string,
    config.jwt__access_expire_in as string,
  );
  const refreshToken = jwtHelpers.generateToken(
    {
      id: isUserAlreadyExist.id,
      email: isUserAlreadyExist.email,
      role: isUserAlreadyExist.role,
    },
    config.jwt__refresh_secret as string,
    config.jwt__refresh_expire_in as string,
  );
  return {
    id: isUserAlreadyExist.id,
    email: isUserAlreadyExist.email,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt__refresh_secret as string,
    );
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are not authorized');
  }
  const userData = await prisma.user.findFirst({
    where: {
      AND: [{ email: decodedData.email }],
    },
  });
  if (!userData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are not authorized');
  }
  const accessToken = jwtHelpers.generateToken(
    {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.jwt__access_secret as string,
    config.jwt__access_expire_in as string,
  );

  return {
    id: userData.id,
    email: userData.email,
    accessToken,
  };
};

const AuthServices = {
  register,
  login,
  refreshToken,
};

export default AuthServices;
