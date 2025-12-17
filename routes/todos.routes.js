import express from "express";
import {requireAuth} from "../middleware/auth.middleware.js";

const router = express.Router();


router.get("/todos", requireAuth, (req, res) => {
  res.json({
    message: "Protected todos endpoint",
    user: req.user,
  });
});

export default router;