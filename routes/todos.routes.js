import express from "express";
import {requireAuth} from "../middleware/auth.middleware.js";
import { getTodosController, createTodoController, getTodoByIdController, updateTodoController, deleteTodoController } from "../controllers/todos.controller.js";
import {createTodoSchema, updateTodoSchema} from "../schemas/todos.schema.js"
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();


router.get("/", requireAuth, getTodosController);
router.post("/", requireAuth, validate(createTodoSchema) ,createTodoController);
router.get("/:id", requireAuth, getTodoByIdController);
router.patch("/:id", requireAuth,validate(updateTodoSchema) ,updateTodoController);
router.delete("/:id", requireAuth, deleteTodoController);

export default router;