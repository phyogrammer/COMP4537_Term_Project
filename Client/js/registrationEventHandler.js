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

            if (!firstName.trim() || !lastName.trim())
            {
                alert('Please enter your first and last name.');
                return;
            }

            if (!email.includes('@'))
            {
                alert('Please enter a valid email address.');
                return;
            }

            if (!password.trim())
            {
                alert('Please enter a password.');
                return;
            }

            if (password !== repeatPassword)
            {
                alert('Passwords do not match.');
                return;
            }

            RegisterEventHandler.handleRegistrationFormSubmit(firstName, lastName, email, password, repeatPassword);
        });
    }

    static async handleRegistrationFormSubmit(firstName, lastName, email, password, repeatPassword) 
    {
        let response;
        try 
        {
            response = await fetch(endpoints.REGISTER,    
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
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
                PermissionsHandler.handleRedirect(data);
            }
        }
        catch (error)
        {
            alert(response.status + ': '  + responseStrings.REGISTER_FAILURE + ' ' + error.message);
        }
    }
}

RegisterEventHandler.init();