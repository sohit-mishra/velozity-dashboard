import { Router } from "express";
import {
  list,
  markOne,
  markAll,
  unreadCount,
} from "./notification.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();
router.use(authMiddleware);
router.get("/", list);
router.get("/unread-count", unreadCount);
router.patch("/:id/read", markOne);
router.patch("/read-all", markAll);

export default router;