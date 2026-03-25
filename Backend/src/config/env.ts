import dotenv from "dotenv";

dotenv.config();

function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Check environment variable: ${key}`);
  }
  return value;
}

export const env = {
  PORT: process.env.PORT || "5000",

  DATABASE_URL: required("DATABASE_URL"),

  JWT_ACCESS_SECRET: required("JWT_ACCESS_SECRET") ,
  JWT_REFRESH_SECRET: required("JWT_REFRESH_SECRET") as string,

  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || "15m",
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || "7d",

  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",

  NODE_ENV: process.env.NODE_ENV || "development"
};

export default env;