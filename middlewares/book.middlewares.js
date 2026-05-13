import User from "../models/User.js";
import { VerifyAuthToken } from "../utils/auth.js";

const checkIfLoggedIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Unauthorized");
      error.status = 401;
      return next(error);
    }

    const token = authHeader.split(" ")[1];

    // verify token;
    const payload = VerifyAuthToken(token);
    if (!payload) {
      const error = new Error("Unauthorized");
      error.status = 401;
      return next(error);
    }

    req.user = {
      id: payload.userId,
      role: payload.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const checkIfStudent = (req, res, next) => {
  if (req.user.role !== "student") {
    const error = new Error("Forbidden");
    error.status = 403;
    return next(error);
  }
  next();
};

const checkIfLibrarian = (req, res, next) => {
  if (req.user.role !== "librarian") {
    const error = new Error("Forbidden");
    error.status = 403;
    return next(error);
  }

  next();
};
export { checkIfLoggedIn, checkIfLibrarian, checkIfStudent };
