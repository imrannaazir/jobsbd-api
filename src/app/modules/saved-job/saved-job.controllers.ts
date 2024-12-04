import httpStatus from 'http-status';
import { IOptions, OptionsFields } from '../../../helpers/paginationHelper';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import SavedJobServices from './saved-job.services';

const toggleInSavedJob = catchAsync(async (req, res) => {
  const { jobId } = req.body;
  const userId = req.user?.id;
  const result = await SavedJobServices.toggleInSavedJob(jobId, userId!);

  sendResponse(res, {
    success: true,
    statusCode: result.statusCode as number,
    message: 'Job saved toggle successfully.',
    data: result.data,
  });
});

const getAllMyJobs = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const options = pick(req.query, OptionsFields) as IOptions;
  const result = await SavedJobServices.getAllMyJobs(userId!, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All my saved job retrieved successfully.',
    data: result,
  });
});
const SavedJobControllers = { toggleInSavedJob, getAllMyJobs };
export default SavedJobControllers;
