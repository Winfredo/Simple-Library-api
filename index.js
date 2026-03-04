import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import {AuthRoutes} from './routes/index.js';

const app = express();
const PORT = 3000;
dotenv.config({ quiet: true })

app.use(express.json());

await connectDB();

app.use('/auth', AuthRoutes);

app.get("/", (req, res) => {
    return res.json({ 
        title: 'Welcome to Express.js API',
        message: 'This is a simple Express.js API with authentication and user management.',
        author: 'Winfred Nukpezah',
        version: '1.0.0'
    
     })
})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})