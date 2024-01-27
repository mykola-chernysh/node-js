import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";

class UserController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();

      return res.status(200).json({ data: users });
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const user = await userService.getById(id);

      res.json({ data: user });
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      const newUser = await userService.create(body);

      res.status(201).json({ data: newUser });
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      await userService.deleteById(id);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const body = req.body;

      const user = await userService.updateById(id, body);

      res.status(201).json(user);
    } catch (e) {
      res.status(400).json(e.message);
    }
  }
}

export const userController = new UserController();
