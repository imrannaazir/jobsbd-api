import { Request } from 'express';
import httpStatus from 'http-status';
import { IOptions, OptionsFields } from '../../../helpers/paginationHelper';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { TJobFilters } from './job.types';
import { JobFilterableFields } from './jobs.constants';
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

const deleteJob = catchAsync(async (req: Request & { user?: any }, res) => {
  const user = req.user.id;
  const result = await JobsServices.deleteJob(req.params.jobId, user);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Job deleted successfully',
    data: result,
    success: true,
  });
});

const getSingleJob = catchAsync(async (req: Request & { user?: any }, res) => {
  const result = await JobsServices.getSingleJob(req.params.jobId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Jobs retrieved successfully',
    data: result,
    success: true,
  });
});

const getAllJobs = catchAsync(async (req, res) => {
  const options = pick(req.query, OptionsFields) as IOptions;
  const filters = pick(req.query, JobFilterableFields) as TJobFilters;
  const result = await JobsServices.getAllJobs(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Jobs retrieved successfully',
    data: result,
    success: true,
  });
});
const JobControllers = {
  createJob,
  deleteJob,
  getSingleJob,
  getAllJobs,
};
export default JobControllers;
