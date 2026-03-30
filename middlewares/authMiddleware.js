import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token available",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = {
      id: user._id,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export const isLibrarian = (req, res, next) => {
  if (req.user.role !== "librarian") {
    return res.status(403).json({
      success: false,
      message: "Access denied, only for librarians",
    });
  }

  next();
};
