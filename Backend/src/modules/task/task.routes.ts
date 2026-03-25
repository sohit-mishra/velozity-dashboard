import { Router } from "express";
import {
  create,
  list,
  update,
  remove,
} from "./task.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";
import { ROLES } from "../../utils/constants.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.ADMIN, ROLES.PROJECT_MANAGER]),
  create
);

router.get("/", authMiddleware, list);

router.patch("/:id", authMiddleware, update);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware([ROLES.ADMIN, ROLES.PROJECT_MANAGER]),
  remove
);

export default router;