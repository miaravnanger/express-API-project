// In-memory data store for todos.
// Abstracted into a separate module to keep persistence logic
// separate from business logic.

const todos = [];

export function getAllTodos() {
  return todos;
}

export function addTodo(todo) {
  todos.push(todo);
}

export function findTodoById(id) {
  return todos.find((t) => t.id === id);
}

export function removeTodoById(id) {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return false;
  todos.splice(index, 1);
  return true;
}
