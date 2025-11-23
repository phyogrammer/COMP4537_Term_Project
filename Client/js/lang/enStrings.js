const apiBaseUrl = 'https://termprojserver.onrender.com/api/';

const endpoints = {
    // User Authentication
    REGISTER: apiBaseUrl + 'users/register',
    LOGIN: apiBaseUrl + 'users/login',
    LOGOUT: apiBaseUrl + 'users/logout',
    
    // User API Key & Usage
    API_CALLS_LEFT: apiBaseUrl + 'users/apicallsleft',
    GET_NEW_API_KEY: apiBaseUrl + 'users/getnewapikey',
    GET_API_KEY: apiBaseUrl + 'users/getapikey',
    SQL_INJ_CHECK: apiBaseUrl + 'users/sqlinjcheck',
    
    // Admin Endpoints
    GET_USERS_INFO: apiBaseUrl + 'admin/getusersinfo',
    DELETE_USER: apiBaseUrl + 'admin/delete/',
    GET_API_STATS: apiBaseUrl + 'admin/getapistats'
};

const responseStrings = {
    LOGIN_SUCCESS: 'Login successful!',
    LOGIN_FAILURE: 'Login failed. Please check your credentials.',
    REGISTER_SUCCESS: 'Registration successful! You can now log in.',
    REGISTER_FAILURE: 'Registration failed. Please try again.',
    LOGOUT_SUCCESS: 'Logout successful!',
    LOGOUT_FAILURE: 'Logout failed. Please try again.'
}; 

const registrationStrings = {
    REGISTER_PAGE_TITLE: 'Create a new account',
    REGISTER_PAGE_DESCRIPTION: 'Fill in the details below to register.',
    DASHBOARD_PAGE_TITLE: 'User Dashboard',
    DASHBOARD_PAGE_DESCRIPTION: 'Welcome to your dashboard!',
    EMAIL: 'Email address',
    PASSWORD: 'Password',
    REPEAT_PASSWORD: 'Repeat your password',
    FIRST_NAME: 'First Name',
    LAST_NAME: 'Last Name',
    LOGIN_LINK_TEXT: 'Already have an account? Log in here.',
    SUBMIT_BUTTON: 'Submit'
};

const loginPageStrings = {
    LANDING_PAGE_TITLE: 'AI Powered SQL Injection Detector',
    LOGIN_FORM_TITLE: 'Log In',
    REGISTRATION_REDIRECT: "Don't have an account? Register here.",
    REGISTRATION_REDIRECT_LINK: 'register.html',
    EMAIL: 'Email address',
    PASSWORD: 'Password',
    LOGIN_BUTTON: 'Log In',
    REGISTRATION_REDIRECT_LABEL: "Don't have an account?",
    REGISTRATION_REDIRECT: 'Register here.',
};

const userDashboardStrings = {
    SIDEBAR_HEADER: 'SQL injection tester',
    SIDEBAR_DASHBOARD: 'Dashboard',
    SIDEBAR_ABOUT: 'About',
    SIDEBAR_CONTACT: 'Contact',
    NAV_USER_NAME: 'Test User',
    PAGE_TITLE: 'User Dashboard',
    TOKEN_CARD_TITLE: 'Your Tokens',
    TOKEN_CARD_TEXT: 'You have X tokens remaining',
    GET_MORE_TOKENS_BUTTON: 'Get more tokens'
};

const adminDashboardStrings = {
    SIDEBAR_HEADER: 'SQL injection tester',
    SIDEBAR_DASHBOARD: 'Dashboard',
    SIDEBAR_ABOUT: 'About',
    SIDEBAR_CONTACT: 'Contact',
    NAV_USER_NAME: 'Test User',
    PAGE_TITLE: 'Admin Dashboard',
    RECENT_USER_USAGE_TITLE: 'Recent User Usage',
    TABLE_HEADER_EMAIL: 'Email',
    TABLE_HEADER_FIRST_NAME: 'First Name',
    TABLE_HEADER_LAST_NAME: 'Last Name',
    TABLE_HEADER_TOKENS: 'Tokens',
    TABLE_HEADER_ROLE: 'Role',
    API_STATS_TITLE: 'API Endpoint Statistics',
    API_STATS_TABLE_HEADER_METHOD: 'Method',
    API_STATS_TABLE_HEADER_ENDPOINT: 'Endpoint',
    API_STATS_TABLE_HEADER_REQUESTS: 'Requests'
};