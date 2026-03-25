import { prisma } from "../../lib/prisma.js";

export const createProjectRepo = (data: any) => {
  return prisma.project.create({ data });
};

export const getProjectByIdRepo = (id: string) => {
  return prisma.project.findUnique({
    where: { id },
  });
};

export const getProjectsRepo = (where: any) => {
  return prisma.project.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const updateProjectRepo = (id: string, data: any) => {
  return prisma.project.update({
    where: { id },
    data,
  });
};

export const deleteProjectRepo = (id: string) => {
  return prisma.project.delete({
    where: { id },
  });
};