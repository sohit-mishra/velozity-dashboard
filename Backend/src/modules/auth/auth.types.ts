export type LoginInput = {
  email: string;
  password: string;
};

export type TokenPayload = {
  id: string;
  role: string;
};