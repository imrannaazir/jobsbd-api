import httpStatus from 'http-status';
import { IOptions, OptionsFields } from '../../../helpers/paginationHelper';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import AppliedJobServices from './applied-job.services';

const applyJob = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user?.id;
  const result = await AppliedJobServices.applyJob(payload, userId!);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Job applied successfully.',
    data: result,
  });
});

const getAllMyAppliedJobs = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const options = pick(req.query, OptionsFields) as IOptions;
  const result = await AppliedJobServices.getAllMyAppliedJobs(userId!, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All my applied job retrieved successfully.',
    data: result,
  });
});
const AppliedJobControllers = { applyJob, getAllMyAppliedJobs };
export default AppliedJobControllers;
