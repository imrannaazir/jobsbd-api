import { Role } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import ResumeControllers from './resume.controllers';
import ResumeValidations from './resume.validations';

const router = Router();

router.post(
  '/add',
  auth(Role.CANDIDATE),
  validateRequest(ResumeValidations.addResumeValidationSchema),
  ResumeControllers.addNewResume,
);

router.patch(
  '/mark-as-default/:resumeId',
  auth(Role.CANDIDATE),
  ResumeControllers.markAsDefault,
);

router.get('/me/all', auth(Role.CANDIDATE), ResumeControllers.getAllMyResumes);

const ResumeRouter = router;
export default ResumeRouter;
