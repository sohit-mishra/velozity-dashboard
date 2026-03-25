import { ROLES } from "../../utils/constants.js";

export type Role = (typeof ROLES)[keyof typeof ROLES];

export type CreateProjectInput = {
  name: string;
  clientName: string;
};

export type UpdateProjectInput = {
  name?: string;
  clientName?: string;
};