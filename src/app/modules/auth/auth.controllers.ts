import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import AuthServices from './auth.services';

const register = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await AuthServices.register(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registration successfully.',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.login(req.body);
  const { refreshToken, ...remainingData } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: false,
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully',
    data: remainingData,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully',
    data: result,
  });
});

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await AuthServices.changePassword(user, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password change successfully',
      data: result,
    });
  },
);

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.forgotPassword(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Check your email',
    data: result,
  });
});
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization || '';
  console.log(req.body);
  const result = await AuthServices.resetPassword(token, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully!',
    data: result,
  });
});

const AuthControllers = {
  register,
  login,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
export default AuthControllers;
