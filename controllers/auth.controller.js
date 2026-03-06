import AuthService from '../services/auth.service.js'

const userSignup = async (req,res) => {
    try {
        const payload = req.body;
        const user = await AuthService.signup(payload)
        if(user){
            return res.status(409).json({ success: false, message: 'User already exists' })
        }
        res.json({ success: true, message: 'Signup successful', user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const userLogin = async (req, res) => {
    try {
        const payload = req.body;
        const user = await AuthService.login(payload)

        if(!user){
            return res.status(400).json({ success: false, message: 'Invalid username or password' })
        }
        res.json({ success: true, message: 'Login successful', user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const userDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await AuthService.userDelete(id)
        if(!user){
            return res.status(404).json({ success: false, message: 'User not found' })
        }
        res.json({ success: true, message: 'User deleted successfully', user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export  { userSignup, userLogin,userDelete }