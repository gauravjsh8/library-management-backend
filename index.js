import express from "express";

const app = express();

const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Welcome to the library management system");
});

app.listen(PORT, () => {
  console.log("Welcome to the library management system");
});
