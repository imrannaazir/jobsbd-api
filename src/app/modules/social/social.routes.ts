import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SocialValidations } from './social.validation-schemas';
import { SocialController } from './social.controller';

const router = express.Router();

router.get('/all', auth(Role.CANDIDATE), SocialController.getCandidateSocials);

router.post(
  '/create-social',
  auth(Role.CANDIDATE),
  validateRequest(SocialValidations.socialCreateValidationSchema),
  SocialController.createCandidateSocial,
);

router.put(
  '/update-social/:socialId',
  auth(Role.CANDIDATE),
  validateRequest(SocialValidations.socialUpdateValidationSchema),
  SocialController.updateCandidateSocial,
);

router.delete(
  '/delete-social/:socialId',
  auth(Role.CANDIDATE),
  SocialController.deleteCandidateSocial,
);

const SocialRoutes = router;
export default SocialRoutes;
