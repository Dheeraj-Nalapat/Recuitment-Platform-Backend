import { NextFunction } from "express";
import { Response } from "express";
import { jwtPayload, RequestWithUser } from "../utils/jwtPayload.types";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";

const authorize = async (
  request: RequestWithUser,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = getTokenFromRequestHeader(request);
    const payload = jsonwebtoken.verify(token, JWT_SECRET);
    request.name = (payload as jwtPayload).name;
    request.email = (payload as jwtPayload).email;
    request.position = (payload as jwtPayload).position;
    return next();
  } catch (error) {
    next(error);
  }
};

const getTokenFromRequestHeader = (req: RequestWithUser) => {
  const bearerToken = req.header("Authorization");
  console.log("bearerToken: ", bearerToken);
  const token = bearerToken ? bearerToken.replace("Bearer ", "") : "";
  return token;
};

export default authorize;
