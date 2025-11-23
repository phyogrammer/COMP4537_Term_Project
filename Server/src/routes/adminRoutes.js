import express from "express";
import dotenv from "dotenv";
import AdminController from "../controller/adminController.js";
import AuthService from "../services/authService.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export default class AdminRoutes {
  constructor() {
    this.router = express.Router();

    this.controller = new AdminController();
    this.authService = new AuthService(JWT_SECRET);
    this.authMiddleware = new AuthMiddleware(this.authService);

    this.init();
  }

  init() {
    this.usersInfoRoute();
    this.removeUserRoute();
    this.apiStatsRoute();
  }

  usersInfoRoute() {
    this.router.get(
      "/getusersinfo",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      this.authMiddleware.authorize(["admin"]).bind(this.authMiddleware),
      this.controller.getUsersInfo.bind(this.controller)
    );
  }

  removeUserRoute() {
    this.router.delete(
      "/delete/:id",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      this.authMiddleware.authorize(["admin"]).bind(this.authMiddleware),
      this.controller.removeUser.bind(this.controller)
    );
  }

  apiStatsRoute() {
    this.router.get(
      "/getapistats",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      this.authMiddleware.authorize(["admin"]).bind(this.authMiddleware),
      this.controller.getApiStats.bind(this.controller)
    );
  }

  getRouter() {
    return this.router;
  }
}
