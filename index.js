import express from "express";
import "dotenv/config";
import { connectToDb } from "./config/db.js";

const app = express();

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
