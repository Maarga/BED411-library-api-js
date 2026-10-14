export const books = [
  {
    id: 1,
    title: "Node.js Basics",
    price: 45000,
    isAvailable: true
  },
  {
    id: 2,
    title: "Express Guide",
    price: 52000,
    isAvailable: true
  },
  {
    id: 3,
    title: "JavaScript Advanced",
    price: 61000,
    isAvailable: false
  },
  {
    id: 4,
    title: "Node.js API",
    price: 48000,
    isAvailable: true
  }
];

let nextId = 5;

export function countAvailable() {
  return books.filter((book) => book.isAvailable).length;
}

export function findBookById(id) {
  return books.find((book) => book.id === id);
}

export function searchByTitle(keyword) {
  return books.filter((book) =>
    book.title.toLowerCase().includes(keyword.toLowerCase())
  );
}

export function getBooksFromDb() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books);
    }, 500);
  });
}

export function getBookOrThrow(id) {
  const book = findBookById(id);

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
}

export function addBook(input) {
  const book = {
    id: nextId++,
    isAvailable: true,
    ...input
  };

  books.push(book);
  return book;
}

export function updateBook(id, changes) {
  const book = findBookById(id);

  if (!book) return null;

  const { id: _ignored, ...safeChanges } = changes;
  Object.assign(book, safeChanges);

  return book;
}

export function removeBook(id) {
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) return false;

  books.splice(index, 1);
  return true;
}