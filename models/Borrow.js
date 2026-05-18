// import mongoose from "mongoose";

// const BorrowSchema = new mongoose.Schema({
//     student: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     book: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Book',
//         required: true
//     },
//     borrowedAt: {
//         type: Date,
//         default: Date.now
//     },
//     dueDate: {
//         type: Date,
//         required: true
//     },
//     returnedAt: {
//         type: Date,
//         default: null
//     },
//     status: {
//         type: String,
//         enum: ['active', 'returned', 'overdue'],
//         default: 'active'
//     }
// })

// const Borrow = mongoose.model('Borrow', BorrowSchema);
// export default Borrow;


import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    borrowedAt: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    returnedAt: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'returned', 'overdue'],
        default: 'active'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

borrowSchema.virtual('borrowId').get(function() {
    return this._id;
});

const Borrow = mongoose.model('Borrow', borrowSchema);
export default Borrow;