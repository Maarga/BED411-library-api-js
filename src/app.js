import express from "express";
import booksRouter from "./routes/books.router.js";
import { logger } from "./middlewares/logger.js";
import { notFound, errorHandler } from "./middlewares/error.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({ message: "Library API", version: "1.0.0" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/books", booksRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`http://localhost:${PORT}`);
});