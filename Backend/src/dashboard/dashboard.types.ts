export type AdminDashboard = {
  totalProjects: number;
  totalTasks: number;
  tasksByStatus: Record<string, number>;
  overdueTasks: number;
  activeUsers: number;
};

export type PMDashboard = {
  totalProjects: number;
  tasksByPriority: Record<string, number>;
  upcomingTasks: number;
};

export type DevDashboard = {
  assignedTasks: number;
  tasks: any[];
};