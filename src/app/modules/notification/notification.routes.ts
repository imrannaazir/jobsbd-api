import { Role } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import NotificationControllers from './notification.controllers';

const router = Router();

router.post(
  '/send',
  auth(Role.CANDIDATE),
  NotificationControllers.sendNotification,
);

router.get(
  '/me/get-all',
  auth(),
  NotificationControllers.getAllMyNotifications,
);

const NotificationRoutes = router;
export default NotificationRoutes;
