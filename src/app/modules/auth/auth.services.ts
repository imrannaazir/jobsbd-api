import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { IChangePassword, TLogin, TRegister } from './auth.types';
import { hashedPassword } from './auth.utils';
import emailSender from './sendMailer';

const register = async (payload: TRegister) => {
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

  if (isUserAlreadyExist) {
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
        status: 'ACTIVE',
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
      if (!payload.companyName) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Company name is required.');
      }

      await transactionClient.company.create({
        data: {
          companyName: payload.companyName!,
          userId: newUser?.id,
        },
      });
    } else {
      if (!payload.fullName) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Fullname is required.');
      }
      await transactionClient.candidate.create({
        data: {
          fullName: payload.fullName!,
          userId: newUser?.id,
        },
      });
    }

    return newUser;
  });

  const verifyToken = jwtHelpers.generateToken(
    {
      id: result.id,
      email: result.email,
      role: result.role,
    },
    config.verify_token as string,
    config.verify_expire_in as string,
  );

  const verifyAccountLink = `${config.client_origin}/verify-token?&token=${verifyToken}`;
  await emailSender(
    result.email,
    `
        <div>
        <p>Dear ${result.email}</p>
        <p>Your account verification link:</p>
        <a href=${verifyAccountLink}>
        <button>Click here to Verify Account</button>
        </a>
        </div>
    `,
  );

  return result;
};

const verifyAccount = async (token: string) => {
  console.log({
    token,
    token2: config.verify_token,
    ex: config.verify_expire_in,
  });

  const isTokenValid = jwtHelpers.verifyToken(token, config.verify_token!);

  if (!isTokenValid) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token.');
  }
  console.log({ isTokenValid });

  const user = await prisma.user.findFirst({
    where: {
      id: isTokenValid?.id,
    },
  });

  if (user?.status === 'BLOCKED') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your account is blocked.');
  }

  await prisma.user.update({
    where: { id: user?.id },
    data: { status: 'ACTIVE' },
  });
};

const login = async (payload: TLogin) => {
  const isUserAlreadyExist = await prisma.user.findFirst({
    where: {
      OR: [{ email: payload.email }, { phoneNumber: payload.phoneNumber }],
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

  if (isUserAlreadyExist.status === 'BLOCKED') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your account is blocked.');
  }

  if (isUserAlreadyExist.status === 'PENDING') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your account is not verified.');
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
    phoneNumber: isUserAlreadyExist?.phoneNumber,
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

  if (userData.status === 'BLOCKED') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your account is blocked.');
  }

  if (userData.status === 'PENDING') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your account is not verified.');
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

const changePassword = async (user: any, payload: IChangePassword) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.oldPassword,
    userData.password,
  );
  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Incorrect password');
  }

  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bycrypt_salt_rounds),
  );

  await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    message: 'Password changed successfully',
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
    },
  });

  if (userData.status === 'BLOCKED') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your account is blocked.');
  }

  if (userData.status === 'PENDING') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your account is not verified.');
  }

  const resetPasswordToken = jwtHelpers.generateToken(
    {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.reset_password_token as string,
    config.reset_password_expire_in as string,
  );
  const resetPassword_link = `${config.client_origin}/reset-password?userId=${userData.id}&token=${resetPasswordToken}`;
  await emailSender(
    userData.email,
    `
        <div>
        <p>Dear ${userData.email}</p>
        <p>Your reset password link:</p>
        <a href=${resetPassword_link}>
        <button>Click here to Reset Password</button>
        </a>
        </div>
          `,
  );
};

const resetPassword = async (
  token: string,
  payload: {
    id: string;
    password: string;
  },
) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
    },
  });
  const isValidToken = jwtHelpers.verifyToken(
    token,
    config.reset_password_token as string,
  );

  if (!isValidToken) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid credentials');
  }

  if (user.status === 'BLOCKED') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your account is blocked.');
  }

  if (user.status === 'PENDING') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your account is not verified.');
  }

  const hashedPassword: string = await bcrypt.hash(
    payload.password,
    Number(config.bycrypt_salt_rounds),
  );
  const data = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });
  return data;
};

const AuthServices = {
  register,
  verifyAccount,
  login,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};

export default AuthServices;
