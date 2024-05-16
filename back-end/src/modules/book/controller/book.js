import { isValidObjectId } from "mongoose";
import { bookModel } from "../../../../DB/models/book.model.js";
import { userModel } from "../../../../DB/models/user.model.js";
import { errorHandling } from "../../../utlis/errorHandling.js";
import moment from "moment";

const allBooks = errorHandling(async (req, res, next) => {
  const { email } = req.user;
  const books = await bookModel.find({ userEmail: email });
  return res.json({ message: "success", books });
});
const getBookById = errorHandling(async (req, res, next) => {
  const { id } = req.params;
  const isValid = isValidObjectId(id);
  if (isValid) {
    const book = await bookModel.findById(id);
    if (book) return res.status(200).json({ message: "success", book });
    next(new Error("book not found"));
  }
  next(new Error("Invalid ObjectId"));
});

const getIssuedBooks = errorHandling(async (req, res, next) => {
  const { email } = req.user;
  const books = await bookModel.find({ userEmail: email, issuedBook: true });
  return res.json({ message: "success", books });
});
const addBook = errorHandling(async (req, res, next) => {
  const { name, category, author } = req.body;
  console.log("addbook", req.body);
  const { email } = req.user;
  const oldBook = await bookModel.findOne({ bookName: name });
  if (oldBook) return next(new Error("Added book"));
  const book = await bookModel.create({
    userEmail: email,
    bookName: name,
    bookCategory: category,
    bookAuthor: author,
    bookPicture: req.file?.path,
  });
  if (book) {
    return res.status(200).json({ message: "Success book added" });
  }
  return next(new Error("failed to insert book"));
});
const nonReturnedBook = errorHandling(async (req, res, next) => {
  const { email } = req.user;
  const books = await bookModel.find({ userEmail: email, issuedBook: true });
  const updatedBooks = [];
  for (const book of books) {
    let late = Math.ceil(moment().diff(book.returnDate, "day", true));
    if (Object.is(late, -0) || late < 0) {
      late = 0;
    } else {
      const fine = late * 50;
      const updatedBook = await bookModel.findByIdAndUpdate(
        book._id,
        {
          fine,
          late,
        },
        { new: true }
      );
      updatedBooks.push(updatedBook);
    }
  }
  return res.json({ message: "success", books: updatedBooks });
});

const returnedBook = errorHandling(async (req, res, next) => {
  const { id } = req.body;
  const { email } = req.user;
  const isValid = isValidObjectId(id);

  if (isValid) {
    const returnedBook = await bookModel.findByIdAndUpdate(
      id,
      {
        issuedBook: false,
        issueDate: 0,
        returnDate: 0,
        late: 0,
        fine: 0,
      },
      { new: true }
    );
    if (returnedBook) {
      let books = await bookModel.find({
        userEmail: email,
        issuedBook: true,
      });

      books = books.filter((book) => book.late > 0 && book.fine > 0);

      return res.status(200).json({ message: "success", books });
    }
    next(new Error("book not found"));
  }
  next(new Error("Invalid ObjectId"));
});
const issuedBook = errorHandling(async (req, res, next) => {
  const { duration } = req.body;
  const { id } = req.params;
  const isValid = isValidObjectId(id);
  if (isValid) {
    const issuedBook = await bookModel.findByIdAndUpdate(
      id,
      {
        issuedBook: true,
        issueDate: moment(),
        returnDate: moment().add(duration, "day"),
      },
      { new: true }
    );
    if (issuedBook)
      return res.status(200).json({ message: "success", book: issuedBook });
    next(new Error("book not found"));
  }
  next(new Error("Invalid ObjectId"));
});
const searchNameBook = errorHandling(async (req, res, next) => {
  const { bookName } = req.body;
  const books = await bookModel.find({ bookName: { $regex: bookName } });
  res.json({ message: "success", books });
});

const deleteBook = errorHandling(async (req, res, next) => {
  const { email } = req.user;
  const { id } = req.params;
  const book = await bookModel.findOneAndDelete({ userEmail: email, _id: id });
  res.json({ message: "Success Book Deleted" });
});

export {
  allBooks,
  addBook,
  issuedBook,
  getBookById,
  nonReturnedBook,
  getIssuedBooks,
  returnedBook,
  searchNameBook,
  deleteBook,
};
