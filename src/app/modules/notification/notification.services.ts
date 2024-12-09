import { IOptions, paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import { getIo } from '../../../socket';
import { TNotificationPayload } from './notification.types';

const sendNotification = async (payload: TNotificationPayload) => {
  const notification = await prisma.notification.create({
    data: payload,
  });

  if (notification.id) {
    const io = getIo();
    io.to(notification.receiverId).emit('newNotification', notification);
  }
};

const getAllMyNotifications = async (userId: string, options: IOptions) => {
  const { limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const notifications = await prisma.notification.findMany({
    where: {
      receiverId: userId,
    },

    skip,
    take: limit,
    orderBy: [
      {
        isRead: 'asc',
      },
      { [sortBy]: sortOrder },
    ],
  });
  return notifications;
};

const markAllNotificationRead = async (userId: string) => {
  const updatedNotifications = await prisma.notification.updateMany({
    where: {
      receiverId: userId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
  return updatedNotifications;
};

const deleteNotificationById = async (
  userId: string,
  notificationId: string,
) => {
  const deletedNotification = await prisma.notification.delete({
    where: {
      id: notificationId,
      receiverId: userId,
    },
  });

  return deletedNotification;
};

const NotificationServices = {
  sendNotification,
  getAllMyNotifications,
  markAllNotificationRead,
  deleteNotificationById,
};
export default NotificationServices;
