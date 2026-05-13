import Borrow from "../models/Borrow.js";
import Book from "../models/Book.js";

class BorrowService {
  static async borrowBook(studentId, bookId) {
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }

    if (book.status === "borrowed") {
      throw new Error("Book is currently unavailable");
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);
    
    
    const borrowRecord = await Borrow.create({
        student: studentId,
        book: bookId,
        dueDate: dueDate
    })
    
    await Book.findByIdAndUpdate(bookId, { status: "borrowed" }, { new: true });

    return borrowRecord;
  }


    static async returnBook(borrowId, studentId) {
    // find the borrow record
    const borrow = await Borrow.findById(borrowId);
    if (!borrow) throw new Error("Borrow record not found");

    if (borrow.student.toString() !== studentId.toString()) {
      throw new Error("Unauthorized - this is not your borrowed book");
    }

    if (borrow.status === "returned") {
      throw new Error("Book has already been returned");
    }
    borrow.returnedAt = new Date();
    borrow.status = "returned";
    await borrow.save();

    await Book.findByIdAndUpdate(borrow.book, { status: "available" });

    return borrow;
  }

static async getStudentBorrows(studentId) {
    const borrows = await Borrow.find({ student: studentId })
      .populate("book", "title author genre")
      .sort({ borrowedAt: -1 });

    return borrows;
  }

  static async getAllBorrows() {
    const borrows = await Borrow.find()
      .populate("book", "title author genre")
      .populate("student", "username email")
      .sort({ borrowedAt: -1 });

    return borrows;
  }

   static async getOverdueBorrows() {
    const now = new Date();

    await Borrow.updateMany(
      { status: "active", dueDate: { $lt: now } },
      { status: "overdue" }
    );

    const overdue = await Borrow.find({ status: "overdue" })
      .populate("book", "title author genre")
      .populate("student", "username email")
      .sort({ dueDate: 1 });

    return overdue;
  }

}

export default BorrowService;
