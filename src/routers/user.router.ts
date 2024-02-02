import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { ERole } from "../enums/role.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("", userController.getAll);

router.get("/me", authMiddleware.checkAccessToken(ERole.USER), userController.getMe);
router.delete("/me", authMiddleware.checkAccessToken(ERole.USER), userController.deleteMe);
router.put(
  "/me",
  commonMiddleware.isBodyValid(UserValidator.update),
  authMiddleware.checkAccessToken(ERole.USER),
  userMiddleware.haveAccessByRole(ERole.USER, ERole.ADMIN),
  userController.updateMe,
);

router.get("/:id", commonMiddleware.isIdValid, userController.getById);

export const userRouter = router;
