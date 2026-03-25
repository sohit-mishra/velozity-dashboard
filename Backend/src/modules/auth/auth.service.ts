import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../../config/env.js";

import { generateTokens } from "./auth.tokens.js";

export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const payload = {
    id: user.id,
    role: user.role,
  };

  const tokens = generateTokens(payload);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    ...tokens,
  };
};

export const refreshTokenService = async (refreshToken: string) => {
  if (!env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET missing");
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      env.JWT_REFRESH_SECRET
    ) as any;

    const payload = {
      id: decoded.id,
      role: decoded.role,
    };

    return generateTokens(payload);
  } catch {
    throw new Error("Invalid refresh token");
  }
};