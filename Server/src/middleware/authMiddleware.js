import UserModel from "../models/userModel.js";
import { MESSAGE } from "../lang/en/messsage.js";
class AuthMiddleware {
  constructor(authService) {
    this.authService = authService;
  }

  authenticate(req, res, next) {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: MESSAGE.AUTH.NO_TOKEN });
    }

    try {
      const decoded = this.authService.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      res
        .status(401)
        .json({ message: MESSAGE.AUTH.UNAUTHORIZED + ": " + error.message });
    }
  }

  async authenticateApiKey(req, res, next) {
    const apiKey = req?.headers?.["api-key"] || req?.query?.apiKey;

    const userId = req.user.id;
    const user = await UserModel.findById(userId);

    if (!apiKey) {
      return res.status(401).json({ message: MESSAGE.ERROR.MISSING_API_KEY });
    }

    if (!user) {
      return res.status(404).json({ message: MESSAGE.ERROR.USER_NOT_FOUND });
    }

    const dbApiKey = user.apiKey;

    if (apiKey != dbApiKey) {
      return res.status(403).json({ message: MESSAGE.ERROR.INVALID_API_KEY });
    }

    try {
      req.apiKey = dbApiKey;
      next();
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  authorize(roles) {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: MESSAGE.AUTH.UNAUTHORIZED + ": " + error.message });
      }
      next();
    };
  }
}

export default AuthMiddleware;
