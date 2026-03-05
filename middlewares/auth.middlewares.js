import Joi from "joi";
import { loginSchema, signupSchema } from "../validators/index.js";

export const validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
      message: "Signup validation failed",
      success: false,
    });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({
        error: error.details[0].message,
        success: false,
        message: "Login validation failed",
      });
  }
  next();
};
export const validateObjectId = (params) => (req, res, next) => {
  const { error } = 
    Joi.string().hex().length(24).validate(req.params[params]);
  if (error) {
    return res
      .status(400)
      .json({
        error: error.details[0].message,
        success: false,
        message: "Invalid ID format",
      });
  }
  next();
};
