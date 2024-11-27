import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import ExperienceControllers from './experience.controllers';
import ExperienceValidation from './experience.validations-schemas';

const router = express.Router();

router.post(
  '/create-experience',
  auth(Role.CANDIDATE),
  validateRequest(ExperienceValidation.createExperienceValidationSchema),
  ExperienceControllers.createExperience,
);

router.get('/', auth(Role.CANDIDATE), ExperienceControllers.getAllExperiences);

router.get('/:id', auth(Role.CANDIDATE), ExperienceControllers.getExperience);

router.patch(
  '/:id',
  auth(Role.CANDIDATE),
  validateRequest(ExperienceValidation.updateExperienceValidationSchema),
  ExperienceControllers.updateExperience,
);

router.delete(
  '/:id',
  auth(Role.CANDIDATE),
  ExperienceControllers.deleteExperience,
);

const ExperienceRoutes = router;
export default ExperienceRoutes;
