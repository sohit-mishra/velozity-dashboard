import type { Request, Response } from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
} from "./notification.service.js";

import { asyncHandler } from "../../utils/helpers.js";
import { sendResponse } from "../../utils/response.js";


export const list = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const data = await getNotifications(user.id);

  return sendResponse(res, {
    success: true,
    message: "Notifications fetched",
    data,
  });
});

export const markOne = asyncHandler(async (req: Request, res: Response) => {
  const data = await markAsRead(req.params.id as string);

  return sendResponse(res, {
    success: true,
    message: "Notification marked as read",
    data,
  });
});

export const markAll = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  await markAllAsRead(user.id);

  return sendResponse(res, {
    success: true,
    message: "All notifications marked as read",
  });
});


export const unreadCount = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const count = await getUnreadCount(user.id);

  return sendResponse(res, {
    success: true,
    message: "Unread count fetched",
    data: { count },
  });
});