import {
  createNotificationRepo,
  getNotificationsRepo,
  markAsReadRepo,
  markAllAsReadRepo,
  getUnreadCountRepo,
} from "./notification.repository.js";

import { getIO } from "../../socket/socket.js";
import { SOCKET_EVENTS } from "../../utils/constants.js";

export const createNotification = async (data: any) => {
  const notification = await createNotificationRepo(data);

  const io = getIO();

  io.to(`user:${data.userId}`).emit(SOCKET_EVENTS.NOTIFICATION, {
    message: data.message,
    createdAt: new Date(),
  });

  return notification;
};

export const getNotifications = async (userId: string) => {
  return getNotificationsRepo(userId);
};

export const markAsRead = async (id: string) => {
  return markAsReadRepo(id);
};

export const markAllAsRead = async (userId: string) => {
  return markAllAsReadRepo(userId);
};

export const getUnreadCount = async (userId: string) => {
  return getUnreadCountRepo(userId);
};