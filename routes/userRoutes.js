import express from "express";
import {
  loginUser,
  registerUser,
  userProfile,
} from "../controllers/userController.js";
import { upload } from "../middlewares/multer.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/profile", authMiddleware, userProfile);
