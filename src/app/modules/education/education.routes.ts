import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { EducationController } from './education.controller';
import { EducationValidations } from './education.validation-schemas';

const router = express.Router();

router.get(
  '/all',
  auth(Role.CANDIDATE),
  EducationController.getCandidateEducations,
);

router.post(
  '/create-education',
  auth(Role.CANDIDATE),
  validateRequest(EducationValidations.educationValidationSchema),
  EducationController.createCandidateEducation,
);

router.put(
  '/update-education/:educationId',
  auth(Role.CANDIDATE),
  validateRequest(EducationValidations.educationUpdateValidationSchema),
  EducationController.updateCandidateEducation,
);

router.delete(
  '/delete-education/:educationId',
  auth(Role.CANDIDATE),
  EducationController.deleteCandidateEducation,
);

const EducationRoutes = router;
export default EducationRoutes;
