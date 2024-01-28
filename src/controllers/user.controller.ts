import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";
import { IUser } from "../types/user.types";

class UserController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();

      return res.json({ data: users });
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      const user = await userService.getById(id);

      res.json({ data: user });
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      await userService.deleteById(id);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const dto = req.body as Partial<IUser>;

      const user = await userService.updateById(id, dto);

      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
