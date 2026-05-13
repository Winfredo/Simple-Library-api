import express from "express";
import {
  borrowBook,
  returnBook,
  getStudentBorrows,
  getAllBorrows,
  getOverdueBorrows,
} from "../controllers/borrow.controller.js";
import {
  checkIfLoggedIn,
  checkIfLibrarian,
  checkIfStudent,
} from "../middlewares/book.middlewares.js";

const router = express.Router();

// student routes
router.post(
  "/:bookId",
  checkIfLoggedIn,
  checkIfStudent,
  borrowBook,
);
router.put(
  "/:borrowId/return",
  checkIfLoggedIn,
  checkIfStudent,
  returnBook,
);
router.get(
  "/my-books",
  checkIfLoggedIn,
  checkIfStudent,
  getStudentBorrows,
);

// librarian routes
router.get(
  "/",
  checkIfLoggedIn,
  checkIfLibrarian,
  getAllBorrows,
);
router.get(
  "/overdue",
  checkIfLoggedIn,
  checkIfLibrarian,
  getOverdueBorrows,
);

export default router;
