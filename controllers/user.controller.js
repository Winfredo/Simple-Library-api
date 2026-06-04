import Person from "../models/User.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await Person.find({ role: "student" }).select("-password");
    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    return next(error);
  }
};