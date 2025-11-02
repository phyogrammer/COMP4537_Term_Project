const apiBaseUrl = 'http://localhost:3000';

const endpoints = {
    LOGIN: apiBaseUrl + '/api/app/login',
    REGISTER: apiBaseUrl + '/api/app/register'
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

};

const adminDashboardStrings = {
    DASHBOARD_PAGE_TITLE: 'Admin Dashboard'
};