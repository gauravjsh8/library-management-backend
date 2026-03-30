import express from "express";

import { upload } from "../middlewares/multer.js";
import { authMiddleware, isLibrarian } from "../middlewares/authMiddleware.js";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/bookController.js";

export const bookRouter = express.Router();

bookRouter.post(
  "/create-book",
  authMiddleware,
  upload.single("image"),

  createBook,
);

bookRouter.get(
  "/single-book/:id",

  getBookById,
);

bookRouter.get(
  "/get-all-books",

  getAllBooks,
);

bookRouter.delete(
  "/delete-book/:id",
  authMiddleware,
  isLibrarian,

  deleteBook,
);

bookRouter.put(
  "/update-book/:id",
  authMiddleware,
  isLibrarian,
  upload.single("image"),

  updateBook,
);
