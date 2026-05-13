import mongoose from "mongoose";
import BorrowService from "../services/borrow.service.js";

const borrowBook = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    const { bookId } = req.params;

    const borrow = await BorrowService.borrowBook(studentId, bookId);

    return res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      borrow,
    });
  } catch (error) {
    return next(error);
  }
};

const returnBook = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    const { borrowId } = req.params;

    const borrow = await BorrowService.returnBook(borrowId, studentId);

    return res.status(200).json({
      success: true,
      message: "Book returned successfully",
      borrow,
    });
  } catch (error) {
    return next(error);
  }
};

const getStudentBorrows = async (req, res, next) => {
  try {
    const studentId = req.user.id;

    const borrows = await BorrowService.getStudentBorrows(studentId);

    return res.status(200).json({
      success: true,
      count: borrows.length,
      borrows,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllBorrows = async (req, res, next) => {
  try {
    const borrows = await BorrowService.getAllBorrows();

    return res.status(200).json({
      success: true,
      count: borrows.length,
      borrows,
    });
  } catch (error) {
    return next(error);
  }
};

const getOverdueBorrows = async (req, res, next) => {
  try {
    const borrows = await BorrowService.getOverdueBorrows();

    return res.status(200).json({
      success: true,
      count: borrows.length,
      borrows,
    });
  } catch (error) {
    return next(error);
  }
};

export {
  borrowBook,
  returnBook,
  getStudentBorrows,
  getAllBorrows,
  getOverdueBorrows,
};
