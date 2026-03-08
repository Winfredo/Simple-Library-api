import AuthService from '../services/auth.service.js'

const userSignup = async (req,res) => {
    try {
        const payload = req.body;
        const user = await AuthService.signup(payload)
        if(user){
            const error = new Error('User already exists')
           error.status = 409
           return next(error) 
        }
        res.json({ success: true, message: 'Signup successful', user })
    } catch (error) {
        return next(error)
    }
}

const userLogin = async (req, res) => {
    try {
        const payload = req.body;
        const user = await AuthService.login(payload)

        if(!user){
            const error = new Error('Invalid username or password')
            error.status = 401
            return next(error)
        }
        res.json({ success: true, message: 'Login successful', user })
    } catch (error) {
        return next(error)
    }
}

const userDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await AuthService.userDelete(id)
        if(!user){
            const error = new Error('User not found')
            error.status = 404
            return next(error)
        }
        res.json({ success: true, message: 'User deleted successfully', user })
    } catch (error) {
        return next(error)
    }
}

export  { userSignup, userLogin,userDelete }