import * as authService from "../services/auth.service.js";

export function loginController(req, res, next) {
  try {
    const sessionId = authService.login(req.body);

    return res.status(200).json({ sessionId });
  } catch (err) {
    if (err.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        error: "Unauthorized: Wrong username and/or password",
      });
    }
    next(err);
  }
}
