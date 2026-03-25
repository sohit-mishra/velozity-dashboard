import type{ Request, Response } from "express";
import {
  getAdminDashboard,
  getPMDashboard,
  getDevDashboard,
} from "./dashboard.service.js";

import { asyncHandler } from "../utils/helpers.js";
import { sendResponse } from "../utils/response.js";
import { ROLES } from "../utils/constants.js";

export const getDashboard = asyncHandler(
  async (req: Request, res: Response) => {
    const user = (req as any).user;

    let data;

    if (user.role === ROLES.ADMIN) {
      data = await getAdminDashboard();
    } else if (user.role === ROLES.PROJECT_MANAGER) {
      data = await getPMDashboard(user.id);
    } else {
      data = await getDevDashboard(user.id);
    }

    return sendResponse(res, {
      success: true,
      message: "Dashboard fetched",
      data,
    });
  }
);