import { v4 as uuidv4 } from "uuid";
const activeSessions = new Set();

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
  return sessionId;
}

export function logout(sessionId) {}

export function isSessionActive(sessionId) {}
