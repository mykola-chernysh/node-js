import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
  public isIdValid(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      if (!isObjectIdOrHexString(id)) {
        throw new ApiError("Incorrectly entered id", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public isUserValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, age, email } = req.body;

      if (!age || age <= 0 || !Number.isInteger(age)) {
        throw new ApiError("incorrectly entered age", 400);
      }
      if (!email || !email.includes("@")) {
        throw new ApiError("incorrectly entered email", 400);
      }
      if (!name || name.length <= 2) {
        throw new ApiError("incorrectly entered name", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const commonMiddleware = new CommonMiddleware();
