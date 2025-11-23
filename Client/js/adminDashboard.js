class AdminDashboard {

    static async loadRecentUserUsageTable() {

        try 
        {
            const response = await fetch(endpoints.GET_USERS_INFO, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            if (data.success && data.data) {
                const tableBody = document.getElementById('recentUserUsageTableBody');
                
                for (const user of data.data)
                {
                    const row = document.createElement('tr');

                    const userEmailCell = document.createElement('td');
                    const userFirstNameCell = document.createElement('td');
                    const userLastNameCell = document.createElement('td');
                    const userTokensCell = document.createElement('td');
                    const userRoleCell = document.createElement('td');

                    userEmailCell.textContent = user.email;
                    userFirstNameCell.textContent = user.firstName;
                    userLastNameCell.textContent = user.lastName;
                    userTokensCell.textContent = user.numOfApiCallsLeft;
                    userRoleCell.textContent = user.role;

                    row.appendChild(userEmailCell);
                    row.appendChild(userFirstNameCell);
                    row.appendChild(userLastNameCell);
                    row.appendChild(userTokensCell);
                    row.appendChild(userRoleCell);
                    
                    tableBody.appendChild(row);
                }
            }
        } 
        catch (error) 
        {
            alert('Error fetching recent user usage: ' + error);
        }
    }

    static async loadApiStatsTable() {

        try 
        {
            const response = await fetch(endpoints.GET_API_STATS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            if (data.success && data.data) {
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
            alert('Error fetching API stats: ' + error);
        }
    }
}

AdminDashboard.loadRecentUserUsageTable();
AdminDashboard.loadApiStatsTable();