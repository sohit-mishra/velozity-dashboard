import { Router } from "express";
import { getDashboard } from "./dashboard.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getDashboard);

export default router;