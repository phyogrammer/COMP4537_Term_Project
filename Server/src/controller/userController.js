import UserModel from "../models/userModel.js";
import bcrypt, { hash } from "bcrypt";

const SALT_ROUND = 12;

export default class UserController {
  async register(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;

      if (await this.emailExists(email)) {
        return res.status(400).json({
          success: false,
          message: "Email already registered.",
        });
      }

      const hashedPassword = await this.hashedPassword(password);

      const user = new UserModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      await user.save();

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    } catch (error) {
      console.error("Registeration error: ", error.message);
      return res.status(500).json({
        success: false,
        message: "An error occurred during registeration.",
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await this.findUserByEmail(email);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const isPasswordValid = await this.checkPassword(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Login successful",
      });
    } catch (error) {
      console.error("Login error: ", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred during login.",
      });
    }
  }

  async hashedPassword(password) {
    const salt = await bcrypt.genSalt(SALT_ROUND);
    return await bcrypt.hash(password, salt);
  }

  async emailExists(email) {
    const user = await UserModel.findOne({ email });
    return !!user; 
  }

  async findUserByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async checkPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
