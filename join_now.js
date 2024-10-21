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
    const memberExists = existingMembers.some(user => user.email === email);

    if (memberExists) {
        document.getElementById('message').innerHTML = 'That email is used by another account. Please use a different email.';
        document.getElementById('message').style.color = 'red'; // Set color to red for error
        console.log("Did not pass tests");
        return;
    }

    const format = /[`!@#$%^&*()_+\-=$$$${};':"\\|,.<>\/?~]/; // Special character Regex pattern

    let hasSpecialChar = format.test(password);
    let hasSpaces = /\s/.test(password);
    let hasNumbers = /\d/.test(password);

    //munipulate individual list items
    const item = document.querySelectorAll('li');
    // test item is array of list elements
    console.log(item[0]); // we got it!

    //if password len less than 5
    if (password.length < 5) {
        item[0].classList.add("error-li");//turns first list element red 
        item[0].classList.remove("correct-li");
        document.getElementById('message').innerHTML = 'Your password needs to be at least 5 characters long.';
        document.getElementById('message').style.color = 'red'
        return;
    }
    else {
        item[0].classList.remove("error-li");
        item[0].classList.add("correct-li");//turns first list element green
        //document.getElementById('message').innerHTML = '';//clear message
    }
    //if password does not contain a number.
    if (!hasNumbers) {
        item[1].classList.add("error-li");//turns second list element red 
        item[1].classList.remove("correct-li");
        document.getElementById('message').innerHTML = 'Your password needs to be at least 1 number.';
        document.getElementById('message').style.color = 'red'
        return;
    }
    else {
        item[1].classList.remove("error-li");
        item[1].classList.add("correct-li");//turns second list element green
        //document.getElementById('message').innerHTML = '';//clear message
    }
    //if password has spaces
    if (hasSpaces) {
        item[2].classList.add("error-li");//turns third list element red
        item[2].classList.remove("correct-li");
        document.getElementById('message').innerHTML = 'Your password has spaces. Stop that.';
        document.getElementById('message').style.color = 'red'
        return;
    }
    else {
        item[2].classList.remove("error-li");
        item[2].classList.add("correct-li");//turns third list element green
        //document.getElementById('message').innerHTML = '';//clear message
    }
    //if password does not have a special character
    if (!hasSpecialChar) {
        item[3].classList.add("error-li");//turns fourth list element red
        item[3].classList.remove("correct-li");
        document.getElementById('message').innerHTML = 'Your password needs a spceial character.';
        document.getElementById('message').style.color = 'red'
        return;
    }
    else {
        item[3].classList.remove("error-li");
        item[3].classList.add("correct-li");//turns fourth list element green
        //document.getElementById('message').innerHTML = '';//clear message
    }

    // // Check if password is valid
    // if (password.length < 5 || !hasNumbers || hasSpaces || !hasSpecialChar) {
    //     document.getElementById('message').innerHTML = 'Your password needs to be at least 5 characters long, contain a number, no spaces, and at least one special character.';
    //     return;
    // } else {
    //     console.log("Tests passed!");
    // }

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
});