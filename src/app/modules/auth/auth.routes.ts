import { Role } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import AuthControllers from './auth.controllers';
import AuthValidation from './auth.validation-schemas';

const router = Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerValidationSchema),
  AuthControllers.register,
);
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);
router.post('/refresh-token', AuthControllers.refreshToken);

router.post(
  '/change-password',
  auth(Role.ADMIN, Role.SUPER_ADMIN, Role.CANDIDATE, Role.EMPLOYER),
  AuthControllers.changePassword,
);

const AuthRoutes = router;
export default AuthRoutes;
