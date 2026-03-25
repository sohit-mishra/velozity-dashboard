import jwt, { type SignOptions } from "jsonwebtoken";
import env from "../config/env.js";

type TokenPayload = {
  id: string;
  role: string;
};

type Expires = NonNullable<SignOptions["expiresIn"]>;

export const generateAccessToken = (payload: TokenPayload) => {
  if (!env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET missing");
  }
  if (!env.ACCESS_TOKEN_EXPIRY) {
    throw new Error("ACCESS_TOKEN_EXPIRY missing");
  }

  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRY as Expires
  });
};

export const generateRefreshToken = (payload: TokenPayload) => {
  if (!env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET missing");
  }
  if (!env.REFRESH_TOKEN_EXPIRY) {
    throw new Error("REFRESH_TOKEN_EXPIRY missing");
  }

  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRY as Expires
  });
};