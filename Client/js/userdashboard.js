class UserDashboard {

    static async getUserInfo() 
    {
        try 
        {
            // figure out the get requests and endpoints
            const response = await fetch('/api/user/info', 
                {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) 
            {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            document.getElementById('userTokenInfoDisplay').textContent = `You have ${data.tokens} tokens remaining.`;

        }
        catch (error) 
        {
            console.error('Error fetching user info:', error);
        }

    }
}