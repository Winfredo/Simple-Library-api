import BookService from '../services/book.service.js'

const getAllBooks = async(req,res) => {
    try {
        const books = await BookService.getAllBooks();
        if(books.length === 0){
            const error = new Error('No book found')
            error.status = 404
            return next(error)
        }
        res.json(books);
    } catch (error) {
        return next(error)
    }
}

const createBook = async(req,res) => {
    try {
        const payload = req.body;
        const book = await BookService.createBook(payload);

        if (!book){
            const error = new Error('Book creation failed')
            error.status = 400
            return next(error)
        }
        res.status(201).json(book);
    } catch (error) {
        return next(error)
    }

}

const getBookById = async(req,res) => {
    try {
        const {id} = req.params;
        const book = await BookService.getBookById(id);
        if(!book){
            const error = new Error('Book not found')
            error.status = 404
            return next(error)
        }
        res.json(book);
    } catch (error) {
        return next(error)
    }
}

const updateBook = async(req,res) => {
    try{
        const {id} = req.params;
        const updateData = req.body;
        const book = await BookService.updateBook(id, updateData);
        if(!book){
            const error = new Error('Book not found')
            error.status = 404
            return next(error)
        }
        res.json(book);
    } catch (error) {
        return next(error)
    }
}

const deleteBook = async(req,res) => {
    try {
        const {id} = req.params;
        const book = await BookService.deleteBook(id);
        if(!book){
            const error = new Error('Book not found')
            error.status = 404
            return next(error)
        }
        res.json({ message: 'Book deleted successfully', book });
    } catch (error) {
        return next(error)
    }
}

export { getAllBooks, createBook, getBookById, updateBook, deleteBook }