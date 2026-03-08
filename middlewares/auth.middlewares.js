import Joi from "joi";
import { loginSchema, signupSchema } from "../validators/index.js";

export const validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    const validationError = new Error(error.details[0].message);
    validationError.status = 400;
    validationError.type = "ValidationError";
    return next(validationError);
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    const validationError = new Error(error.details[0].message);
    validationError.status = 400;
    validationError.type = "ValidationError";
    return next(validationError);
  }
  next();
};
export const validateObjectId = (params) => (req, res, next) => {
  const { error } = 
    Joi.string().hex().length(24).validate(req.params[params]);
  if (error) { 
    const validationError = new Error(error.details[0].message);
    validationError.status = 400;
    validationError.type = "ValidationError";
    return next(validationError);
  }
  next();
};
