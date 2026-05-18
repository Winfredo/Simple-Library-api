import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import connectDB from './config/db.js';
import {AuthRoutes} from './routes/index.js';
import {BookRoutes} from './routes/index.js';
import ErrorHandler from './middlewares/ErrorHandler.js';
import { limiter } from "./middlewares/rateLimiter.js";
import { BorrowRoutes } from './routes/index.js';

const app = express();
const PORT = 3000;
dotenv.config({ quiet: true })

app.use(express.json());
app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(mongoSanitize());
await connectDB();

app.use('/auth', AuthRoutes);
app.use('/books', BookRoutes);
app.use('/borrow', BorrowRoutes);

app.get("/", (req, res) => {
    return res.json({ 
        title: 'Welcome to Express.js API',
        message: 'This is a simple Express.js API with authentication and user management.',
        author: 'Winfred Nukpezah',
        version: '1.0.0'
    
     })
})

app.use(ErrorHandler)
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})