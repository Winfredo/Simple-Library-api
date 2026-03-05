import Book from "../models/Book.js";

class BookService {
  static async getAllBooks() {
    const books = await Book.find();
    return books;
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
    const book = await Book.findByIdAndUpdate(
        bookId,
        updateData,
        { new: true }
    );
    return book;
}

  static async deleteBook(id) {
    const book = await Book.findByIdAndDelete(id);
    return book;
  }
}

export default BookService;
