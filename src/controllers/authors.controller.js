import { prisma } from "../db.js";

function parseId(req) {
  const id = Number(req.params.id);
  return Number.isInteger(id) ? id : null;
}

// GET /authors
export async function getAuthors(req, res) {
  const authors = await prisma.author.findMany({ orderBy: { id: "asc" } });
  res.json({ count: authors.length, data: authors });
}

// GET /authors/:id
export async function getAuthor(req, res) {
  const id = parseId(req);

  if (id === null) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const author = await prisma.author.findUnique({ where: { id } });

  if (!author) {
    return res.status(404).json({ message: "Зохиолч олдсонгүй" });
  }

  res.json(author);
}

// POST /authors
export async function createAuthor(req, res) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "name and email are required" });
  }

  try {
    const author = await prisma.author.create({ data: { name, email } });
    res.status(201).json(author);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Email already exists" });
    }
    throw error;
  }
}

// GET /authors/:id/books
export async function getAuthorBooks(req, res) {
  const authorId = parseId(req);

  if (authorId === null) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const author = await prisma.author.findUnique({
    where: { id: authorId },
    include: { books: true },
  });

  if (!author) {
    return res.status(404).json({ message: "Зохиолч олдсонгүй" });
  }

  res.json(author.books);
}