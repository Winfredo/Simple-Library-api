import express from "express";
const router = express.Router();
import {validateSignup, validateLogin, validateObjectId} from '../middlewares/index.js'
import {userSignup, userLogin,userDelete} from '../controllers/index.js'
import rateLimit from "express-rate-limit";


const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { error: "Too many attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/register', authLimiter, validateSignup, userSignup)
router.post('/login', authLimiter, validateLogin, userLogin)
router.delete('/:id', validateObjectId('id'), userDelete)

export default router; 