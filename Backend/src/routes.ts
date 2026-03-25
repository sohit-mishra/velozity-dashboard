import { Router } from "express";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import projectRoutes from "./modules/project/project.routes.js";
import taskRoutes from "./modules/task/task.routes.js";
import activityRoutes from "./modules/activity/activity.routes.js";
import notificationRoutes from "./modules/notification/notification.routes.js";
import dashboardRoutes from "./dashboard/dashboard.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);
router.use("/activities", activityRoutes);
router.use("/notifications", notificationRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;