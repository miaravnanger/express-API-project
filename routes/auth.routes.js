import express from "express";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";
import {
  loginController,
  logoutController,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", validate(loginSchema), loginController);
router.post("/logout", requireAuth, logoutController);

router.get("/refresh", (req, res) => {
  res.status(501).json({ messsage: false });
});

export default router;
