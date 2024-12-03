import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
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

const AppliedJobControllers = { applyJob };
export default AppliedJobControllers;
