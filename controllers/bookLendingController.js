import { Book } from "../models/book.js";
import { BookItem } from "../models/bookItem.js";

export const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    if (book.availableCopies <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "Book not available at the moment" });
    }

    const bookItem = await BookItem.findOne({
      book: bookId,
      status: "available",
    });
    if (!bookItem) {
      return res
        .status(404)
        .json({ success: false, message: "Book not available at the moment" });
    }

    bookItem.status = "issued";
    await bookItem.save();

    book.availableCopies -= 1;
    await book.save();

    return res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
      burrowedBook: bookItem,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
