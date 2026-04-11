import { Book } from "../models/book.js";
import { BookItem } from "../models/bookItem.js";
import { BookLending } from "../models/bookLendingModel.js";

export const userBorrowedBooks = async (req, res) => {
  try {
    const borrowings = await BookLending.find({
      user: req.user.id,
      status: "issued",
    }).populate({
      path: "bookItem",
      populate: {
        path: "book",
        select: "title author",
      },
    });
    return res.status(200).json({
      success: true,
      count: borrowings.length,
      borrowings,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

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

    const lending = await BookLending.create({
      user: req.user.id,
      bookItem: bookItem._id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
      borrowedBook: bookItem,
      lending,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
