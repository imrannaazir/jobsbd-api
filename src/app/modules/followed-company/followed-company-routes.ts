import { Role } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import FollowedCompanyValidations from './followed-company-validations';
import FollowedCompanyControllers from './followed-company.controllers';

const router = Router();

router.post(
  '/follow',
  auth(Role.CANDIDATE),
  validateRequest(FollowedCompanyValidations.followCompanyValidationSchema),
  FollowedCompanyControllers.followCompany,
);

router.get(
  '/me/all',
  auth(Role.CANDIDATE),
  FollowedCompanyControllers.getAllFollowedCompany,
);

const FollowedCompanyRoutes = router;
export default FollowedCompanyRoutes;
