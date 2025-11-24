class PermissionsHandler 
{

    static initializeLogoutButton() 
    {
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) 
        {
            logoutButton.textContent = responseStrings.LOGOUT_BUTTON;
            logoutButton.addEventListener('click', function(e) {
                e.preventDefault();
                PermissionsHandler.logOut();
            });
        }
    }

    static handleRedirect(response) 
    {
        if (response.success) 
        {
            localStorage.setItem('userRole', response.role);
            
            if (response.role === 'admin') 
            {
                window.location.href = htmlPaths.ADMIN_DASHBOARD;
            } 
            else 
            {
                window.location.href = htmlPaths.USER_DASHBOARD;
            }
        } 
        else 
        {
            alert("Login failed: " + response.message);
        }
    }

    static handleAdminAccess()
    {
        const role = localStorage.getItem('userRole'); 
        
        if (role !== 'admin')
        {
            alert('Access denied. Admin privileges required.');
            window.location.href = htmlPaths.LOGIN;
            return;
        }
    }

    static async logOut() 
    {
        try 
        {
            const response = await fetch(endpoints.LOGOUT, {
                method: 'POST',
                credentials: 'include'
            });
            localStorage.removeItem('userRole');
            window.location.href = htmlPaths.LOGIN;
        } 
        catch (error) 
        {
            localStorage.removeItem('userRole');
            window.location.href = htmlPaths.LOGIN;
        }
    }
}
