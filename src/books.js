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

const titles = books.map(
  (book) => book.title
);

const labels = books.map(
  (book) => `${book.title} — ${book.price}`
);

console.log(titles);
console.log(labels);
console.log(books.length);

const cheap = books.filter(
  (book) => book.price < 50000
);

const available = books.filter(
  (book) => book.isAvailable
);

const book3 = books.find(
  (book) => book.id === 3
);

const book99 = books.find(
  (book) => book.id === 99
);

console.log(cheap);
console.log(available);
console.log(book3);
console.log(book99 ?? "not found");

function sum(a, b) {
  return a + b;
}

function isExpensive(book) {
  return book.price > 50000;
}

function getTitles(books) {
  return books.map((book) => book.title);
}

export function countAvailable() {
  return books.filter(
    (book) => book.isAvailable
  ).length;
}

function formatPrice(price) {
  return `${price}₮`;
}

export function findBookById(id) {
  return books.find(
    (book) => book.id === id
  );
}

export function searchByTitle(keyword) {
  return books.filter((book) =>
    book.title
      .toLowerCase()
      .includes(keyword.toLowerCase())
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