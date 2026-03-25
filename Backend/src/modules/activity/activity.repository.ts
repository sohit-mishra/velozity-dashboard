import { prisma } from "../../lib/prisma.js";

export const createActivityRepo = (data: any) => {
  return prisma.activity.create({ data });
};


export const getActivitiesRepo = (where: any) => {
  return prisma.activity.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 20,
    include: {
      user: {
        select: { id: true, name: true },
      },
      task: {
        select: { id: true, title: true },
      },
    },
  });
};