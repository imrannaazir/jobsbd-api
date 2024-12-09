import { Router } from 'express';
import auth from '../../middlewares/auth';
import NotificationControllers from './notification.controllers';

const router = Router();

router.get(
  '/me/get-all',
  auth(),
  NotificationControllers.getAllMyNotifications,
);

router.patch(
  '/mark-as-read',
  auth(),
  NotificationControllers.markAllNotificationRead,
);

router.delete(
  '/delete/:notificationId',
  auth(),
  NotificationControllers.deleteNotificationById,
);
const NotificationRoutes = router;
export default NotificationRoutes;
