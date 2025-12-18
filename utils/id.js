// Generates unique IDs for entities (e.g. todos, sessions).
// Wrapped in a utility to allow easy replacement later.

import { v4 as uuidv4 } from "uuid";

export function generateId() {
  return uuidv4();
}
