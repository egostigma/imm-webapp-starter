import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  id: String,
  isbn: String,
  title: String,
  author: String,
  description: String,
  // eslint-disable-next-line @typescript-eslint/camelcase
  published_year: { type: Number},
  publisher: String,
  // eslint-disable-next-line @typescript-eslint/camelcase
  updated_date: { type: Date, default: Date.now }
});

const BookModel = mongoose.model("Book", BookSchema);

export default BookModel;
