import httpStatus from 'http-status';
import { OptionsFields } from '../../../helpers/paginationHelper';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import ResumeServices from './resume.services';

const addNewResume = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const payload = req.body;
  const result = await ResumeServices.addNewResume(payload, userId!);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Resume added successfully.',
    data: result,
  });
});
const markAsDefault = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const resumeId = req.params.resumeId;
  const result = await ResumeServices.markAsDefault(resumeId, userId!);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Resume marked as default successfully.',
    data: result,
  });
});
const getAllMyResumes = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const options = pick(req.query, OptionsFields);
  const result = await ResumeServices.getAllMyResumes(userId!, options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Your resumes retrieved successfully.',
    data: result,
  });
});

const ResumeControllers = { addNewResume, markAsDefault, getAllMyResumes };
export default ResumeControllers;
