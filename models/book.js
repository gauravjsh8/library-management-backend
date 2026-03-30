import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    ISBN: {
      type: String,
      required: true,
      unique: true,
    },
    category: String,

    coverPageUrl: String,

    imagePublicId: {
      type: String,
    },
    publisher: {
      type: String,
    },
    language: String,
    totalCopies: {
      type: Number,
      min: 1,
      default: 1,
    },
    availableCopies: {
      type: Number,
      min: 0,
      default: 1,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Book = mongoose.model("Book", bookSchema);
