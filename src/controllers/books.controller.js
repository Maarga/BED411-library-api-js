import { prisma } from "../db.js";

function parseId(req) {
  const id = Number(req.params.id);
  return Number.isInteger(id) ? id : null;
}

function searchBooks(q) {
  return prisma.book.findMany({
    where: { title: { contains: q, mode: "insensitive" } },
    include: { author: true },
    orderBy: { id: "asc" }
  });
}

export async function list(req, res) {
  const q = req.query.q;
  const books = q
    ? await searchBooks(q)
    : await prisma.book.findMany({
        include: { author: true }, // NEW
        orderBy: { id: "asc" }
      });

  res.json({ count: books.length, data: books });
}

export async function search(req, res) {
  const q = req.query.q;

  if (!q) {
    return res.status(400).json({ message: "q is required" });
  }

  const books = await searchBooks(q);
  res.json({ count: books.length, data: books });
}

export async function getOne(req, res) {
  const id = parseId(req);

  if (id === null) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const book = await prisma.book.findUnique({
    where: { id },
    include: { author: true } // NEW
  });

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
}

export async function create(req, res) {
  const { title, price, authorId } = req.body; // NEW: authorId

  // NEW: authorId must be a number
  if (!title || typeof price !== "number" || typeof authorId !== "number") {
    return res
      .status(400)
      .json({ message: "title, price and authorId are required" });
  }

  // NEW: try/catch for P2003 (that author doesn't exist)
  try {
    const book = await prisma.book.create({
      data: { title, price, authorId },
      include: { author: true }
    });

    res.status(201).json(book);
  } catch (error) {
    if (error.code === "P2003") {
      return res.status(400).json({ message: "Зохиолч олдсонгүй" });
    }
    throw error;
  }
}

export async function update(req, res) {
  const id = parseId(req);

  if (id === null) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const { id: _id, createdAt: _createdAt, ...changes } = req.body;

  try {
    const book = await prisma.book.update({
      where: { id },
      data: changes
    });

    res.json(book);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Book not found" });
    }
    // NEW: PATCH with an authorId that doesn't exist
    if (error.code === "P2003") {
      return res.status(400).json({ message: "Зохиолч олдсонгүй" });
    }
    throw error;
  }
}

export async function remove(req, res) {
  const id = parseId(req);

  if (id === null) {
    return res.status(400).json({ message: "Invalid id" });
  }

  try {
    await prisma.book.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Book not found" });
    }
    throw error;
  }
}