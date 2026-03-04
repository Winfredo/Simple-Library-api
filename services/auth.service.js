import Person from '../models/User.js';

class AuthService {
      static async  isUserExisting(email)  {
        const user = await Person.findOne({ email })
        return !!user
    }
    static async login({username, password}) {

        const user = await Person.findOne({ username }).select("name email age password")
        if(!user || user.password !== password){
            return null
        }
        return user
    }

    static async signup({username, email, password}) {
        const isExisting = await this.isUserExisting(email)
        if(isExisting){
            return null
        }
        const user = await Person.create({username, email, password})
        return user
    }

    static async userDelete(id){
        const user = await Person.findByIdAndDelete(id)
        return user
    }
}



export default AuthService;