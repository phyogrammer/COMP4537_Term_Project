class AdminDashboard {

    static async loadRecentUserUsageTable() {

        try 
        {
            // figure out the GET requests and endpoints
            const response = await fetch('/api/admin/recentUserUsage', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Figure this out
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            // Will update based on the actual data sent by server
            for (const user of data.users)
            {
                const tableBody = document.getElementById('recentUserUsageTableBody');
                const row = document.createElement('tr');
                tableBody.appendChild(row);

                const userEmailCell = document.createElement('td');
                const userFirstNameCell = document.createElement('td');
                const userLastNameCell = document.createElement('td');
                const userTokensCell = document.createElement('td');
                const userRoleCell = document.createElement('td');

                userEmailCell.textContent = user.email;
                userFirstNameCell.textContent = user.firstName;
                userLastNameCell.textContent = user.lastName;
                userTokensCell.textContent = user.tokensUsed;
                userRoleCell.textContent = user.role;

                row.appendChild(userEmailCell);
                row.appendChild(userFirstNameCell);
                row.appendChild(userLastNameCell);
                row.appendChild(userTokensCell);
                row.appendChild(userRoleCell);
            }
        } 
        catch (error) 
        {
            alert('Error fetching recent user usage: ' + error);
        }
    }
}