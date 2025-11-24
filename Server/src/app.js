import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import DatabaseConnection from "./config/database.js";
import UserRoutes from "./routes/userRoutes.js";
import AdminRoutes from "./routes/adminRoutes.js";
import seedApiEndpoints from "./seed/seedApiEndpoints.js";
import { swaggerOptions } from "./config/swagger.js";

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
    this.setupSwagger();
    this.startServer();
  }

  configureMiddleware() {
    this.app.use(
      cors({
        origin: true,
        credentials: true,
      })
    );

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

  setupSwagger() {
    const specs = swaggerJsdoc(swaggerOptions);

    const swaggerUiOptions = {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "SQL Injection Detection API Docs",
      customfavIcon: "/favicon.ico",
    };

    // Requirement: URL must end with /doc/
    this.app.use(
      "/doc",
      swaggerUi.serve,
      swaggerUi.setup(specs, swaggerUiOptions)
    );

    // Also make it available at /doc/ for consistency
    this.app.use(
      "/doc/",
      swaggerUi.serve,
      swaggerUi.setup(specs, swaggerUiOptions)
    );
  }

  startServer() {
    this.app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  }
}

new Application();
