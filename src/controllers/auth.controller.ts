import { NextFunction, Request, Response } from "express";

import { authService } from "../services/auth.service";
import { ILogin } from "../types/auth.type";
import { IUser } from "../types/user.types";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Partial<IUser>;
      const user = await authService.singUp(body);

      res.json({ data: user });
    } catch (e) {
      next(e);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as ILogin;
      const jwtTokens = await authService.singIn(body);

      res.json({ data: jwtTokens });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();