import mongoose from "mongoose";

const Schema = mongoose.Schema;

const flashcardSchema = new Schema({
  title: String,
});

const flashcardModel = mongoose.model("Flashcard", flashcardSchema);

export default flashcardModel;
