// Function to handle form submission
document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values from the form
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const membershipType = document.getElementById('membershipType').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if the email already exists in local storage
    const existingMembers = JSON.parse(localStorage.getItem('users')) || [];
    console.log(existingMembers); // test print
    const memberExists = existingMembers.some(user => user.email === email);

    if (memberExists) {
        document.getElementById('message').innerHTML = 'That email is used by another account. Please use a different email.';
        document.getElementById('message').style.color = 'red'; // Set color to red for error
        console.log("Did not pass tests");
        return;
    }

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    document.getElementById('email').addEventListener('input', function () {
        //const email = this.value;
        const messageDiv = document.getElementById('message');
        if (!isValidEmail(email)) {
            messageDiv.innerHTML = 'Please enter a valid email address.';
            messageDiv.style.color = 'red';
        } else {
            messageDiv.innerHTML = '';
        }
    });

    function validatePassword(password) {
        const errors = [];
        const format = /[`!@#$%^&*()_+\-=$${};':"\\|,.<>\/?~]/;

        if (password.length < 5) {
            errors.push('Your password needs to be at least 5 characters long.');
        }
        if (!/\d/.test(password)) {
            errors.push('Your password needs at least 1 number.');
        }
        if (/\s/.test(password)) {
            errors.push('Your password has spaces. Stop that.');
        }
        if (!format.test(password)) {
            errors.push('Your password needs a special character.');
        }

        return errors;
    }

    document.getElementById('password').addEventListener('input', function () {
        //const password = this.value;
        const passwordErrors = validatePassword(password);
        const messageDiv = document.getElementById('message');
        if (passwordErrors.length > 0) {
            messageDiv.innerHTML = passwordErrors.join('<br>');
            messageDiv.style.color = 'red';
        } else {
            messageDiv.innerHTML = '';
        }
    });

    // Create a new user object
    const newMember = {
        firstName: firstName,
        lastName: lastName,
        membershipType: membershipType,
        email: email,
        password: password
    };

    // Add the new member to the existing members array
    existingMembers.push(newMember);
    localStorage.setItem('users', JSON.stringify(existingMembers));

    // Clear the form after submission
    document.getElementById('registrationForm').reset();

    // After successful registration
    document.getElementById('message').innerHTML = 'Account created successfully!';
    document.getElementById('message').style.color = 'green'; // Set color to green for success

    // Redirect to index.html after 3 seconds
    setTimeout(() => {
        window.location.href = 'index.html'; // redirect user to homepage
    }, 2000);
});

// Check if a user is logged in and update the heading and navigation
window.onload = function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const authButton = document.getElementById('authButton');

    if (loggedInUser) {
        document.getElementById('welcomeHeading').innerHTML = `GymBros, welcome ${loggedInUser}!`;
        authButton.innerHTML = `<a href="#" onclick="logout()">Logout</button>`; // Change to Logout button
    } else {
        authButton.innerHTML = `<a href="login.html">Login</a>`; // Default to Login link
    }
};
// Logout function to clear user data
function logout() {
    localStorage.removeItem('loggedInUser'); // Clear user data
    window.location.href = 'index.html'; // Redirect to homepage
}
