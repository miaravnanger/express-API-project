import express from "express";
import authRoutes from "./routes/auth.routes.js";
import todosRoutes from "./routes/todos.routes.js";
import healthRoutes from "./routes/health.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";


const app = express();

app.use(express.json());

app.use("/v1/health", healthRoutes);

app.use("/v1/auth", authRoutes);

app.use("/v1/todos", todosRoutes);

app.use(errorHandler);
