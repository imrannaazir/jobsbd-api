import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import TrainingServices from './training.services';

const createTraining = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user?.id;
  const result = await TrainingServices.createTraining(payload, userId!);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Training added successfully.',
    data: result,
  });
});

const getAllTrainingsOfUser = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await TrainingServices.getAllTrainingsOfUser(userId!);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved your all trainings.',
    data: result,
  });
});

const deleteTrainingById = catchAsync(async (req, res) => {
  const trainingId = req.params?.trainingId;
  const userId = req.user?.id;
  const result = await TrainingServices.deleteTrainingById(trainingId, userId!);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Training has been deleted.',
    data: result,
  });
});

const updateTrainingById = catchAsync(async (req, res) => {
  const payload = req.body;
  const trainingId = req.params?.trainingId;

  const userId = req.user?.id;
  const result = await TrainingServices.updateTrainingById(
    payload,
    trainingId,
    userId!,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Training updated successfully.',
    data: result,
  });
});

const TrainingControllers = {
  createTraining,
  getAllTrainingsOfUser,
  deleteTrainingById,
  updateTrainingById,
};
export default TrainingControllers;
