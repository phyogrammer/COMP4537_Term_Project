## Server Side README

This directory contains the server-side code for the application. The server is responsible for handling client requests, processing data, and communicating with the database.

### How to Run the Server

1. **Install Dependencies**: Make sure you have Node.js installed. Navigate to the `Server` directory and run:
   ```
   npm install
   ```
2. **Start the Server**: After installing the dependencies, start the server by running:
   ```
   npm run dev
   ```

### Project Structure
```
├── src/
|   ├── config/                 # Configuration files (e.g., database config)
|   |   └──database.js          # Database connection settings
|   ├── controllers/            # Contains the logic for handling requests
|   |   └──userController.js    # Example controller for user-related operations
|   ├── middlewares/            # Custom middleware functions
|   |   └──authMiddleware.js    # Authentication middleware 
|   ├── models/                 # Database models
|   |   └──userModel.js         # User Model definition
|   ├── routes/                 # API route definitions
|   |   └──userRoutes.js        # Routes for user-related endpoints
|   ├── services/               # Services, such as API, AI and Auth
|   |   ├──aiService.js         # Service for AI operations, talks with
|   |   ├──apiService.js        # Service for generating API key, and decementing API calls for AI usage
|   |   └──authService.js       # Service for authentication operations
|   └── app.js                  # Main application file
└── package.json                # Project metadata and dependencies
```