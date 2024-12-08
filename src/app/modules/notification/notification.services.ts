import { IOptions, paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import { getIo } from '../../../socket';

const sendNotification = async (userId: string) => {
  const company = await prisma.company.findFirstOrThrow({
    where: {},
  });
  const notification = await prisma.notification.create({
    data: {
      isRead: false,
      message: ` Candidate applied to your posted job. ${Date.now().toString()}`,
      redirectUrl: `/recruiter-dashboard`,
      title: 'Job applied',
      type: 'APPLIED',
      receiverId: company?.userId,
      senderId: userId,
    },
  });

  if (notification.id) {
    const io = getIo();
    io.to(company.userId).emit('newNotification', notification);
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

const NotificationServices = {
  sendNotification,
  getAllMyNotifications,
};
export default NotificationServices;
