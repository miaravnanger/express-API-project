import express from "express";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";
import { loginController } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", validate(loginSchema), loginController);
;

router.get("/refresh", (req, res) => {
  res.status(501).json({ messsage: false });
});

export default router;
