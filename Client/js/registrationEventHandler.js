class RegisterEventHandler 
{
    static init() 
    {
        document.getElementById('registrationForm').addEventListener('submit', async function (e) 
        {
            e.preventDefault();

            const firstName = document.getElementById('formFirstName').value;
            const lastName = document.getElementById('formLastName').value;
            const email = document.getElementById('formEmail').value;
            const password = document.getElementById('formPassword').value;
            const repeatPassword = document.getElementById('formRepeatPassword').value;

            // To-Do : Add client-side validation checks for all fields

            RegisterEventHandler.handleRegistrationFormSubmit(firstName, lastName, email, password, repeatPassword);
        });
    }

    // Can remove repeatPassword from parameters if not needed for server-side check
    static async handleRegistrationFormSubmit(firstName, lastName, email, password, repeatPassword) 
    {
        try 
        {
            const response = await fetch(endpoints.REGISTER,    
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            firstName,
                            lastName,
                            email,
                            password,
                            repeatPassword
                        })
                });

            const data = await response.json();

            if (data.success) 
            {
                alert(responseStrings.REGISTER_SUCCESS);
                PermissionsHandler.handleRedirect(data);
            }
        }
        catch (error)
        {
            alert(responseStrings.REGISTER_FAILURE + ' ' + error.message);
        }
    }
}

RegisterEventHandler.init();