import { ROLES } from "../../utils/constants.js";

export type Role = (typeof ROLES)[keyof typeof ROLES];

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role?: Role;
};

export type UpdateUserInput = {
  name?: string;
  email?: string;
  role?: Role;
};

export type UserResponse = Omit<User, "createdAt" | "updatedAt">;