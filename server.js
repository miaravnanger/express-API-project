import express from "express";
// import cors from "cors";


const PORT = process.env.PORT || 3000;
 
const app = express();

// app.use(cors()
// )


app.get("/", (req, res) => {
  res.json();
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
