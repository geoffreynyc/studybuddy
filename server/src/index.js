import express from "express";
import mongoose from "mongoose";
import Flashcard from "./models/Flashcard.js";
import dotenv from "dotenv";
const app = express();
const PORT = 5000;
dotenv.config();

app.get("/flashcard", (req, res) => {
  res.send("express server");
});

app.use(express.json());

app.post("/flashcard", async (req, res) => {
  const newFlashcard = new Flashcard({
    title: req.body.title,
  });
  const createdFlashcard = await newFlashcard.save();
  res.json(createdFlashcard);
});

mongoose.connect(`${process.env.REACT_APP_API_URL}`).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
