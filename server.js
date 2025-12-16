import express from "express";
import authRoutes from "./routes/auth.routes.js"

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());


// public
app.get("/v1/health", (req, res) => {
  res.status(200).json({ ok: true });
});

// routes
app.use("/v1/auth", authRoutes);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
