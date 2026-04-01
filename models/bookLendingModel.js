import mongoose from "mongoose";

const bookLendingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookItem",
      required: true,
    },
    issueDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnDate: Date,
    status: {
      type: String,
      enum: ["issued", "returned"],
      default: "issued",
    },
  },
  { timestamps: true },
);

export const BookLending = mongoose.model("BookLending", bookLendingSchema);
