'use strict';

// Select DOM elements
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const checkPassword = document.getElementById('check-password');

/**
 * UTILITY FUNCTIONS
 */

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
    return false; // Return false to indicate validation failure
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
    return true; // Return true to indicate validation success
}

// Check email is valid using a standard regex pattern
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        return showSuccess(input);
    } else {
        return showError(input, 'Email is not valid');
    }
}

// Check required fields
// Returns true only if ALL required fields are filled
function checkRequired(inputArr) {
    let allFilled = true;
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            allFilled = false;
        } else {
            showSuccess(input);
        }
    });
    return allFilled;
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        return showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        return showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        return showSuccess(input);
    }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        return showError(input2, 'Passwords do not match');
    }
    // Only show success on the confirm field if it's not empty
    if(input2.value !== '') {
        return showSuccess(input2);
    }
}

// Get fieldname (Capitalize first letter for display)
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

/**
 * EVENT LISTENERS
 */

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent actual form submission

    // Run validations
    const isRequiredValid = checkRequired([username, email, password, checkPassword]);
    const isLengthValid1 = checkLength(username, 3, 15);
    const isLengthValid2 = checkLength(password, 6, 25);
    const isEmailValid = checkEmail(email);
    const isPasswordMatch = checkPasswordsMatch(password, checkPassword);

    // Final Check: If no error classes exist, form is valid
    // Note: In a real app, you would rely on the boolean returns above
    const errorInputs = document.querySelectorAll('.form-control.error');
    
    if (errorInputs.length === 0) {
        // Success: This is where you would send data to the server
        console.log("Validation Successful. Submitting data...");
        // form.submit(); // Uncomment this line to actually submit
        alert("Registration Successful!");
    }
});