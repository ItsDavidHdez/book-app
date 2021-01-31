const { Router, request } = require("express");
const router = Router();

const Book = require("../models/Book");

router.get("/api/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.post("/api/books", async (req, res) => {
  const { title, author, isbn } = req.body;
  const imagePath = "./uploads/" + req.file.filename;
  const newBook = new Book({ title, author, isbn, imagePath });
  await newBook.save();
  res.json({ message: "Book saved" });
});

router.delete("/api/books/:id", async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  console.log(book);
  res.json({ message: "Book deleted" });
});

module.exports = router;
