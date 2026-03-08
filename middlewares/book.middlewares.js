import User from "../models/User.js";

 const checkIfLoggedIn = async (req, res, next) => {
  try {
    const userId = req.headers["x-user-id"];

    if (!userId) {
        const error = new Error('Unauthorized')
        error.status = 401
        return next(error)
    }

    const user = await User.findById(userId);

    if (!user) {
        const error = new Error('Unauthorized')
        error.status = 401
        return next(error)
    }

    req.user = user;

    next();
  } catch (error) {
    next(error)
  }
};

 const checkIfLibrarian = (req, res, next) => {    
    if (req.user.role !== 'librarian') {
            const error = new Error('Forbidden')
            error.status = 403
            return next(error)
    }
    
    next()
}
export { checkIfLoggedIn, checkIfLibrarian }

