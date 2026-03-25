import {
  createTaskRepo,
  getTaskById,
  getTasksRepo,
  updateTaskRepo,
  deleteTaskRepo,
} from "./task.repository.js";

import { getIO } from "../../socket/socket.js";
import { SOCKET_EVENTS } from "../../utils/constants.js";
import { prisma } from "../../lib/prisma.js";

export const createTask = async (data: any, user: any) => {
  return createTaskRepo({
    ...data,
    createdById: user.id,
  });
};

export const getTasks = async (user: any) => {
  if (user.role === "ADMIN") {
    return getTasksRepo({});
  }

  if (user.role === "PROJECT_MANAGER") {
    return getTasksRepo({
      project: { createdById: user.id },
    });
  }

  return getTasksRepo({
    assignedToId: user.id,
  });
};

export const updateTaskStatus = async (
  taskId: string,
  data: any,
  user: any
) => {
  const task = await getTaskById(taskId);

  if (!task) throw new Error("Task not found");

  const updated = await updateTaskRepo(taskId, data);

  await prisma.activity.create({
    data: {
      taskId,
      projectId: task.projectId,
      userId: user.id,
      fromStatus: task.status,
      toStatus: data.status,
    },
  });

  const io = getIO();

  io.to(`project:${task.projectId}`).emit(SOCKET_EVENTS.ACTIVITY, {
    taskId,
    projectId: task.projectId,
    userId: user.id,
    fromStatus: task.status,
    toStatus: data.status,
    timestamp: new Date(),
  });

  return updated;
};

export const deleteTask = async (id: string) => {
  return deleteTaskRepo(id);
};