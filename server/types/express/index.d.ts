import { JwtPayload } from "jsonwebtoken";

// Custom JWT payload interface matching the structure in auth-controller
export interface AuthJwtPayload extends JwtPayload {
  userId: string;
  role: string;
  email: string;
  userName: string;
}

declare module "express" {
  export interface Request {
    user?: AuthJwtPayload;
  }
}
