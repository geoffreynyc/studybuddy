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

// RETURNS ALL FLASHCARDS FROM DB
app.get("/flashcards", async (req, res) => {
  const flashcard = await Flashcard.find();
  res.json(flashcard);
});

// HANDLES CREATION OF FLASHCARD
app.post("/flashcards", async (req, res) => {
  const newFlashcard = new Flashcard({
    title: req.body.title,
  });
  const createdFlashcard = await newFlashcard.save();
  res.json(createdFlashcard);
});

// RETURNS DETAIL OF SPECIFIC FLASHCARD
app.get("/flashcards/:flashcardId", async (req, res) => {
  const { flashcardId } = req.params;
  const flashcard = await Flashcard.findById(flashcardId);
  res.json(flashcard);
});

// ADDS CARD TO DECK
app.post("/flashcards/:flashcardId/cards", async (req, res) => {
  const flashcardId = req.params.flashcardId;
  const flashcard = await Flashcard.findById(flashcardId);
  const { text } = req.body;
  flashcard.cards.push(text);
  await flashcard.save();
  res.json(flashcard);
});

// DELETES DECK
app.delete("/flashcards/:flashcardId", async (req, res) => {
  const flashcardId = req.params.flashcardId;
  const flashcard = await Flashcard.findByIdAndDelete(flashcardId);
  res.json(flashcard);
});

// DELETES CARD IN FLASHCARD
app.delete("/flashcards/:flashcardId/cards/:index", async (req, res) => {
  const flashcardId = req.params.flashcardId;
  const index = req.params.index;
  const flashcard = await Flashcard.findById(flashcardId);
  if (!flashcard) return res.status(400).send("No deck");
  flashcard.cards.splice(parseInt(index), 1);
  await flashcard.save();
  res.json(flashcard.cards);
});

mongoose.connect(`${process.env.REACT_APP_API_URL}`).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
