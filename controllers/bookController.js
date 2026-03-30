import mongoose from "mongoose";
import { Book } from "../models/book.js";
import { streamUpload } from "../utils/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";

export const createBook = async (req, res) => {
  try {
    const { title, author, ISBN, category, publisher, language, totalCopies } =
      req.body;

    if (!title || !author || !ISBN || !totalCopies) {
      return res
        .status(400)
        .json({ message: "Please fill in the required field" });
    }

    const existingBook = await Book.findOne({ ISBN });

    if (existingBook) {
      return res.status(400).json({
        success: false,
        message: "Book with this ISBN already exists",
      });
    }
    let coverPageUrl = "";
    let imagePublicId = "";

    if (req.file) {
      const result = await streamUpload(req.file.buffer, "books", "image");
      coverPageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    const newBook = await Book.create({
      title,
      author,
      ISBN,
      category,
      publisher,
      language,
      totalCopies,
      availableCopies: totalCopies,
      createdBy: req.user.id,
      coverPageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Book created",
      book: newBook,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    if (books.length == 0) {
      return res
        .status(200)
        .json({ success: true, message: "No books found", books: [] });
    }
    return res
      .status(200)
      .json({ success: true, message: "All books list", books });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid book id" });
    }
    const book = await Book.findById(bookId);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book  not found with that id" });
    }
    return res.status(200).json({ success: true, message: "Book found", book });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid book id" });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found with this id" });
    }

    if (book.imagePublicId) {
      await cloudinary.uploader.destroy(book.imagePublicId);
    }
    await book.deleteOne();

    return res
      .status(200)
      .json({ success: true, message: "Book deleted", deletedBook: book });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const {
      title,
      author,
      ISBN,
      category,
      publisher,
      language,
      totalCopies,
      availableCopies,
    } = req.body;
    const bookId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid book id" });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book  not found with this id" });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.ISBN = ISBN || book.ISBN;
    book.category = category || book.category;
    book.publisher = publisher || book.publisher;
    book.language = language || book.language;
    book.totalCopies = totalCopies || book.totalCopies;
    book.availableCopies = availableCopies || book.availableCopies;

    let result;
    if (req.file) {
      if (book.imagePublicId) {
        await cloudinary.uploader.destroy(book.imagePublicId);
      }
      result = await streamUpload(req.file.buffer, "books", "image");
      book.coverPageUrl = result.secure_url;
      book.imagePublicId = result.public_id;
    }
    const updatedBook = await book.save();
    return res
      .status(200)
      .json({ success: true, message: "Book updated", updatedBook });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
