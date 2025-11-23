class LoginEventHandler 
{
    static init() 
    {
        document.getElementById('loginForm').addEventListener('submit', async function (e) 
        {
            e.preventDefault();

            // We will likely have to obscure the password here before sending it over the network
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
                    credentials: 'include', // Important: Include cookies in request
                    body: JSON.stringify(
                        {
                            email,
                            password
                        })
                });

            const data = await response.json();
            console.log("Response Data: ", data);

            if (data.success) 
            {
                alert(responseStrings.LOGIN_SUCCESS);
                PermissionsHandler.handleRedirect(data);
            }
            else
            {
                alert(responseStrings.LOGIN_FAILURE);
            }
        }
        catch (error)
        {
            alert(responseStrings.LOGIN_FAILURE + ' ' + error.message);
        }
    }   
}

LoginEventHandler.init();
