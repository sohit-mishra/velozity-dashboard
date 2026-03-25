import type { Request, Response } from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from "./task.service.js";

import { asyncHandler } from "../../utils/helpers.js";
import { sendResponse } from "../../utils/response.js";
import {
  createTaskSchema,
  updateTaskSchema,
} from "./task.validation.js";


export const create = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const parsed = createTaskSchema.parse(req.body);

  const task = await createTask(
    {
      ...parsed,
      dueDate: new Date(parsed.dueDate),
    },
    user
  );

  return sendResponse(res, {
    success: true,
    message: "Task created",
    data: task,
  });
});

export const list = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const tasks = await getTasks(user);

  return sendResponse(res, {
    success: true,
    message: "Tasks fetched",
    data: tasks,
  });
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const parsed = updateTaskSchema.parse(req.body);

  const task = await updateTaskStatus(
    req.params.id as string,
    {
      ...parsed,
      ...(parsed.dueDate && { dueDate: new Date(parsed.dueDate) }),
    },
    user
  );

  return sendResponse(res, {
    success: true,
    message: "Task updated",
    data: task,
  });
});


export const remove = asyncHandler(async (req: Request, res: Response) => {
  await deleteTask(req.params.id as string);

  return sendResponse(res, {
    success: true,
    message: "Task deleted",
  });
});