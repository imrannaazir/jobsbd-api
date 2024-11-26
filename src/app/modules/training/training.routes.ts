import { Role } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import TrainingControllers from './training.controllers';
import TrainingValidationSchemas from './training.validations';

const router = Router();

router.post(
  '/',
  auth(Role.CANDIDATE),
  validateRequest(TrainingValidationSchemas.createTrainingValidationSchema),
  TrainingControllers.createTraining,
);
router.get(
  '/all',
  auth(Role.CANDIDATE),
  TrainingControllers.getAllTrainingsOfUser,
);
router.delete(
  '/:trainingId',
  auth(Role.CANDIDATE),
  TrainingControllers.deleteTrainingById,
);

router.patch(
  '/:trainingId',
  auth(Role.CANDIDATE),
  validateRequest(TrainingValidationSchemas.updateTrainingValidationSchema),
  TrainingControllers.updateTrainingById,
);

const TrainingRoutes = router;
export default TrainingRoutes;
