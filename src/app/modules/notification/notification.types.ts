import { Notification } from '@prisma/client';

export type TNotificationPayload = Omit<
  Notification,
  'id' | 'isRead' | 'createdAt' | 'updatedAt'
>;
