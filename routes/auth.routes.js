import express from "express";
const router = express.Router();
import {validateSignup, validateLogin} from '../middlewares/index.js'
import {userSignup, userLogin,userDelete} from '../controllers/index.js'

router.post('/register', validateSignup, userSignup)
router.post('/login', validateLogin, userLogin)
router.delete('/:id', userDelete)

export default router;