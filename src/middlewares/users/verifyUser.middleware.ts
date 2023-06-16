import { NextFunction, Request, Response } from "express";
import { AppError } from "../../error";


const verifyUserPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { admin } = res.locals.decoded;

  if (admin === false) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export {verifyUserPermission};