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

  /**
   * @swagger
   * /api/admin/getusersinfo:
   *   get:
   *     tags: [Admin]
   *     summary: Get all users information
   *     description: Retrieve a list of all registered users with their API consumption statistics. Admin access required.
   *     security:
   *       - cookieAuth: []
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Successfully retrieved users information
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/User'
   *             example:
   *               success: true
   *               data:
   *                 - _id: "507f1f77bcf86cd799439011"
   *                   firstName: "John"
   *                   lastName: "Doe"
   *                   email: "john@example.com"
   *                   role: "user"
   *                   numOfApiCallsLeft: 15
   *                   apiKey: "abc123def456ghi789jkl012mno345"
   *                 - _id: "507f1f77bcf86cd799439012"
   *                   firstName: "Admin"
   *                   lastName: "User"
   *                   email: "admin@admin.com"
   *                   role: "admin"
   *                   numOfApiCallsLeft: 20
   *                   apiKey: "xyz789uvw456rst123opq987lmn654"
   *       401:
   *         description: Unauthorized - No token provided
   *       403:
   *         description: Forbidden - User does not have admin privileges
   *       404:
   *         description: No users found
   *       500:
   *         description: Server error
   */
  usersInfoRoute() {
    this.router.get(
      "/getusersinfo",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      this.authMiddleware.authorize(["admin"]).bind(this.authMiddleware),
      this.controller.getUsersInfo.bind(this.controller)
    );
  }

  /**
   * @swagger
   * /api/admin/delete/{email}:
   *   delete:
   *     tags: [Admin]
   *     summary: Remove a user
   *     description: Delete a user account by email address. Admin access required.
   *     security:
   *       - cookieAuth: []
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: email
   *         required: true
   *         schema:
   *           type: string
   *           format: email
   *         description: Email address of the user to remove
   *         example: john@example.com
   *     responses:
   *       200:
   *         description: User removed successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: User removed successfully
   *       401:
   *         description: Unauthorized - No token provided
   *       403:
   *         description: Forbidden - User does not have admin privileges
   *       500:
   *         description: Server error
   */
  removeUserRoute() {
    this.router.delete(
      "/delete/:email",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      this.authMiddleware.authorize(["admin"]).bind(this.authMiddleware),
      this.controller.removeUser.bind(this.controller)
    );
  }

  /**
   * @swagger
   * /api/admin/getapistats:
   *   get:
   *     tags: [Admin]
   *     summary: Get API statistics
   *     description: Retrieve statistics for all API endpoints including request counts. Admin access required.
   *     security:
   *       - cookieAuth: []
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Successfully retrieved API statistics
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/ApiStats'
   *             example:
   *               success: true
   *               data:
   *                 - _id: "507f1f77bcf86cd799439013"
   *                   method: "POST"
   *                   endpoint: "/api/users/register"
   *                   requests: 45
   *                 - _id: "507f1f77bcf86cd799439014"
   *                   method: "POST"
   *                   endpoint: "/api/users/login"
   *                   requests: 123
   *                 - _id: "507f1f77bcf86cd799439015"
   *                   method: "GET"
   *                   endpoint: "/api/users/apicallsleft"
   *                   requests: 67
   *                 - _id: "507f1f77bcf86cd799439016"
   *                   method: "POST"
   *                   endpoint: "/api/users/sqlinjcheck"
   *                   requests: 234
   *       401:
   *         description: Unauthorized - No token provided
   *       403:
   *         description: Forbidden - User does not have admin privileges
   *       404:
   *         description: Cannot find endpoints
   *       500:
   *         description: Server error
   */
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