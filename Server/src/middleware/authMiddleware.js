import UserModel from "../models/userModel.js";

class AuthMiddleware {
  constructor(authService) {
    this.authService = authService;
  }

  // Middleware to authenticate JWT token
  // Verifies the token and attaches the decoded user info to req.user
  authenticate(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = this.authService.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  // Middleware to authenticate API key
  // Checks if the API key provided in the request matches the user's stored API key
  // Assumes that the user is already authenticated and user ID is available in req.user.id
  async authenticateApiKey(req, res, next) {
    const apiKey = req?.headers?.["api-key"] || req?.query?.apiKey;

    const userId = req.user.id;
    const user = await UserModel.findById(userId);

    if (!apiKey) {
      return res.status(401).json({ message: "API key missing." });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const dbApiKey = user.apiKey;

    if (apiKey != dbApiKey) {
      return res.status(403).json({ message: "Invalid API key." });
    }

    try {
      req.apiKey = dbApiKey;
      next();
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  // Middleware to authorize based on user roles
  // Checks if the user's role is included in the allowed roles
  authorize(roles) {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Unauthorized access" });
      }
      next();
    };
  }
}

export default AuthMiddleware;
