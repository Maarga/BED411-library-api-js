import express from "express";

import {
  books,
  findBookById,
  searchByTitle
} from "./books.js";

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

app.get("/books", (req, res) => {
  const q = req.query.q;

  if (q) {
    return res.json(searchByTitle(q));
  }

  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = findBookById(id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  res.json(book);
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