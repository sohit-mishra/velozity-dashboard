import { Router } from "express";
import { list } from "./activity.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, list);

export default router;