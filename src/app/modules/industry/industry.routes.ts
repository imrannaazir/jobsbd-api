import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import IndustryControllers from './industry.controllers';
import IndustryValidations from './industry.validations-schemas';
const router = express.Router();

router.post(
  '/create-industry',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(IndustryValidations.createIndustryValidationSchema),
  IndustryControllers.createIndustry,
);
router.get('/', IndustryControllers.getAllIndustry);
router.delete(
  '/:industryId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  IndustryControllers.deleteAIndustry,
);

const IndustryRoutes = router;
export default IndustryRoutes;
