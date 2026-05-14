import mongoose from "mongoose";
import BookService from "../services/book.service.js";

const getAllBooks = async (req, res, next) => {
  try {
    const { search, status, page, limit } = req.query;

    const result = await BookService.getAllBooks({ search, status, page, limit });

    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: result.books,
      pagination: result.pagination
    });
  } catch (error) {
    return next(error);
  }
};

const createBook = async (req, res, next) => {
  try {
    const payload = req.body;
    const book = await BookService.createBook(payload);

    if (!book) {
      const error = new Error("Book creation failed. Book may already exist.");
      error.status = 400;
      return next(error);
    }
    res.status(201).json(book);
  } catch (error) {
    return next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid book ID");
      error.status = 400;
      return next(error);
    }
    const book = await BookService.getBookById(id);
    if (!book) {
      const error = new Error("Book not found");
      error.status = 404;
      return next(error);
    }
    res.json(book);
  } catch (error) {
    return next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const book = await BookService.updateBook(id, updateData);
    if (!book) {
      const error = new Error("Book not found");
      error.status = 404;
      return next(error);
    }
    res.json(book);
  } catch (error) {
    return next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await BookService.deleteBook(id);
    if (!book) {
      const error = new Error("Book not found");
      error.status = 404;
      return next(error);
    }
    res.json({ message: "Book deleted successfully", book });
  } catch (error) {
    return next(error);
  }
};

export { getAllBooks, createBook, getBookById, updateBook, deleteBook };
