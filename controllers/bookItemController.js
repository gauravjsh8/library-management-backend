import { BookItem } from "../models/bookItem.js";

export const getBookItems = async (req, res) => {
  try {
    const allBookItems = await BookItem.find().populate("book");

    return res.status(200).json({
      success: true,
      message: "All bookitems list are here ",
      allBookItems,
      count: allBookItems.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error " });
  }
};

export const getBookItemsByBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const items = await BookItem.find({ book: bookId }).populate("book");

    return res.status(200).json({
      success: true,
      items,
      count: items.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error " });
  }
};

export const getBookItemsByStatus = async (req, res) => {
  try {
    const { bookId } = req.params;
    const items = await BookItem.find({
      book: bookId,
      status: "Available",
    }).populate("book");

    return res.status(200).json({
      success: true,
      items,
      count: items.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error " });
  }
};
