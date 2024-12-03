import { Role } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import SavedJobControllers from './saved-job.controllers';
import SavedJobValidations from './saved-job.validations';

const router = Router();

router.post(
  '/toggle',
  auth(Role.CANDIDATE),
  validateRequest(SavedJobValidations.toggleSavedJobValidationSchema),
  SavedJobControllers.toggleInSavedJob,
);

router.get('/me/all', auth(Role.CANDIDATE), SavedJobControllers.getAllMyJobs);
const SavedJobRoutes = router;
export default SavedJobRoutes;
