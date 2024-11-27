import { Request } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import ExperienceServices from './experience.services';

const createExperience = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const user = req.user.id;
    const result = await ExperienceServices.createExperience(req.body, user);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: 'Experience Created successfully',
      data: result,
      success: true,
    });
  },
);

const getAllExperiences = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const user = req.user.id;
    const result = await ExperienceServices.getAllExperiences(user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Experiences retrieved successfully',
      data: result,
      success: true,
    });
  },
);

const getExperience = catchAsync(async (req: Request & { user?: any }, res) => {
  const { id } = req.params;
  const user = req.user.id;
  const result = await ExperienceServices.getExperience(id, user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Experience retrieved successfully',
    data: result,
    success: true,
  });
});

const updateExperience = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const { id } = req.params;
    const user = req.user.id;
    const result = await ExperienceServices.updateExperience(
      id,
      req.body,
      user,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Experience updated successfully',
      data: result,
      success: true,
    });
  },
);

const deleteExperience = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const { id } = req.params;
    const user = req.user.id;
    const result = await ExperienceServices.deleteExperience(id, user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Experience deleted successfully',
      data: result,
      success: true,
    });
  },
);

const ExperienceControllers = {
  createExperience,
  getExperience,
  getAllExperiences,
  updateExperience,
  deleteExperience,
};
export default ExperienceControllers;
