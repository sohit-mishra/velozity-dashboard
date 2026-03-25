import { Router } from "express";
import {
    create,
    list,
    getOne,
    update,
    remove,
} from "./user.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";
import { ROLES } from "../../utils/constants.js";

const router = Router();

router.post(
    "/",
    authMiddleware,
    roleMiddleware([ROLES.ADMIN]),
    create
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware([ROLES.ADMIN]),
    remove
);


router.get("/", authMiddleware, list);
router.get("/:id", authMiddleware, getOne);


router.patch(
    "/:id",
    authMiddleware,
    roleMiddleware([ROLES.ADMIN, ROLES.PROJECT_MANAGER]),
    update
);

export default router;