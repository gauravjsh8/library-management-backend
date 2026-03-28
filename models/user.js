import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["member", "librarian"],
      default: "member",
    },
    imageUrl: String,
    phoneNumber: {
      type: String,
    },
    address: String,
  },
  { timeStamps: true },
);

export const User = mongoose.model("User", userSchema);
