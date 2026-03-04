import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

const app = express();
const PORT = 3000;
dotenv.config({ quiet: true })

await connectDB();

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