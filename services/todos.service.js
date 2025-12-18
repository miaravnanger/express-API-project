import {generateId} from "../utils/id.js"

import {
    getAllTodos, addTodo, findTodoById, removeTodoById} from "../data/todos.store.js"


export function createTodo({title, dueDate, tags}) {
    const todo = {
      id: generateId(),
      title,
      dueDate: dueDate || null,
      tags: tags || [],
      done: false,
      createdAt: Date.now(),
    };

    addTodo(todo);
    return todo;
}

export function getTodos({done, sort}) {
    let result = [...getAllTodos()];

    if (done !== undefined) {
        result = result.filter(t => t.done === done);
    }
    
    if (sort === "asc") {
        result.sort((a, b)=> a.createdAt - b.createdAt);
    }

    if (sort === "desc") {
        result.sort((a, b)=> b.createdAt - a.createdAt);
    }

    return result;
}

export function getTodoById(id) {
    return findTodoById(id);
}

export function updateTodo(id, updates) {
    const todo = findTodoById(id);
    if(!todo) return null;

    if (updates.done !== undefined) {
        todo.done = updates.done;
    }
    
    return todo;
}

export function deleteTodo(id){
  return removeTodoById(id);
}