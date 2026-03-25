import type{ Request, Response } from "express";
import {
  loginService,
  refreshTokenService,
} from "./auth.service.js";

import { asyncHandler } from "../../utils/helpers.js";
import { sendResponse } from "../../utils/response.js";
import { loginSchema } from "./auth.validation.js";


export const login = asyncHandler(async (req: Request, res: Response) => {
  const parsed = loginSchema.parse(req.body);

  const data = await loginService(
    parsed.email,
    parsed.password
  );

  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return sendResponse(res, {
    success: true,
    message: "Login successful",
    data: {
      user: data.user,
      accessToken: data.accessToken,
    },
  });
});


export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "No refresh token",
    });
  }

  const tokens = await refreshTokenService(refreshToken);

  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return sendResponse(res, {
    success: true,
    message: "Token refreshed",
    data: {
      accessToken: tokens.accessToken,
    },
  });
});


export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken");

  return sendResponse(res, {
    success: true,
    message: "Logged out successfully",
  });
});