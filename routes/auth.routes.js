import express from "express";
const router = express.Router();
import {validateSignup, validateLogin, validateObjectId} from '../middlewares/index.js'
import {userSignup, userLogin,userDelete} from '../controllers/index.js'

router.post('/register', validateSignup, userSignup)
router.post('/login', validateLogin, userLogin)
router.delete('/:id', validateObjectId('id'), userDelete)

export default router;