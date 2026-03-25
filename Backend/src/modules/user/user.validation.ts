import { z } from "zod";
import { ROLES } from "../../utils/constants.js";

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum([
    ROLES.ADMIN,
    ROLES.PROJECT_MANAGER,
    ROLES.DEVELOPER,
  ]).optional(),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  role: z.enum([
    ROLES.ADMIN,
    ROLES.PROJECT_MANAGER,
    ROLES.DEVELOPER,
  ]).optional(),
});