import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { LanguageServices } from './language.services';

const getCandidateLanguages = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await LanguageServices.getCandidateLanguagesFromDB(
    userId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Languages fetched successfully.',
    data: result,
  });
});

const createCandidateLanguage = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user?.id;
  const result = await LanguageServices.createCandidateLanguageInDB(
    userId as string,
    payload,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Language created successfully.',
    data: result,
  });
});

const updateCandidateLanguage = catchAsync(async (req, res) => {
  const payload = req.body;
  const { languageId } = req.params;
  const userId = req.user?.id;
  const result = await LanguageServices.updateCandidateLanguageInDB(
    userId as string,
    languageId as string,
    payload,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Language updated successfully.',
    data: result,
  });
});

const deleteCandidateLanguage = catchAsync(async (req, res) => {
  const { languageId } = req.params;
  const userId = req.user?.id;
  const result = await LanguageServices.deleteCandidateLanguageInDB(
    userId as string,
    languageId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Language deleted successfully.',
    data: result,
  });
});

export const LanguageController = {
  getCandidateLanguages,
  createCandidateLanguage,
  updateCandidateLanguage,
  deleteCandidateLanguage,
};
