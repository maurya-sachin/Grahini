const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});



document.addEventListener('DOMContentLoaded', function () {
    const signUpForm = document.querySelector('.sign-up-container form');
    const signInForm = document.querySelector('.sign-in-container form');

    // Helper function to check if a string is empty or contains only whitespace
    function isEmpty(str) {
        return str.trim() === '';
    }

    // Helper function to validate email format
    function isValidEmail(email) {
        // You can use a more sophisticated email validation regex if needed
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Handle form submission for sign-up
    signUpForm.addEventListener('submit', function (event) {
        const nameInput = signUpForm.querySelector('input[placeholder="Name"]');
        const emailInput = signUpForm.querySelector('input[placeholder="Email"]');
        const passwordInput = signUpForm.querySelector('input[placeholder="Password"]');

        if (isEmpty(nameInput.value) || isEmpty(emailInput.value) || isEmpty(passwordInput.value) || !isValidEmail(emailInput.value)) {
            alert('Please fill in all fields with valid data.');
            event.preventDefault();
        }
    });

    // Handle form submission for sign-in
    signInForm.addEventListener('submit', function (event) {
        const emailInput = signInForm.querySelector('input[placeholder="Email"]');
        const passwordInput = signInForm.querySelector('input[placeholder="Password"]');

        if (isEmpty(emailInput.value) || isEmpty(passwordInput.value) || !isValidEmail(emailInput.value)) {
            alert('Please fill in all fields with valid data.');
            event.preventDefault();
        }
    });
});