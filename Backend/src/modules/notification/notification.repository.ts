import { prisma } from "../../lib/prisma.js";

export const createNotificationRepo = (data: any) => {
  return prisma.notification.create({ data });
};

export const getNotificationsRepo = (userId: string) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const markAsReadRepo = (id: string) => {
  return prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
};

export const markAllAsReadRepo = (userId: string) => {
  return prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
};

export const getUnreadCountRepo = (userId: string) => {
  return prisma.notification.count({
    where: { userId, isRead: false },
  });
};