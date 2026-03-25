import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt.js";

import type { TokenPayload } from "./auth.types.js";

export const generateTokens = (payload: TokenPayload) => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};