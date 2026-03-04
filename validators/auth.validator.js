import joi from 'joi'; 

export const signupSchema = joi.object({
    username: joi.string().min(3).max(30).required().messages({
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username must be at most 30 characters long',
        'string.empty': 'Username is required',
    }),
    email: joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address',
        'string.empty': 'Email is required',
    }),
    password: joi.string().min(6).required().regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{7,})/).messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter and one special character',
        'string.empty': 'Password is required',
    })
});

export const loginSchema = joi.object({
    username: joi.string().min(3).max(30).required().messages({
        'string.empty': 'Username is required',
    }),
    password: joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
    })
});