import { TASK_STATUS, TASK_PRIORITY } from "../../utils/constants.js";

export type TaskStatus =
  (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

export type TaskPriority =
  (typeof TASK_PRIORITY)[keyof typeof TASK_PRIORITY];

export type CreateTaskInput = {
  title: string;
  description?: string;
  projectId: string;
  assignedToId: string;
  priority: TaskPriority;
  dueDate: Date;
};

export type UpdateTaskInput = {
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date;
};