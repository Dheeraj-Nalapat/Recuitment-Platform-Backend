import {Request} from "express";

export type jwtPayload = {
  name: string;
  email: string;
  position: string;
};

export interface RequestWithUser extends Request {
  name: string;
  email: string;
  position: string;
}