import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.post("/refresh", commonMiddleware.isRefreshTokenValid, authController.refreshTokens);

export const authRouter = router;
