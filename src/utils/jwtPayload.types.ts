import { Request } from "express";

export type jwtPayload = {
  name: string;
  email: string;
  position: string;
  userId: number;
};

export interface RequestWithUser extends Request {
  name: string;
  email: string;
  position: string;
  userId: number;
}
