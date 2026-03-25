import { prisma } from "../lib/prisma.js";
import { TASK_STATUS } from "../utils/constants.js";

export const getAdminDashboard = async () => {
  const totalProjects = await prisma.project.count();
  const totalTasks = await prisma.task.count();

  const grouped = await prisma.task.groupBy({
    by: ["status"],
    _count: { status: true },
  });

  const tasksByStatus: Record<string, number> = {};

  grouped.forEach((g: typeof grouped[number]) => {
    tasksByStatus[g.status] = g._count.status;
  });

  const overdueTasks = await prisma.task.count({
    where: {
      dueDate: { lt: new Date() },
      status: { not: TASK_STATUS.DONE },
    },
  });

  return {
    totalProjects,
    totalTasks,
    tasksByStatus,
    overdueTasks,
    activeUsers: 0,
  };
};

export const getPMDashboard = async (userId: string) => {
  const projects = await prisma.project.findMany({
    where: { createdById: userId },
    select: { id: true },
  });

  const projectIds = projects.map(
    (p: typeof projects[number]) => p.id
  );

  const totalProjects = projectIds.length;

  const grouped = await prisma.task.groupBy({
    by: ["priority"],
    where: { projectId: { in: projectIds } },
    _count: { priority: true },
  });

  const tasksByPriority: Record<string, number> = {};

  grouped.forEach((g: typeof grouped[number]) => {
    tasksByPriority[g.priority] = g._count.priority;
  });

  const upcomingTasks = await prisma.task.count({
    where: {
      projectId: { in: projectIds },
      dueDate: {
        gte: new Date(),
        lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    },
  });

  return {
    totalProjects,
    tasksByPriority,
    upcomingTasks,
  };
};

export const getDevDashboard = async (userId: string) => {
  const tasks = await prisma.task.findMany({
    where: { assignedToId: userId },
    orderBy: [
      { priority: "desc" },
      { dueDate: "asc" },
    ],
  });

  return {
    assignedTasks: tasks.length,
    tasks,
  };
};