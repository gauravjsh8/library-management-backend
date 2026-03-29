import express from "express";
import "dotenv/config";
import "./config/cloudinary.js";
import { connectToDb } from "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";

import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to the library management system");
});

const startServer = async () => {
  try {
    await connectToDb();
    app.listen(PORT, () => {
      console.log(`Server is running on Port ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to start server ", error);
  }
};

startServer();
