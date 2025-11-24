class LoginEventHandler 
{
    static init() 
    {
        document.getElementById('loginForm').addEventListener('submit', async function (e) 
        {
            e.preventDefault();

            const email = document.getElementById('userEmail').value;
            const password = document.getElementById('userPassword').value;

            LoginEventHandler.handleLoginFormSubmit(email, password);
        });
    }

    static async handleLoginFormSubmit(email, password) 
    {
        let response;
        try 
        {
            response = await fetch(endpoints.LOGIN,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(
                        {
                            email,
                            password
                        })
                });

            const data = await response.json();

            if (data.success) 
            {
                PermissionsHandler.handleRedirect(data);
            }
            else
            {
                alert(response.status + ': ' + responseStrings.LOGIN_FAILURE);
            }
        }
        catch (error)
        {
            alert(response.status + ': ' + responseStrings.LOGIN_FAILURE + ' ' + error.message);
        }
    }   
}

LoginEventHandler.init();
