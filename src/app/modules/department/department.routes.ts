import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import DepartmentControllers from './department.controllers';
import DepartmentValidations from './department.validation-schemas';

const router = express.Router();

router.post(
  '/create-department',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(DepartmentValidations.createDepartmentValidationSchema),
  DepartmentControllers.createDepartment,
);
router.get(
  '/',
  auth(Role.ADMIN, Role.SUPER_ADMIN, Role.EMPLOYER, Role.CANDIDATE),
  DepartmentControllers.getAllDepartment,
);
router.delete(
  '/:departmentId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  DepartmentControllers.deleteADepartment,
);

const DepartmentRoutes = router;
export default DepartmentRoutes;
