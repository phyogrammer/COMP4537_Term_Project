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
       try 
        {
            const response = await fetch(endpoints.LOGIN,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            email,
                            password
                        })
                });

            const data = await response.json();

            if (data.success) 
            {
                alert(responseStrings.LOGIN_SUCCESS);
                PermissionsHandler.handleRedirect(data);
            }
        }
        catch (error)
        {
            alert(responseStrings.LOGIN_FAILURE + ' ' + error.message);
        }
    }   
}

LoginEventHandler.init();
