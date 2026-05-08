import Person from "../models/User.js";
import {
  CompareBcryptPassword,
  GenerateBcryptPassword,
} from "../utils/auth.js";

class AuthService {
  static async isUserExisting(email) {
    const user = await Person.findOne({ email });
    return !!user;
  }
  static async login({ username, password }) {
    const user = await Person.findOne({ username }).select(
      "name email age password lastLogin role",
    );
    if (!user) {
      return null;
    }

    // Compare provided password with stored hashed password
    const isPasswordValid = await CompareBcryptPassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }

  static async signup({ username, email, password, role }) {
    const isExisting = await this.isUserExisting(email);
    if (isExisting) {
      return null;
    }
    const hassedPassword = await GenerateBcryptPassword(password);
    const user = await Person.create({
      username,
      email,
      password: hassedPassword,
      role,
    });
    return user;
  }

  static async userDelete(id) {
    const user = await Person.findByIdAndDelete(id);
    return user;
  }
}

export default AuthService;
