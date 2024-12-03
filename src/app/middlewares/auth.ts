import { STATUS } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import prisma from '../../shared/prisma';

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'You are not authorized');
      }
      const verifiedUser = await jwtHelpers.verifyToken(
        token,
        config.jwt__access_secret as string,
      );

      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: verifiedUser.id,
        },
      });

      if (user?.status === STATUS.BLOCKED) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Your account is blocked.');
      }

      if (user?.status === STATUS.PENDING) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'Your account is not verified.',
        );
      }

      req.user = verifiedUser;
      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'You are not authorized');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
