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

app.get("/flashcards", async (req, res) => {
  const flashcard = await Flashcard.find();
  res.json(flashcard);
});

app.post("/flashcards", async (req, res) => {
  const newFlashcard = new Flashcard({
    title: req.body.title,
  });
  const createdFlashcard = await newFlashcard.save();
  res.json(createdFlashcard);
});

app.get("/flashcards/:flashcardId", async (req, res) => {
  const { flashcardId } = req.params;
  const flashcard = await Flashcard.findById(flashcardId);
  res.json(flashcard);
});

app.post("/flashcards/:flashcardId/cards", async (req, res) => {
  const flashcardId = req.params.flashcardId;
  const flashcard = await Flashcard.findById(flashcardId);
  const { text } = req.body;
  flashcard.cards.push(text);
  await flashcard.save();
  res.json(flashcard);
});

app.delete("/flashcards/:flashcardId", async (req, res) => {
  const flashcardId = req.params.flashcardId;
  const flashcard = await Flashcard.findByIdAndDelete(flashcardId);
  res.json(flashcard);
});

mongoose.connect(`${process.env.REACT_APP_API_URL}`).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
