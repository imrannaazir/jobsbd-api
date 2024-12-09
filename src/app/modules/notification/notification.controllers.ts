import httpStatus from 'http-status';
import { OptionsFields } from '../../../helpers/paginationHelper';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import NotificationServices from './notification.services';

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

const deleteNotificationById = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const notificationId = req.params.notificationId;
  const result = await NotificationServices.deleteNotificationById(
    userId!,
    notificationId,
  );
  sendResponse(res, {
    success: true,
    message: 'Notifications deleted successfully.',
    statusCode: httpStatus.OK,
    data: result,
  });
});
const NotificationControllers = {
  getAllMyNotifications,
  markAllNotificationRead,
  deleteNotificationById,
};
export default NotificationControllers;
