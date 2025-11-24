const apiBaseUrl = 'https://termprojserver.onrender.com/api/';
const clientBaseUrl = 'https://comp4537sqltester.netlify.app/';

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

const htmlPaths = {
    ADMIN_DASHBOARD: clientBaseUrl + 'Client/html/adminDashboard.html',
    USER_DASHBOARD: clientBaseUrl + 'Client/html/userDashboard.html',
    LOGIN: clientBaseUrl + 'Client/index.html'
};

const responseStrings = {
    LOGIN_FAILURE: 'Login failed. Please check your credentials.',
    REGISTER_FAILURE: 'Registration failed. Please try again.',
    LOGOUT_BUTTON: 'Logout'
}; 

const registrationStrings = {
    REGISTER_PAGE_TITLE: 'Create a new account',
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
    EMAIL: 'Email address',
    PASSWORD: 'Password',
    LOGIN_BUTTON: 'Log In',
    REGISTRATION_REDIRECT_LABEL: "Don't have an account?",
    REGISTRATION_REDIRECT: 'Register here.'
};

const userDashboardStrings = {
    SIDEBAR_HEADER: 'SQL injection tester',
    SIDEBAR_ABOUT: 'About',
    SIDEBAR_CONTACT: 'Contact',
    PAGE_TITLE: 'User Dashboard',
    API_KEY_CARD_TITLE: 'Your API Key',
    TOKEN_CARD_TITLE: 'Your Tokens',
    GET_NEW_API_KEY_BUTTON: 'Get a New API Key'
};

const adminDashboardStrings = {
    SIDEBAR_HEADER: 'SQL injection tester',
    SIDEBAR_ABOUT: 'About',
    SIDEBAR_CONTACT: 'Contact',
    PAGE_TITLE: 'Admin Dashboard',
    RECENT_USER_USAGE_TITLE: 'Recent User Usage',
    TABLE_HEADER_EMAIL: 'Email',
    TABLE_HEADER_FIRST_NAME: 'First Name',
    TABLE_HEADER_LAST_NAME: 'Last Name',
    TABLE_HEADER_TOKENS: 'Tokens',
    TABLE_HEADER_ROLE: 'Role',
    TABLE_HEADER_API_KEY: 'API Key',
    TABLE_HEADER_ACTIONS: 'Actions',
    DELETE_BUTTON: 'Delete',
    DELETE_CONFIRM: 'Are you sure you want to delete this user?',
    API_STATS_TITLE: 'API Endpoint Statistics',
    API_STATS_TABLE_HEADER_METHOD: 'Method',
    API_STATS_TABLE_HEADER_ENDPOINT: 'Endpoint',
    API_STATS_TABLE_HEADER_REQUESTS: 'Requests'
};