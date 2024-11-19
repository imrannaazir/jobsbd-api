import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import AuthServices from './auth.services';

const register = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthServices.register(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registration successfully.',
    data: result,
  });
});

const AuthControllers = {
  register,
};
export default AuthControllers;
