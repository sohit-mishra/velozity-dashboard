export type Notification = {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
};

export type CreateNotificationInput = {
  userId: string;
  message: string;
};