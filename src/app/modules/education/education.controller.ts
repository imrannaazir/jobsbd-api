import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { EducationServices } from './education.services';

const getCandidateEducations = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await EducationServices.getCandidateEducationsFromDB(userId!);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Education fetched successfully.',
    data: result,
  });
});

const createCandidateEducation = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user?.id;
  const result = await EducationServices.createCandidateEducationInDB(
    payload,
    userId!,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Education created successfully.',
    data: result,
  });
});

const updateCandidateEducation = catchAsync(async (req, res) => {
  const { educationId } = req.params;
  const payload = req.body;
  const result = await EducationServices.updateCandidateEducationInDB(
    educationId,
    payload,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Education updated successfully.',
    data: result,
  });
});

const deleteCandidateEducation = catchAsync(async (req, res) => {
  const { educationId } = req.params;

  const result =
    await EducationServices.deleteCandidateEducationFromDB(educationId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Education created successfully.',
    data: result,
  });
});

export const EducationController = {
  getCandidateEducations,
  createCandidateEducation,
  updateCandidateEducation,
  deleteCandidateEducation,
};
