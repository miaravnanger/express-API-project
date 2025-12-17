import * as todosService from "../services/todos.service.js";

export function getTodosController (req, res) {
    const todos = todosService.getTodos();
    return res.status(200).json(todos);
}

export function createTodoController(req, res){
    const {title} = req.body;

    const todo = todosService.createTodo(title);
    return res.status(201).json(todo);
}