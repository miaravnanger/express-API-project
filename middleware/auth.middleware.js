import jwt from "jsonwebtoken";
import { isSessionActive } from "../services/auth.service.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";


export function requireAuth(req, res, next) {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ error: "Invalid Authorization header format" });
  }

  const token = parts[1];
	let payload;

  try {
		payload = jwt.verify(token, JWT_SECRET);
    const { sid } = payload;
    if (!isSessionActive(sid)) {
      return res.status(401).json({ error: "Session expired" });
    }
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  req.user = payload;
  next();
}
