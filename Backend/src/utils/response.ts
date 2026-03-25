import {type Response } from "express";

type ResponseType<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export const sendResponse = <T>(
  res: Response,
  { success, message, data }: ResponseType<T>,
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success,
    message,
    data
  });
};