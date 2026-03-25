import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcrypt";
import type {
  CreateUserInput,
  UpdateUserInput,
} from "./user.types.js";

export const createUser = async (data: CreateUserInput) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};

export const getUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
};

export const updateUser = async (
  id: string,
  data: UpdateUserInput
) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};