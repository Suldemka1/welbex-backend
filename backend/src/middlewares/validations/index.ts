import { isString } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const postValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  isString(req.body.message);
  next();
};

export const postCreationValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.message) {
    console.log("no error");
    next();
  } else {
    console.log("error");
    res.end()
  }
};
