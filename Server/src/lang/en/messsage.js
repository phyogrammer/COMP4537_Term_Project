export const MESSAGE = {
  USER: {
    REGISTER_SUCCESS: "User registered successfully",
    REGISTER_ERROR: "An error occurred during registration.",
    EMAIL_EXISTS: "Email already registered.",
    INVALID_CREDS: "Invalid email or password",
    API_CALL_EXCEEDED: "API call limit exceeded",
  },
  AUTH: {
    LOGIN_SUCCESS: "Login successful",
    LOGOUT_SUCCESS: "Logout successful",
    INVALID_CREDS: "Invalid email or password",
    NO_TOKEN: "No token provided",
    UNAUTHORIZED: "Unauthorized access",
  },
  ERROR: {
    SERVER_ERROR: "An internal server error occurred.",
    USER_NOT_FOUND: "User not found.",
    INVALID_API_KEY: "Invalid API key.",
    MISSING_API_KEY: "API key is missing.",
    AI_SERVICE_ERROR:
      "An error occurred while communicating with the AI service.",
  },
  ADMIN: {
    INVALID_ENDPOINT: "Cannot find endpoints",
    USER_REMOVE_SUCCESS: "User removed successfully",
  },
};
