import { Role } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import CompanyControllers from './company.controllers';
import CompanyValidationSchemas from './company.validations';

const router = Router();

router.put(
  '/update',
  auth(Role.EMPLOYER),
  validateRequest(CompanyValidationSchemas.updateCompanyValidationSchema),
  CompanyControllers.updateCompany,
);

router.get('/me', auth(Role.EMPLOYER), CompanyControllers.getMyCompany);
router.get('/all', CompanyControllers.getAllCompanies);
const CompanyRoutes = router;
export default CompanyRoutes;
