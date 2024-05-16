import { Schema, Types, model } from "mongoose";
const bookSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    bookName: {
      type: String,
      unique: true,
      required: true,
      lowerCase: true,
    },
    bookCategory: {
      type: String,
      required: true,
    },
    bookAuthor: {
      type: String,
      required: true,
    },
    bookPicture: {
      type: String,
      required: true,
    },
    issuedBook: {
      type: Boolean,
      default: false,
    },
    issueDate: {
      type: Date,
    },

    returnDate: {
      type: Date,
    },

    late: {
      type: Number,
      default: 0,
    },

    fine: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const bookModel = model("book", bookSchema);
