import * as authService from "../services/auth.service.js";

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
