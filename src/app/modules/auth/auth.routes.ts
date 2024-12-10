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
  '/verify-account',
  validateRequest(AuthValidation.verifyAccountValidationSchema),
  AuthControllers.verifyAccount,
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

router.post('/forgot-password', AuthControllers.forgotPassword);
router.post('/reset-password', AuthControllers.resetPassword);
router.post(
  '/social-login',
  validateRequest(AuthValidation.socialLoginValidationSchema),
  AuthControllers.socialLogin,
);

const AuthRoutes = router;
export default AuthRoutes;
