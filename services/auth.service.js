import { generateId } from "../utils/id.js";
import jwt from "jsonwebtoken";

// Stores active login sessions in memory.
// Each sessionId (sid) is added on login and removed on logout.
// Used to invalidate JWTs even if they are still cryptographically valid.
const activeSessions = new Set();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";


export function login(credentials) {
  const { username, password } = credentials;

  const USER = {
    username: "admin",
    password: "Password1",
  };

  if (username !== USER.username || password !== USER.password) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const sessionId = generateId();

  activeSessions.add(sessionId);
  /* The session ID (sid) is included in both access and refresh tokens so the server can verify that the session is still active.*/
  const payload = {
    sub: "user-1",
    username: "admin",
    sid: sessionId,
  };

  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

  return { accessToken, refreshToken };
}

export function refreshAcessToken(refreshToken) {
  let payload;

  try {
    payload = jwt.verify(refreshToken, JWT_SECRET);
  } catch {
    throw new Error("INVALID_REFRESH_TOKEN");
  }

  const {sid} = payload;
  if (!activeSessions.has(sid)){
    throw new Error("SESSION_EXPIRED");
  }

  const newAccessToken = jwt.sign( {
    sub: payload.sub,
    username: payload.username,
    sid,
  },
JWT_SECRET, {expiresIn: "15m"}
);
return newAccessToken;
}


export function logout(sessionId) {
  activeSessions.delete(sessionId);
}

export function isSessionActive(sessionId) {
   return activeSessions.has(sessionId);
}
