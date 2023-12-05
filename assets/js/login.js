document.addEventListener('DOMContentLoaded', function () {
    const loginForm = new LoginForm();
    loginForm.initialize();
});

class LoginForm {
    constructor() {
        this.container = document.getElementById('container');
        this.signUpButton = document.getElementById('signUp');
        this.signInButton = document.getElementById('signIn');
        this.initForms();
    }

    initForms() {
        // Initialize form elements and event listeners
        this.nameInput = document.getElementById("name");
        this.emailInputSignUp = document.getElementById("email-sign-up");
        this.passwordInputSignUp = document.getElementById("password-sign-up");
        this.confirmPasswordInput = document.getElementById("confirm-password-sign-up");
        this.emailInputSignIn = document.getElementById("email-sign-in");
        this.passwordInputSignIn = document.getElementById("password-sign-in");
        this.formSignUp = document.getElementById("form-sign-up");
        this.formSignIn = document.getElementById("form-sign-in");

        // Event listeners for input fields in the sign-up form
        this.nameInput.addEventListener('input', () => this.handleInputValidation(this.nameInput));
        this.emailInputSignUp.addEventListener('input', () => this.handleInputValidation(this.emailInputSignUp));
        this.passwordInputSignUp.addEventListener('input', () => this.handleInputValidation(this.passwordInputSignUp));
        this.confirmPasswordInput.addEventListener('input', () => this.handleInputValidation(this.confirmPasswordInput));

        // Event listeners for input fields in the sign-in form
        this.emailInputSignIn.addEventListener('input', () => this.handleInputValidation(this.emailInputSignIn));
        this.passwordInputSignIn.addEventListener('input', () => this.handleInputValidation(this.passwordInputSignIn));

        // Submit event listeners for the forms
        this.formSignUp.addEventListener("submit", (e) => this.handleSignUpFormSubmit(e));
        this.formSignIn.addEventListener("submit", (e) => this.handleSignInFormSubmit(e));


    }

    initialize() {
        // Initialize other elements and event listeners
        this.signUpButton.addEventListener('click', () => this.showSignUpPanel());
        this.signInButton.addEventListener('click', () => this.showSignInPanel());


    }

    showSignUpPanel() {
        this.container.classList.add("right-panel-active");
    }

    showSignInPanel() {
        this.container.classList.remove("right-panel-active");
    }

    handleSignUpFormSubmit(event) {
        event.preventDefault();

        if (this.validateSignUpForm()) {
            // Handle successful form submission
            this.showSuccessMessage("Sign Up form is validated.");
        }
    }

    handleSignInFormSubmit(event) {
        event.preventDefault();

        if (this.validateSignInForm()) {
            // Handle successful form submission
            this.showSuccessMessage("Sign In form is validated.");
        }
    }

    validateSignUpForm() {
        let isValid = true;

        // Validate name
        isValid = this.formValidate(this.nameInput, "Name cannot be blank or should consist of alphabets only");

        // Validate email
        isValid = this.formValidate(this.emailInputSignUp, "Email cannot be blank or should have the correct format") && isValid;

        // Validate password
        isValid = this.formValidate(this.passwordInputSignUp, "Password cannot be blank or should be at least 8 characters long") && isValid;

        // Match passwords
        isValid = this.matchPassword("Passwords do not match") && isValid;

        return isValid;
    }

    validateSignInForm() {
        let isValid = true;

        // Validate email
        isValid = this.formValidate(this.emailInputSignIn, "Email cannot be blank or should have the correct format");

        // Validate password
        isValid = this.formValidate(this.passwordInputSignIn, "Password cannot be blank or should be at least 8 characters long") && isValid;

        return isValid;
    }

    formValidate(input, message) {
        if (input.value.trim() === "") {
            this.showErrorMessage(input, message);
            return false;
        } else if (!this.regEx(input)) {
            this.showErrorMessage(input, message);
            return false;
        } else {
            this.clearErrorMessage(input);
            return true;
        }
    }

    matchPassword(message) {
        if (this.passwordInputSignUp.value !== this.confirmPasswordInput.value) {
            this.showErrorMessage(this.confirmPasswordInput, message);
            return false;
        } else if (this.confirmPasswordInput.value === "") {
            this.showErrorMessage(this.confirmPasswordInput, message);
            return false;
        } else {
            this.clearErrorMessage(this.confirmPasswordInput);
            return true;
        }
    }

    handleInputValidation(input) {
        if (input.value.trim() !== '') {
            input.classList.add('valid');
        } else {
            input.classList.remove('valid');
        }
    }

    regEx(input) {
        let regExName = /^[A-Za-z]+$/;
        let regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        let regExPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

        if (input.value.match(regExPassword)) {
            return true;
        } else if (input.value.match(regExEmail)) {
            return true;
        } else if (input.value.match(regExName)) {
            return true;
        } else {
            return false;
        }
    }

    showErrorMessage(input, message) {
        const errorMsgElement = input.nextElementSibling;
        errorMsgElement.innerHTML = message;
        input.style.backgroundColor = "#FF4364";
    }

    clearErrorMessage(input) {
        const errorMsgElement = input.nextElementSibling;
        errorMsgElement.innerHTML = "";
        input.style.backgroundColor = "";
    }

    showSuccessMessage(message) {
        // Replace with logic to display success message on the page
        alert(message);
    }
}
