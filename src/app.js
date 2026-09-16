import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Library API",
    version: "1.0.0"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime()
  });
});

app.get("/profile", (req, res) => {
  res.json({
    name: "Bat",
    role: "USER",
    email: "bat@example.com"
  });
});

app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);

  res.json({
    id: id,
    title: "Node.js Basics"
  });
});

app.get("/about", (req, res) => {
  res.json({
    name: "Library API",
    version: "1.0.0",
    author: "UFE Tech"
  });
});

app.get("/students", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Bat"
    },
    {
      id: 2,
      name: "Bold"
    },
    {
      id: 3,
      name: "Saraa"
    }
  ]);
});

app.get("/courses", (req, res) => {
  res.json([
    {
      id: 1,
      name: "JavaScript"
    },
    {
      id: 2,
      name: "Node.js"
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});