import { Role } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import CandidateControllers from './candidate.controllers';
import CandidateValidationSchema from './candidate.validation';

const router = Router();

router.put(
  '/update',
  auth(Role.CANDIDATE),
  validateRequest(CandidateValidationSchema.updateCandidateValidationSchema),
  CandidateControllers.updateCandidate,
);
router.get(
  '/me',
  auth(Role.CANDIDATE),
  CandidateControllers.getMyCandidateData,
);
const CandidateRoutes = router;
export default CandidateRoutes;
