import express from 'express';
const router = express.Router();
import { checkIfLoggedIn, checkIfLibrarian } from '../middlewares/index.js';
import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from '../controllers/index.js';

router.get('/', checkIfLoggedIn, getAllBooks);
router.post('/new',checkIfLoggedIn, checkIfLibrarian, createBook)
router.get('/:id',checkIfLoggedIn, getBookById)
router.put('/:id',checkIfLoggedIn, checkIfLibrarian,updateBook)
router.delete('/:id',checkIfLoggedIn, checkIfLibrarian, deleteBook)

export default router;