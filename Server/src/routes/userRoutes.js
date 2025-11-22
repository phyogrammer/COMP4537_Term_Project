import express from "express";
import dotenv from "dotenv";
import UserController from "../controller/userController.js";
import AuthService from "../services/authService.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const AI_ENDPOINT = process.env.AI_ENDPOINT;
export default class UserRoutes {
  constructor() {
    this.router = express.Router();

    this.authService = new AuthService(JWT_SECRET);
    this.authMiddleware = new AuthMiddleware(this.authService);
    this.controller = new UserController(this.authService, AI_ENDPOINT);

    this.init();
  }

  init() {
    this.registerRoutes();
    this.loginRoutes();
    this.addUserRoutes();
    this.removeUserRoutes();
    this.getNumberOfTokensLeftRoutes();
    this.logoutRoutes();
    this.talkWithAi();

    // wip
    this.getApiKey();
    this.generateNewApiKey();
  }

  loginRoutes() {
    this.router.post("/login", this.controller.login.bind(this.controller));
  }

  registerRoutes() {
    this.router.post(
      "/register",
      this.controller.register.bind(this.controller)
    );
  }

  logoutRoutes() {
    this.router.post(
      "/logout",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      this.controller.logout.bind(this.controller)
    );
  }

  addUserRoutes() {
    this.router.get(
      "/admin/users-info",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      this.authMiddleware.authorize(["admin"]).bind(this.authMiddleware),
      this.controller.getAllUsers.bind(this.controller)
    );
  }

  removeUserRoutes() {
    this.router.delete(
      "/admin/delete/:id",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      this.authMiddleware.authorize(["admin"]).bind(this.authMiddleware),
      this.controller.removeUser.bind(this.controller)
    );
  }

  getNumberOfTokensLeftRoutes() {
    this.router.get(
      "/api-calls-left",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      this.controller.getNumOfApiCallsLeft.bind(this.controller)
    );
  }

  generateNewApiKey() {
    this.router.get(
      "/getnewapikey",
      this.authMiddleware.authenticate.bind(this.controller),
      this.controller.generateNewApiKey.bind(this.controller)
    );
  }

  getApiKey() {
    this.router.get(
      "/getapikey",
      this.authMiddleware.authenticate.bind(this.controller),
      this.controller.getApiKey.bind(this.controller)
    );
  }

  talkWithAi() {
    this.router.post(
      "/sqlinjcheck",
      this.authMiddleware.authenticate.bind(this.controller),
      this.authMiddleware.authenticateApiKey.bind(this.controller),
      this.controller.talkWithAi.bind(this.controller)
    );
  }

  getRouter() {
    return this.router;
  }
}
