import { prisma } from "../../lib/prisma.js";

export const createTaskRepo = (data: any) => {
  return prisma.task.create({ data });
};

export const getTaskById = (id: string) => {
  return prisma.task.findUnique({ where: { id } });
};

export const getTasksRepo = (where: any) => {
  return prisma.task.findMany({
    where,
    orderBy: [{ priority: "desc" }, { dueDate: "asc" }],
  });
};

export const updateTaskRepo = (id: string, data: any) => {
  return prisma.task.update({
    where: { id },
    data,
  });
};

export const deleteTaskRepo = (id: string) => {
  return prisma.task.delete({
    where: { id },
  });
};