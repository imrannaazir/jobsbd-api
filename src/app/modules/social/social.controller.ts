import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SocialServices } from './social.services';

const getCandidateSocials = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await SocialServices.getCandidateSocialsFromDB(
    userId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Socials fetched successfully.',
    data: result,
  });
});

const createCandidateSocial = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user?.id;
  const result = await SocialServices.createCandidateSocialsInDB(
    userId as string,
    payload,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Social created successfully.',
    data: result,
  });
});

const updateCandidateSocial = catchAsync(async (req, res) => {
  const payload = req.body;
  const { socialId } = req.params;
  const userId = req.user?.id;
  const result = await SocialServices.updateCandidateSocialInDB(
    userId as string,
    socialId as string,
    payload,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Social updated successfully.',
    data: result,
  });
});

const deleteCandidateSocial = catchAsync(async (req, res) => {
  const { socialId } = req.params;
  const userId = req.user?.id;
  const result = await SocialServices.deleteCandidateSocialFromDB(
    userId as string,
    socialId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Social deleted successfully.',
    data: result,
  });
});

export const SocialController = {
  getCandidateSocials,
  createCandidateSocial,
  updateCandidateSocial,
  deleteCandidateSocial,
};
