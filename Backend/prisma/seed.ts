import { prisma } from "../src/lib/prisma.js";
import bcrypt from "bcrypt";

async function main() {
  const password = await bcrypt.hash("123456", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@test.com",
      password,
      role: "ADMIN",
    },
  });

  const pm1 = await prisma.user.create({
    data: {
      name: "PM 1",
      email: "pm1@test.com",
      password,
      role: "PROJECT_MANAGER",
    },
  });

  const dev1 = await prisma.user.create({
    data: {
      name: "Dev 1",
      email: "dev1@test.com",
      password,
      role: "DEVELOPER",
    },
  });

  const project = await prisma.project.create({
    data: {
      name: "Project Alpha",
      clientName: "Client A",
      createdById: pm1.id,
    },
  });

  const task = await prisma.task.create({
    data: {
      title: "Initial Setup",
      description: "Setup project",
      priority: "HIGH",
      dueDate: new Date(Date.now() - 86400000),
      projectId: project.id,
      assignedToId: dev1.id,
      createdById: pm1.id,
    },
  });

  await prisma.activity.create({
    data: {
      taskId: task.id,
      projectId: project.id,
      userId: pm1.id,
      fromStatus: "TODO",
      toStatus: "IN_PROGRESS",
    },
  });

  await prisma.notification.create({
    data: {
      userId: dev1.id,
      message: "Task assigned to you",
    },
  });

  console.log("🌱 Seed data created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());