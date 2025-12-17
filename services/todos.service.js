import {v4 as uuidv4} from "uuid";

const todos = [];

export function createTodo({title, dueDate, tags}) {
    const todo = {
      id: uuidv4(),
      title,
      dueDate: dueDate || null,
      tags: tags || [],
      done: false,
      createdAt: Date.now(),
    };

    todos.push(todo);
    return todo;
}

export function getTodos({done, sort}) {
    let result = [...todos];

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
    return todos.find(t => t.id === id);
}

export function updateTodo(id, updates) {
    const todo = getTodoById(id);
    if(!todo) return null;

    if (updates.done !== undefined) {
        todo.done = updates.done;
    }
    
    return todo;
}

export function deleteTodo(id){
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return false;

    todos.splice(index, 1);
    return true;
}