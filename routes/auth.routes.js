import express from "express";
import { validate } from "../middleware/validate.middleware";
import { loginSchema } from "../schemas/auth.schema.js";

const router = express.Router();

router.post("/login", validate(loginSchema), (req, res) => {
  res.status(200).json({ success: true });
  console.log(req.body);
});

router.get("/refresh", (req, res) => {
  res.status(501).json({ messsage: false });
});

export default router;
