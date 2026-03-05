import BookService from '../services/book.service.js'

const getAllBooks = async(req,res) => {
    try {
        const books = await BookService.getAllBooks();
        if(books.length === 0){
            return res.status(404).json({ message: 'No book found' })
        }
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createBook = async(req,res) => {
    try {
        const payload = req.body;
        const book = await BookService.createBook(payload);

        if (!book){
            return res.status(400).json({ message: 'Book creation failed' })
        }
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const getBookById = async(req,res) => {
    try {
        const {id} = req.params;
        const book = await BookService.getBookById(id);
        if(!book){
            return res.status(404).json({ message: 'Book not found' })
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateBook = async(req,res) => {
    try{
        const {id} = req.params;
        const updateData = req.body;
        const book = await BookService.updateBook(id, updateData);
        if(!book){
            return res.status(404).json({ message: 'Book not found' })
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteBook = async(req,res) => {
    try {
        const {id} = req.params;
        const book = await BookService.deleteBook(id);
        if(!book){
            return res.status(404).json({ message: 'Book not found' })
        }
        res.json({ message: 'Book deleted successfully', book });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getAllBooks, createBook, getBookById, updateBook, deleteBook }