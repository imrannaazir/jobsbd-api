import { Request } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import JobsServices from './jobs.services';

const createJob = catchAsync(async (req: Request & { user?: any }, res) => {
  const user = req.user.id;
  const result = await JobsServices.createJob(req.body, user);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Jobs Created successfully',
    data: result,
    success: true,
  });
});
const JobControllers = {
  createJob,
};
export default JobControllers;
