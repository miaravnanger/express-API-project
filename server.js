import express from "express";
import authRoutes from "./routes/auth.routes.js"
import todosRoutes from "./routes/todos.routes.js";
import healthRoutes from "./routes/health.routes.js"


const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());


app.get("/v1", healthRoutes);

app.use("/v1/auth", authRoutes);

app.use("/v1/", todosRoutes);


app.listen(PORT, () => console.log(`server running on port ${PORT}`));
