import cron from "node-cron";
import { prisma } from "../lib/prisma.js";
import { TASK_STATUS } from "../utils/constants.js";


export const startOverdueJob = () => {
  cron.schedule("0 * * * *", async () => {
    console.log("Running overdue job...");

    try {
      const now = new Date();

      const overdueTasks = await prisma.task.findMany({
        where: {
          dueDate: { lt: now },
          status: {
            notIn: [TASK_STATUS.DONE],
          },
          isOverdue: false,
        },
      });

      if (overdueTasks.length === 0) return;

      await prisma.task.updateMany({
        where: {
          id: { in: overdueTasks.map((t: typeof overdueTasks[number]) => t.id) },
        },
        data: {
          isOverdue: true,
        },
      });

      console.log(`Marked ${overdueTasks.length} tasks as overdue`);
    } catch (error) {
      console.error("Overdue job error:", error);
    }
  });
};