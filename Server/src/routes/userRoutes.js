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
    this.getNumberOfTokensLeftRoutes();
    this.logoutRoutes();
    this.talkWithAi();
    this.getApiKey();
    this.generateNewApiKey();
  }

  /**
   * @swagger
   * /api/users/register:
   *   post:
   *     tags: [Authentication]
   *     summary: Register a new user
   *     description: Create a new user account with email and password. User receives 20 free API calls.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - firstName
   *               - lastName
   *               - email
   *               - password
   *             properties:
   *               firstName:
   *                 type: string
   *                 example: John
   *               lastName:
   *                 type: string
   *                 example: Doe
   *               email:
   *                 type: string
   *                 format: email
   *                 example: john@example.com
   *               password:
   *                 type: string
   *                 format: password
   *                 example: securePassword123
   *               role:
   *                 type: string
   *                 enum: [user, admin]
   *                 default: user
   *                 example: user
   *     responses:
   *       201:
   *         description: User registered successfully
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
   *                   example: User registered successfully
   *       400:
   *         description: Email already exists
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  registerRoutes() {
    this.router.post("/register", this.controller.register.bind(this.controller));
  }

  /**
   * @swagger
   * /api/users/login:
   *   post:
   *     tags: [Authentication]
   *     summary: User login
   *     description: Authenticate user and receive JWT token in httpOnly cookie
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *                 example: john@example.com
   *               password:
   *                 type: string
   *                 format: password
   *                 example: securePassword123
   *     responses:
   *       200:
   *         description: Login successful
   *         headers:
   *           Set-Cookie:
   *             schema:
   *               type: string
   *               example: token=abcde12345; Path=/; HttpOnly; Secure; SameSite=None
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
   *                   example: Login successful
   *                 role:
   *                   type: string
   *                   example: user
   *       401:
   *         description: Invalid credentials
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   */
  loginRoutes() {
    this.router.post("/login", this.controller.login.bind(this.controller));
  }

  /**
   * @swagger
   * /api/users/logout:
   *   post:
   *     tags: [Authentication]
   *     summary: User logout
   *     description: Clear authentication token and logout user
   *     security:
   *       - cookieAuth: []
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Logout successful
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
   *                   example: Logout successful
   *       401:
   *         description: Unauthorized - No token provided
   */
  logoutRoutes() {
    this.router.post(
      "/logout",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      this.controller.logout.bind(this.controller)
    );
  }

  /**
   * @swagger
   * /api/users/apicallsleft:
   *   get:
   *     tags: [Users]
   *     summary: Get remaining API calls
   *     description: Retrieve the number of free API calls remaining for the authenticated user
   *     security:
   *       - cookieAuth: []
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Successfully retrieved API calls count
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 numOfApiCallsLeft:
   *                   type: number
   *                   example: 15
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: User not found
   */
  getNumberOfTokensLeftRoutes() {
    this.router.get(
      "/apicallsleft",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      this.controller.getNumOfApiCallsLeft.bind(this.controller)
    );
  }

  /**
   * @swagger
   * /api/users/getnewapikey:
   *   put:
   *     tags: [Users]
   *     summary: Generate new API key
   *     description: Generate and return a new API key for the authenticated user
   *     security:
   *       - cookieAuth: []
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: New API key generated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 newApiKey:
   *                   type: string
   *                   example: abc123def456ghi789jkl012mno345
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: User not found
   */
  generateNewApiKey() {
    this.router.put(
      "/getnewapikey",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      this.controller.generateNewApiKey.bind(this.controller)
    );
  }

  /**
   * @swagger
   * /api/users/getapikey:
   *   get:
   *     tags: [Users]
   *     summary: Get current API key
   *     description: Retrieve the current API key for the authenticated user
   *     security:
   *       - cookieAuth: []
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: API key retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 apiKey:
   *                   type: string
   *                   example: abc123def456ghi789jkl012mno345
   *       400:
   *         description: User not found
   *       401:
   *         description: Unauthorized
   */
  getApiKey() {
    this.router.get(
      "/getapikey",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      this.controller.getApiKey.bind(this.controller)
    );
  }

  /**
   * @swagger
   * /api/users/sqlinjcheck:
   *   post:
   *     tags: [AI Services]
   *     summary: Check for SQL injection
   *     description: Use AI/ML model to analyze input text for potential SQL injection attempts. Requires both JWT authentication and API key. Decrements user's API call count.
   *     security:
   *       - cookieAuth: []
   *         apiKeyAuth: []
   *       - bearerAuth: []
   *         apiKeyAuth: []
   *     parameters:
   *       - in: header
   *         name: api-key
   *         required: true
   *         schema:
   *           type: string
   *         description: User's API key for additional authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - data
   *             properties:
   *               data:
   *                 type: string
   *                 example: "SELECT * FROM users WHERE id = 1"
   *                 description: Input text to check for SQL injection
   *     responses:
   *       200:
   *         description: Analysis completed successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   type: object
   *                   description: AI model response with analysis results
   *                 numOfApiCallsLeft:
   *                   type: number
   *                   example: 14
   *                 message:
   *                   type: string
   *                   example: API call limit exceeded
   *                   description: Warning message if free API calls exceeded (service continues)
   *       401:
   *         description: Unauthorized - Invalid or missing token/API key
   *       403:
   *         description: Forbidden - Invalid API key
   *       500:
   *         description: AI service error
   */
  talkWithAi() {
    this.router.post(
      "/sqlinjcheck",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      this.authMiddleware.authenticateApiKey.bind(this.authMiddleware),
      this.controller.talkWithAi.bind(this.controller)
    );
  }

  getRouter() {
    return this.router;
  }
}