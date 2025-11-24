export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "COMP4537 Term Project API - SQL Injection Detection Service",
      version: "1.0.0",
      description: `
# SQL Injection Detection API

This API provides authentication, user management, and AI-powered SQL injection detection capabilities.

## Features
- **JWT Authentication**: Secure token-based authentication using httpOnly cookies
- **API Key System**: Each user receives a unique API key for additional security
- **Free API Calls**: New users receive 20 free API calls
- **AI/ML Integration**: SQL injection detection powered by HuggingFace models
- **Admin Dashboard**: Monitor API usage and manage users
- **RESTful Design**: Full CRUD operations following REST principles

## Authentication Flow
1. Register a new account at \`/api/users/register\`
2. Login at \`/api/users/login\` to receive JWT token
3. Use the token (automatically sent via cookie) for authenticated requests
4. For AI endpoints, also include your API key in the \`api-key\` header

## Rate Limiting
- Each user receives 20 free API calls
- After exceeding the limit, a warning is displayed but service continues
- Track your usage at \`/api/users/apicallsleft\`

## Admin Access
Admin users have access to:
- View all users and their API consumption
- Monitor endpoint statistics
- Remove users
          `,
    },
    servers: [
      {
        url: "https://termprojserver.onrender.com",
        description: "Production server",
      },
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
          description:
            "JWT token stored in httpOnly cookie (automatically sent by browser)",
        },
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "JWT token in Authorization header (format: Bearer <token>)",
        },
        apiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "api-key",
          description: "User's unique API key for accessing AI services",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Unique user identifier",
              example: "507f1f77bcf86cd799439011",
            },
            firstName: {
              type: "string",
              description: "User's first name",
              example: "John",
            },
            lastName: {
              type: "string",
              description: "User's last name",
              example: "Doe",
            },
            email: {
              type: "string",
              format: "email",
              description: "User's email address (unique)",
              example: "john@example.com",
            },
            role: {
              type: "string",
              enum: ["user", "admin"],
              description: "User role",
              example: "user",
            },
            numOfApiCallsLeft: {
              type: "number",
              description: "Number of free API calls remaining",
              example: 15,
            },
            apiKey: {
              type: "string",
              description: "User's unique API key",
              example: "abc123def456ghi789jkl012mno345",
            },
          },
        },
        ApiStats: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Unique endpoint identifier",
              example: "507f1f77bcf86cd799439013",
            },
            method: {
              type: "string",
              enum: ["GET", "POST", "PUT", "PATCH", "DELETE"],
              description: "HTTP method",
              example: "POST",
            },
            endpoint: {
              type: "string",
              description: "API endpoint path",
              example: "/api/users/sqlinjcheck",
            },
            requests: {
              type: "number",
              description: "Total number of requests served",
              example: 234,
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              description: "Error message describing what went wrong",
              example: "Invalid email or password",
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              description: "Success message",
              example: "Operation completed successfully",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Health Check",
        description: "Server health and status endpoints",
      },
      {
        name: "Authentication",
        description: "User authentication and session management",
      },
      {
        name: "Users",
        description: "User profile and API key management",
      },
      {
        name: "AI Services",
        description:
          "AI-powered SQL injection detection using HuggingFace models",
      },
      {
        name: "Admin",
        description:
          "Administrative endpoints for monitoring and user management (admin access required)",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/app.js"],
};
