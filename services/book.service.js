import Book from "../models/Book.js";

class BookService {
 static async getAllBooks({ search, status, page, limit }) {
    const query = {};

    // search by title, author or genre
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { genre: { $regex: search, $options: "i" } },
      ];
    }

    // filter by status
    if (status) {
      query.status = status;
    }

    // pagination
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const totalBooks = await Book.countDocuments(query);
    const totalPages = Math.ceil(totalBooks / pageSize);

    const books = await Book.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return {
      books,
      pagination: {
        totalBooks,
        totalPages,
        currentPage: pageNumber,
        pageSize,
      }
    };
  }

  static async createBook({ title, author, genre, publishedYear }) {
    const existingBook = await Book.findOne({
      title: title,
      author: author,
      publishedYear: publishedYear,
    });

    if (existingBook) {
      return null;
    }
    const book = await Book.create({
      title,
      author,
      genre,
      publishedYear,
    });

    return book;
  }

  static async getBookById(id) {
    const book = await Book.findById(id);
    if (!book) {
      return null;
    }
    return book;
  }

  static async updateBook(bookId, updateData) {
    const book = await Book.findByIdAndUpdate(bookId, updateData, {
      new: true,
    });
    return book;
  }

  static async deleteBook(id) {
    const book = await Book.findByIdAndDelete(id);
    return book;
  }
}

export default BookService;
