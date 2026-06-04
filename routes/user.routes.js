import express from "express";
const router = express.Router();
import { getAllUsers } from "../controllers/user.controller.js";
import { checkIfLoggedIn, checkIfLibrarian } from "../middlewares/index.js";

router.get("/", checkIfLoggedIn, checkIfLibrarian, getAllUsers);

export default router;