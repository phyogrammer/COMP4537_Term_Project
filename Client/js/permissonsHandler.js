class PermissionsHandler {

    static handleRedirect(response) {
        if (response.success) {
            localStorage.setItem('authToken', response.token);
            if (response.user.role === 'admin') {
            window.location.href = 'adminDashboard.html';
            } else {
                window.location.href = 'userDashboard.html';
            }
        } else {
            console.error("Login failed:", response.message);
        }
    }

    static checkUserPermission() {
        const token = localStorage.getItem('authToken');
        return token !== null;
    }

    static checkAdminPermission() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user && user.role === 'admin';
    }

    static logOut() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }
}
