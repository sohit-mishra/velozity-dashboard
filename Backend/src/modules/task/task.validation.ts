import { z } from "zod";
import { TASK_STATUS, TASK_PRIORITY } from "../../utils/constants.js";

export const createTaskSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  projectId: z.string(),
  assignedToId: z.string(),
  priority: z.enum([
    TASK_PRIORITY.LOW,
    TASK_PRIORITY.MEDIUM,
    TASK_PRIORITY.HIGH,
    TASK_PRIORITY.CRITICAL,
  ]),
  dueDate: z.string(),
});

export const updateTaskSchema = z.object({
  status: z.enum([
    TASK_STATUS.TODO,
    TASK_STATUS.IN_PROGRESS,
    TASK_STATUS.IN_REVIEW,
    TASK_STATUS.DONE,
  ]).optional(),
  priority: z.enum([
    TASK_PRIORITY.LOW,
    TASK_PRIORITY.MEDIUM,
    TASK_PRIORITY.HIGH,
    TASK_PRIORITY.CRITICAL,
  ]).optional(),
  dueDate: z.string().optional(),
});