import express from "express";
import {requireAuth} from "../middleware/auth.middleware.js";
import { getTodosController, createTodoController, getTodoByIdController, updateTodoController, deleteTodoController } from "../controllers/todos.controller.js";

const router = express.Router();


router.get("/todos", requireAuth, getTodosController);
router.post("/todos", requireAuth, createTodoController);
router.get("/todos/:id", requireAuth, getTodoByIdController);
router.patch("/todos/:id", requireAuth, updateTodoController);
router.delete("/todos/:id", requireAuth, deleteTodoController);

export default router;