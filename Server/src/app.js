import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import DatabaseConnection from "./config/database.js";
import UserRoutes from "./routes/userRoutes.js";
import AdminRoutes from "./routes/adminRoutes.js";
import seedApiEndpoints from "./seed/seedApiEndpoints.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

class Application {
  constructor() {
    this.app = express();

    this.configureMiddleware();

    this.init();
  }

  async init() {
    await this.connectToDatabase();
    this.configureRoutes();
    this.startServer();
  }

  configureMiddleware() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  async connectToDatabase() {
    this.dbConnection = new DatabaseConnection();

    await this.dbConnection.connect();
    await seedApiEndpoints();
  }

  configureRoutes() {
    this.app.get("/api/health", (req, res) => {
      res.json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString(),
      });
    });

    const userRoutes = new UserRoutes();
    const adminRoutes = new AdminRoutes();

    this.app.use("/api/users", userRoutes.getRouter());
    this.app.use("/api/admin", adminRoutes.getRouter());
  }

  startServer() {
    this.app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  }
}

new Application();
