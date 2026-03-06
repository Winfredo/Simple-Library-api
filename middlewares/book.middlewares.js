import User from "../models/User.js";

 const checkIfLoggedIn = async (req, res, next) => {
  try {
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
     });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

 const checkIfLibrarian = (req, res, next) => {    
    if (req.user.role !== 'librarian') {
        return res.status(403).json({ 
            success: false, 
            message: 'Forbidden. Librarian access required.' 
        })
    }
    
    next()
}
export { checkIfLoggedIn, checkIfLibrarian }

