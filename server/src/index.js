import express from "express";
import mongoose from "mongoose";
import Flashcard from "./models/Flashcard.js";
const app = express();
const PORT = 5000;

// app.get("/flashcard", (req, res) => {
//   res.send("express server");
// });

app.use(express.json());

app.post("/flashcard", async (req, res) => {
  const newFlashcard = new Flashcard({
    title: req.body.title,
  });
  const createdFlashcard = await newFlashcard.save();
  res.json(createdFlashcard);
});

mongoose
  .connect(
    "mongodb+srv://studybuddy:kLW95dSvwybf2u9J@studybuddy.vldikcq.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
  });
