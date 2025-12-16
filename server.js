import express from "express";
// import cors from "cors";

const PORT = process.env.PORT || 3000;

const app = express();

// app.use(cors()
// )
app.use(express.json());

app.get("/v1/health", (req, res) => {
  res.status(200).json({ ok: true });
});

app.post("/v1/auth/login", (req, res) => {
  res.status(200).json({ success: true });
  console.log(req.body);
});

app.get("/v1/auth/refresh", (req, res) => {
  res.status(501).json({ messsage: false });
});

app.get("/v1/todos", (req, res) => {
  res.json([]);
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
