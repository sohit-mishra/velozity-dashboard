export type Activity = {
  id: string;
  taskId: string;
  projectId: string;
  userId: string;
  fromStatus: string;
  toStatus: string;
  createdAt: Date;
};