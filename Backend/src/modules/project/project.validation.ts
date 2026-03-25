import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(2),
  clientName: z.string().min(2),
});

export const updateProjectSchema = z.object({
  name: z.string().optional(),
  clientName: z.string().optional(),
});