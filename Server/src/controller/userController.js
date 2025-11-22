import UserModel from "../models/userModel.js";
import bcrypt, { hash } from "bcrypt";

import AIService from "../services/aiService.js";
import APIService from "../services/apiService.js";

const SALT_ROUND = 12;

export default class UserController {
  constructor(authService, aiEndpoint) {
    this.authService = authService;
    this.aiEndpoint = aiEndpoint;

    this.aiService = new AIService(aiEndpoint);
    this.apiService = new APIService();
  }

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

      // Generate API key for the new user (Required for accessing AI services)
      const apiKey = this.apiService.generateApiKey();

      const user = new UserModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        apiKey: apiKey,
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

      // Generate JWT token for the user upon successful login
      const token = this.authService.generateToken({
        id: user._id,
        role: user.role,
      });

      // Save the token to the user model
      user.token = token;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Login successful",
        role: user.role,
        token: token,
      });
    } catch (error) {
      console.error("Login error: ", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred during login.",
      });
    }
  }

  async logout(req, res) {
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  }

  // Get all users (Admin only)
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.find({});

      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while retrieving users.",
      });
    }
  }

  // Remove a user (Admin only)
  async removeUser(req, res) {
    try {
      const userId = req.params.id;
      await UserModel.deleteOne({ _id: userId });

      return res.status(200).json({
        success: true,
        message: "User removed successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while removing user.",
      });
    }
  }

  async getNumOfApiCallsLeft(req, res) {
    try {
      const userId = req.user.id;
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        tokensLeft: user.numOfApiCallsLeft,
      });
    } catch (error) {
      console.error("Get tokens left error: ", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while retrieving token count.",
      });
    }
  }

  async generateNewApiKey(req, res) {
    try {
      const userId = req.user.id;
      const newApiKey = this.apiService.generateApiKey();

      const user = await UserModel.findByIdAndUpdate(userId, {
        apiKey: newApiKey,
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        newApiKey: newApiKey,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error generating a new api key",
      });
    }
  }

  async getApiKey(req, res) {
    try {
      const userId = req.user.id;
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        apiKey: user.apiKey,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Main AI interaction endpoint
  // Communite with AI service and decrement user's API calls
  async talkWithAi(req, res) {
    try {
      const userId = req.user.id;
      const data = req.body;
      const encodedData = encodeURIComponent(data.data);

      const responseFromAi = await this.aiService.sendDataToAi(encodedData);

      const user = await this.apiService.decrementApiCallsNum(userId);

      // If user has exhausted their API calls (20),
      // still allow interaction but notify them
      if (user.numOfApiCallsLeft < 0) {
        return res.status(200).json({
          success: true,
          data: responseFromAi,
          message: "No API calls left, but you can still use the service.",
        });
      }

      return res.status(200).json({
        success: true,
        data: responseFromAi,
        numOfApiCallsLeft: user.numOfApiCallsLeft,
      });
    } catch (error) {
      console.error("Error talking with AI: ", error);
      return res.status(500).json({
        success: false,
        message: `${error}`,
      });
    }
  }

  /* Helper methods */
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
