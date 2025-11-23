class PermissionsHandler {

    // Handles redirection based on user role after login or registration.
    static handleRedirect(response) {
        if (response.success) {
            // Token is set as HTTP-only cookie by server, no need to save it
            // Save user role for client-side checks
            localStorage.setItem('userRole', response.role);
            
            if (response.role === 'admin') {
                window.location.href = './html/adminDashboard.html';
            } else {
                window.location.href = './html/userDashboard.html';
            }
        } else {
            alert("Login failed: " + response.message);
        }
    }

    // WIP - Will be used to check permissions on pages client side.
    // Currently Even if navigated to manually, the server won't provide any information
    static checkUserPermission() {
        const token = localStorage.getItem('authToken');
        return token !== null;
    }

    // WIP - Will be used to check permissions on pages client side.
    // Currently Even if navigated to manually, the server won't provide any information
    static checkAdminPermission() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user && user.role === 'admin';
    }

    // Yet to implement in frontend, plan is dropdown option when clicking on user icon.
    static logOut() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }
}
