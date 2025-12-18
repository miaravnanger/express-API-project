import * as authService from "../services/auth.service.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export function refreshController(req, res) {
  const refreshToken = req.get("x-refresh-token");

  if (!refreshToken) {
    return res.status(400).json({error: "Missing refresh token"});
  }

  try {
    const payload = jwt.verify(refreshToken, JWT_SECRET);
    const {sid, username, sub} = payload;

    if (!authService.isSessionActive(sid)) {
      return res.status(401).json({error: "Session expired"})
    }

    const newAccessToken = jwt.sign(
      {sub, username, sid},
      JWT_SECRET,
      {expiresIn:"15m"}
    );

    return res.status(200).json({accessToken: newAccessToken});

} catch (err) {
  return res.status(401).json({error: "Invalid refresh token"});
}
}


export function loginController(req, res, next) {
  try {
    const tokens = authService.login(req.body);

    return res.status(200).json(tokens);
  } catch (err) {
    if (err.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        error: "Unauthorized: Wrong username and/or password",
      });
    }
    next(err);
  }
}

export function logoutController(req, res){
const {sid} = req.user;

authService.logout(sid);

return res.status(204).end()
}
