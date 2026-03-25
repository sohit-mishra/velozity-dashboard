import type { Request, Response } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "./project.service.js";

import { asyncHandler } from "../../utils/helpers.js";
import { sendResponse } from "../../utils/response.js";
import {
  createProjectSchema,
  updateProjectSchema,
} from "./project.validation.js";


export const create = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const parsed = createProjectSchema.parse(req.body);

  const project = await createProject(parsed, user);

  return sendResponse(res, {
    success: true,
    message: "Project created",
    data: project,
  });
});


export const list = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const projects = await getProjects(user);

  return sendResponse(res, {
    success: true,
    message: "Projects fetched",
    data: projects,
  });
});


export const getOne = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const project = await getProjectById(req.params.id as string, user);

  return sendResponse(res, {
    success: true,
    message: "Project fetched",
    data: project,
  });
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const parsed = updateProjectSchema.parse(req.body);

  const project = await updateProject(
    req.params.id as string,
    parsed,
    user
  );

  return sendResponse(res, {
    success: true,
    message: "Project updated",
    data: project,
  });
});


export const remove = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  await deleteProject(req.params.id as string, user);

  return sendResponse(res, {
    success: true,
    message: "Project deleted",
  });
});