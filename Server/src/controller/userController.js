import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";

import AIService from "../services/aiService.js";
import APIService from "../services/apiService.js";
import { MESSAGE } from "../lang/en/messsage.js";

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
      const { firstName, lastName, email, password, role } = req.body;

      if (await this.emailExists(email)) {
        return res.status(400).json({
          success: false,
          message: MESSAGE.USER.EMAIL_EXISTS,
        });
      }

      const hashedPassword = await this.hashedPassword(password);

      const apiKey = this.apiService.generateApiKey();

      const user = new UserModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: role || "user",
        apiKey: apiKey,
      });

      await user.save();

      await this.apiService.apiRequestsTracker("/api/users/register");

      return res.status(201).json({
        success: true,
        message: MESSAGE.USER.REGISTER_SUCCESS,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: MESSAGE.ERROR.SERVER_ERROR,
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
          message: MESSAGE.USER.INVALID_CREDS,
        });
      }

      const isPasswordValid = await this.checkPassword(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: MESSAGE.USER.INVALID_CREDS,
        });
      }

      const token = this.authService.generateToken({
        id: user._id,
        role: user.role,
      });

      await user.save();

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      await this.apiService.apiRequestsTracker("/api/users/login");

      return res.status(200).json({
        success: true,
        message: MESSAGE.AUTH.LOGIN_SUCCESS,
        role: user.role,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: MESSAGE.ERROR.SERVER_ERROR + error.message,
      });
    }
  }

  async logout(req, res) {
    res.clearCookie("token");

    await this.apiService.apiRequestsTracker("/api/users/logout");

    return res.status(200).json({
      success: true,
      message: MESSAGE.AUTH.LOGOUT_SUCCESS,
    });
  }

  async getNumOfApiCallsLeft(req, res) {
    try {
      const userId = req.user.id;
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: MESSAGE.USER.NOT_FOUND,
        });
      }

      await this.apiService.apiRequestsTracker("/api/users/apicallsleft");

      return res.status(200).json({
        success: true,
        tokensLeft: user.numOfApiCallsLeft,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: MESSAGE.ERROR.SERVER_ERROR + error.message,
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
          message: MESSAGE.ERROR.USER_NOT_FOUND,
        });
      }

      await this.apiService.apiRequestsTracker("/api/users/getnewapikey");

      return res.status(200).json({
        success: true,
        newApiKey: newApiKey,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: MESSAGE.ERROR.SERVER_ERROR + error.message,
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
          message: MESSAGE.ERROR.USER_NOT_FOUND,
        });
      }

      await this.apiService.apiRequestsTracker("/api/users/getapikey");

      return res.status(200).json({
        success: true,
        apiKey: user.apiKey,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: MESSAGE.ERROR.SERVER_ERROR + error.message,
      });
    }
  }

  async talkWithAi(req, res) {
    try {
      const userId = req.user.id;
      const data = req.body;
      const encodedData = encodeURIComponent(data.data);

      const responseFromAi = await this.aiService.sendDataToAi(encodedData);

      const user = await this.apiService.decrementApiCallsNum(userId);

      if (user.numOfApiCallsLeft < 0) {
        return res.status(200).json({
          success: true,
          data: responseFromAi,
          message: MESSAGE.USER.API_CALL_EXCEEDED,
        });
      }

      await this.apiService.apiRequestsTracker("/api/users/sqlinjcheck");

      return res.status(200).json({
        success: true,
        data: responseFromAi,
        numOfApiCallsLeft: user.numOfApiCallsLeft,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: MESSAGE.ERROR.AI_SERVICE_ERROR + error.message,
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
