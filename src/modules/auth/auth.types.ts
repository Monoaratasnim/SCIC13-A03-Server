export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: "user" | "owner";
}

export interface LoginPayload {
  email: string;
  password: string;
}