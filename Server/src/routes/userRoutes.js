import express from "express";
import UserController from "../controller/userController.js";

export default class UserRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new UserController();

    this.init();
  }

  init() {
    this.registerRoutes();
    this.loginRoutes();
  }

  loginRoutes() {
    this.router.post(
      "/login",
      this.controller.login.bind(this.controller)
    );
  }

  registerRoutes() {
    this.router.post(
      "/register",
      this.controller.register.bind(this.controller)
    );
  }

  getRouter() {
    return this.router;
  }
}
