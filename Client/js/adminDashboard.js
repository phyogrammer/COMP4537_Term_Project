class AdminDashboard
{

    static init()
    {
        PermissionsHandler.handleAdminAccess();
        PermissionsHandler.initializeLogoutButton();
        
        AdminDashboard.loadRecentUserUsageTable();
        AdminDashboard.loadApiStatsTable();
    }

    static async loadRecentUserUsageTable()
    {
        let response;
        try
        {
            response = await fetch(endpoints.GET_USERS_INFO, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok)
            {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            if (data.success && data.data)
            {
                const tableBody = document.getElementById('recentUserUsageTableBody');
                
                for (const user of data.data)
                {
                    const row = document.createElement('tr');

                    const userEmailCell = document.createElement('td');
                    const userFirstNameCell = document.createElement('td');
                    const userLastNameCell = document.createElement('td');
                    const userTokensCell = document.createElement('td');
                    const userRoleCell = document.createElement('td');
                    const userApiKeyCell = document.createElement('td');
                    const userActionsCell = document.createElement('td');

                    userEmailCell.textContent = user.email;
                    userFirstNameCell.textContent = user.firstName;
                    userLastNameCell.textContent = user.lastName;
                    userTokensCell.textContent = user.numOfApiCallsLeft;
                    userRoleCell.textContent = user.role;
                    userApiKeyCell.textContent = user.apiKey || 'N/A';

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = adminDashboardStrings.DELETE_BUTTON;
                    deleteButton.className = 'btn btn-danger btn-sm';
                    deleteButton.onclick = () => AdminDashboard.deleteUser(user.email, row);
                    userActionsCell.appendChild(deleteButton);

                    row.appendChild(userEmailCell);
                    row.appendChild(userFirstNameCell);
                    row.appendChild(userLastNameCell);
                    row.appendChild(userTokensCell);
                    row.appendChild(userRoleCell);
                    row.appendChild(userApiKeyCell);
                    row.appendChild(userActionsCell);
                    
                    tableBody.appendChild(row);
                }
            }
        } 
        catch (error)
        {
            alert(response.status + ': Error fetching recent user usage: ' + error);
        }
    }

    static async loadApiStatsTable()
    {
        let response;
        try 
        {
            response = await fetch(endpoints.GET_API_STATS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok)
            {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            if (data.success && data.data)
            {
                const tableBody = document.getElementById('apiStatsTableBody');
                
                for (const apiStat of data.data)
                {
                    const row = document.createElement('tr');

                    const methodCell = document.createElement('td');
                    const endpointCell = document.createElement('td');
                    const requestsCell = document.createElement('td');

                    methodCell.textContent = apiStat.method;
                    endpointCell.textContent = apiStat.endpoint;
                    requestsCell.textContent = apiStat.requests;

                    row.appendChild(methodCell);
                    row.appendChild(endpointCell);
                    row.appendChild(requestsCell);
                    
                    tableBody.appendChild(row);
                }
            }
        } 
        catch (error)
        {
            alert(response.status + ': Error fetching API stats: ' + error);
        }
    }

    static async deleteUser(userEmail, rowElement)
    {
        if (!confirm(adminDashboardStrings.DELETE_CONFIRM))
        {
            return;
        }

        let response;
        try
        {
            response = await fetch(endpoints.DELETE_USER + encodeURIComponent(userEmail), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok)
            {
                throw new Error('Failed to delete user');
            }

            const data = await response.json();
            
            if (data.success)
            {
                rowElement.remove();
                alert('User deleted successfully');
            } 
            else
            {
                alert('Failed to delete user: ' + data.message);
            }
        }
        catch (error)
        {
            alert(response.status + ': Error deleting user: ' + error);
        }
    }
}

AdminDashboard.init();