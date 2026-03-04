import express from 'express';
import dotenv from 'dotenv';

const app = express();
const PORT = 3000;

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