import * as todosService from "../services/todos.service.js";

export function createTodoController(req, res){
	const {title, dueDate, tags} = req.body;

	if (!title) {
		return res.status(400).json({error: "Title is required"})
	}

    const todo = todosService.createTodo({title, dueDate, tags});
    return res.status(201).json(todo)
}


export function getTodosController (req, res) {
	const {done, sort} = req.query;

    const todo = todosService.getTodos({
			done: done === undefined ? undefined : done === "true",
			sort,
		});

    return res.status(200).json(todo);
}

export function getTodoByIdController(req, res) {
	const todo = todosService.getTodoById(req.params.id);

	if (!todo) {
		return res.status(404).json({error: "Todo not found"});
	}
	return res.status(200).json(todo);
}

export function updateTodoController(req, res) {
	const {done} = req.body;
	if (typeof done !== "boolean") {
		return res
		.status(400)
		.json({error: "Field 'done' must be true or false"});
	}

	const todo = todosService.updateTodo(req.params.id, {done});

	if (!todo) {
		return res.status(404).json({error: "Todo not found"})

	}
	return res.status(200).json(todo);
}

export function deleteTodoController(req, res) {
  const success = todosService.deleteTodo(req.params.id);

  if (!success) {
    return res.status(404).json({ error: "Todo not found" });
  }
  return res.status(204).end();
}