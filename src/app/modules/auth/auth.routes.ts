import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AuthControllers from './auth.controllers';
import AuthValidation from './auth.validation-schemas';

const router = Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerValidationSchema),
  AuthControllers.register,
);

const AuthRoutes = router;
export default AuthRoutes;
