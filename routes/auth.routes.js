import express from "express";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";
import {
  loginController,
  logoutController, refreshController
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", validate(loginSchema), loginController);
router.post("/logout", requireAuth, logoutController);
router.post("/refresh", refreshController);

export default router;
