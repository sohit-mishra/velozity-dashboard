export const ROLES = {
    ADMIN: "ADMIN",
    PROJECT_MANAGER: "PROJECT_MANAGER",
    DEVELOPER: "DEVELOPER"
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const TASK_STATUS = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE"
} as const;

export const TASK_PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL"
} as const;

export const SOCKET_EVENTS = {
  TASK_UPDATED: "task:updated",
  ACTIVITY: "activity:new",
  NOTIFICATION: "notification:new",
  PRESENCE: "presence:update",
  JOIN_PROJECT: "join:project",
  LEAVE_PROJECT: "leave:project",
} as const;