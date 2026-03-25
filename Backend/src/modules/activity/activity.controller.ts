import type{ Request, Response } from "express";
import { getActivities } from "./activity.service.js";

import { asyncHandler } from "../../utils/helpers.js";
import { sendResponse } from "../../utils/response.js";


export const list = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const projectId = req.query.projectId as string | undefined;

  const activities = await getActivities(user, projectId);

  return sendResponse(res, {
    success: true,
    message: "Activity fetched",
    data: activities,
  });
});