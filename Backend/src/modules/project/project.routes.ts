import { Router } from "express";
import {
  create,
  list,
  getOne,
  update,
  remove,
} from "./project.controller.js";

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

router.get(
  "/",
  authMiddleware,
  list
);

router.get(
  "/:id",
  authMiddleware,
  getOne
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware([ROLES.ADMIN, ROLES.PROJECT_MANAGER]),
  update
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware([ROLES.ADMIN, ROLES.PROJECT_MANAGER]),
  remove
);

export default router;