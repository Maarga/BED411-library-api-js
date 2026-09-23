import express from "express";

import {
  books,
  findBookById,
  searchByTitle,
  getBooksFromDb,
  getBookOrThrow
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

app.get("/books", async (req, res) => {
  const books = await getBooksFromDb();
  const q = req.query.q;

  if (q) {
    return res.json(searchByTitle(q));
  }

  res.json(books);
});

app.get("/books/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const book = getBookOrThrow(id);

    res.json(book);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
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