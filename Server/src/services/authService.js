import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default class AuthService {
  constructor(secretyKey) {
    this.secretyKey = secretyKey;
  }

  generateToken(payload) {
    if (!this.secretyKey) {
      throw new Error("JWT_SECRET environment variable is not defined");
    }
    
    return jwt.sign(payload, this.secretyKey);
  }

  generateAiAuthToken(payload) {
    return jwt.sign(payload);
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.secretyKey);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
