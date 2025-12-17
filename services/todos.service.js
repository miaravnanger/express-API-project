import {v4 as uuidv4} from "uuid";

const todos = [];

export function getTodos(){
    return todos;

}

export function createTodo(title) {
    const todo= {
        id: uuidv4(),
        title,
        completed: false,
    };

    todos.push(todo);
    return todo;
}