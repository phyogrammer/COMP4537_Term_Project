import UserModel from "../models/userModel.js";
import ApiStats from "../models/apiModel.js";
import APIService from "../services/apiService.js";
import { MESSAGE } from "../lang/en/messsage.js";

export default class AdminController {
  constructor() {
    this.apiService = new APIService();
  }

  async getApiStats(req, res) {
    try {
      const apiEndpoints = await ApiStats.find({});

      if (!apiEndpoints) {
        return res.status(404).json({
          success: false,
          message: MESSAGE.ADMIN.INVALID_ENDPOINT,
        });
      }

      await this.apiService.apiRequestsTracker("/api/admin/getapistats");

      return res.status(200).json({
        success: true,
        data: apiEndpoints,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: MESSAGE.ERROR.SERVER_ERROR + error.message,
      });
    }
  }

  async getUsersInfo(req, res) {
    try {
      const users = await UserModel.find({});

      if (!users) {
        return res.status(404).json({
          success: false,
          message: MESSAGE.ERROR.USER_NOT_FOUND,
        });
      }

      await this.apiService.apiRequestsTracker("/api/admin/getusersinfo");

      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: MESSAGE.ERROR.SERVER_ERROR + error.message,
      });
    }
  }

  async removeUser(req, res) {
    try {
      const userEmail = req.params.email;

      await UserModel.deleteOne({ email: userEmail });

      await this.apiService.apiRequestsTracker("/api/admin/delete/:email");

      return res.status(200).json({
        success: true,
        message: MESSAGE.ADMIN.USER_REMOVE_SUCCESS,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: MESSAGE.ERROR.SERVER_ERROR + error.message,
      });
    }
  }
}
