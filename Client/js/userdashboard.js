class UserDashboard 
{

    static init() 
    {
        PermissionsHandler.initializeLogoutButton();
        UserDashboard.loadUserAPIKey();
        UserDashboard.loadUserTokens();
    }

    static async loadUserAPIKey() 
    {
        let response;
        try 
        {
            response = await fetch(endpoints.GET_API_KEY, {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) 
            {
                const data = await response.json();
                if (data.success) 
                {
                    document.getElementById('apiKeyDisplay').textContent = data.apiKey || 'N/A';
                }
            }
        } 
        catch (error) 
        {
            alert(response.status + ': Error fetching API key: ' + error);
        }
    }

    static async loadUserTokens() 
    {
        let response;
        try 
        {
            response = await fetch(endpoints.API_CALLS_LEFT, {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) 
            {
                const data = await response.json();
                if (data.success) 
                {
                    document.getElementById('tokensRemainingDisplay').textContent = data.numOfApiCallsLeft || '0';
                }
            }
        } 
        catch (error) 
        {
            alert(response.status + ': Error fetching tokens remaining: ' + error);
        }
    }

    static async getNewAPIKey()
    {
        let response;
        try 
        {
            response = await fetch(endpoints.GET_NEW_API_KEY, {
                method: 'PUT',
                credentials: 'include'
            });

            if (response.ok) 
            {
                const data = await response.json();
                if (data.success) 
                {
                    UserDashboard.loadUserAPIKey();
                }
            }
            else
            {
                throw new Error('Failed to generate API key');
            }
        } 
        catch (error) 
        {
            alert(response?.status + ': Error generating new API key: ' + error);
        }
    }
}

UserDashboard.init();