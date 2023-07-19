import express from "express";
import mongoose from "mongoose";
import Flashcard from "./models/Flashcard.js";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
const PORT = 5000;
dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.get("/flashcard", async (req, res) => {
  const flashcards = await Flashcard.find();
  res.json(flashcards);
});

app.post("/flashcard", async (req, res) => {
  const newFlashcard = new Flashcard({
    title: req.body.title,
  });
  const createdFlashcard = await newFlashcard.save();
  res.json(createdFlashcard);
});

app.delete("/flashcard/:flashcardId", async (req, res) => {
  const flashcardId = req.params.flashcardId;
  const flashcard = await Flashcard.findByIdAndDelete(flashcardId);
  res.json(flashcard);
});

mongoose.connect(`${process.env.REACT_APP_API_URL}`).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
