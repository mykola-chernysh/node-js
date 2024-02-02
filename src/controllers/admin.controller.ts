import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";

class AdminController {
  public async getAdmins(req: Request, res: Response, next: NextFunction) {
    try {
      const admins = await userService.getAll();

      return res.json({ data: admins });
    } catch (e) {
      next(e);
    }
  }
}

export const adminController = new AdminController();
