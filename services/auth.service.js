import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

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

  const sessionId = uuidv4();

  activeSessions.add(sessionId);
  const payload = {
    sub: "user-1",
    username: "admin",
    sid: sessionId
  }

  const accessToken = jwt.sign(payload, JWT_SECRET, {expiresIn: "15m"});
  const refreshToken = jwt.sign(payload, JWT_SECRET, {expiresIn: "7d"})
  

  return {accessToken, refreshToken};
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
