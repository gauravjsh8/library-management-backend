import express from "express";
import { registerUser } from "../controllers/userController.js";
import { upload } from "../middlewares/multer.js";

export const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), registerUser);
