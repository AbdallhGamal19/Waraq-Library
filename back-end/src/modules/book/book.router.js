import { Router } from "express";
import * as bookController from "./controller/book.js";
import { upload } from "../../utlis/multer.js";
import authentication from "../../midelWare/auth.js";
import validationMidelWare from "../../midelWare/validation.js";
import * as bookValidation from "./controller/validation.js";
const router = Router();
router.get("/", authentication, bookController.allBooks);
router.get("/bookDetails/:id", authentication, bookController.getBookById);
router.get("/nonReturnedBook", authentication, bookController.nonReturnedBook);
router.get("/issuedBooks", authentication, bookController.getIssuedBooks);
router.post("/search", authentication, bookController.searchNameBook);
router.post(
  "/addBook",
  authentication,
  upload().single("bookPicture"),
  validationMidelWare(bookValidation.bookSchema),
  bookController.addBook
);
router.post("/issued/:id", authentication, bookController.issuedBook);
router.post("/returnedBook", authentication, bookController.returnedBook);
router.post("/delete/:id", authentication, bookController.deleteBook);

export default router;
