document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values from the form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Retrieve existing users from local storage
    const existingMembers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find the user by email
    const user = existingMembers.find(user => user.email === email);

    // Check if user exists and password matches
    if (user) {
        if (password === user.password) {
            // Successful login
            localStorage.setItem('loggedInUser', user.firstName); // Store the first name
            document.getElementById('message').innerHTML = 'Login successful! Redirecting...';
            document.getElementById('message').style.color = 'green';

            // Redirect to homepage after a short delay
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect user to index.html
            }, 2000);
        } else {
            // Incorrect password
            document.getElementById('message').innerHTML = 'Incorrect password. Please try again.';
            document.getElementById('message').style.color = 'red';
        }
    } else {
        // User not found
        document.getElementById('message').innerHTML = 'No account found with that email. Please create an account.';
        document.getElementById('message').style.color = 'red';
    }
});


// Check if a user is logged in and update the heading and navigation
window.onload = function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const authButton = document.getElementById('authButton');

    if (loggedInUser) {
        document.getElementById('welcomeHeading').innerHTML = `GymBros, welcome ${loggedInUser}! You're already Logged in!`;
        authButton.innerHTML = `<a href="#" onclick="logout()">Logout</button>`; // Change to Logout button
    } else {
        authButton.innerHTML = `<a href="login.html" class="active">Login</a>`; // Default to Login link
    }
};
// Logout function to clear user data
function logout() {
    localStorage.removeItem('loggedInUser'); // Clear user data
    window.location.href = 'index.html'; // Redirect to homepage
};
