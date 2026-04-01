import mongoose from "mongoose";

const bookItemSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    barcode: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["available", "issued", "reserved", "lost"],
      default: "available",
    },
  },
  { timestamps: true },
);

export const BookItem = mongoose.model("BookItem", bookItemSchema);
