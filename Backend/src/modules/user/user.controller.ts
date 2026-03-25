import type { Request, Response } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./user.service.js";

import { asyncHandler } from "../../utils/helpers.js";
import { sendResponse } from "../../utils/response.js";
import {
  createUserSchema,
  updateUserSchema,
} from "./user.validation.js";
import type { CreateUserInput, UpdateUserInput } from "./user.types.js";


export const create = asyncHandler(async (req: Request, res: Response) => {
  const parsed = createUserSchema.parse(req.body);

  const user = await createUser(parsed as CreateUserInput);

  return sendResponse(res, {
    success: true,
    message: "User created successfully",
    data: user,
  });
});


export const list = asyncHandler(async (req: Request, res: Response) => {
  const users = await getUsers();

  return sendResponse(res, {
    success: true,
    message: "Users fetched",
    data: users,
  });
});


export const getOne = asyncHandler(async (req: Request, res: Response) => {
  const user = await getUserById(req.params.id as string);

  return sendResponse(res, {
    success: true,
    message: "User fetched",
    data: user,
  });
});


export const update = asyncHandler(async (req: Request, res: Response) => {
  const parsed = updateUserSchema.parse(req.body);

  const user = await updateUser(req.params.id as string, parsed as UpdateUserInput);

  return sendResponse(res, {
    success: true,
    message: "User updated",
    data: user,
  });
});


export const remove = asyncHandler(async (req: Request, res: Response) => {
  await deleteUser(req.params.id as string);

  return sendResponse(res, {
    success: true,
    message: "User deleted",
  });
});