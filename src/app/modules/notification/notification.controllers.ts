import httpStatus from 'http-status';
import { OptionsFields } from '../../../helpers/paginationHelper';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import NotificationServices from './notification.services';

const sendNotification = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await NotificationServices.sendNotification(userId!);
  sendResponse(res, {
    success: true,
    message: 'Notification sent successfully.',
    statusCode: httpStatus.OK,
    data: result,
  });
});
const getAllMyNotifications = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const options = pick(req.query, OptionsFields);
  const result = await NotificationServices.getAllMyNotifications(
    userId!,
    options,
  );
  sendResponse(res, {
    success: true,
    message: 'Notification sent successfully.',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const markAllNotificationRead = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await NotificationServices.markAllNotificationRead(userId!);
  sendResponse(res, {
    success: true,
    message: 'Notifications marked read successfully.',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const NotificationControllers = {
  sendNotification,
  getAllMyNotifications,
  markAllNotificationRead,
};
export default NotificationControllers;
