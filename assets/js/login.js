class LoginForm {
    constructor(userData) {
        this.container = document.getElementById('container');
        this.signUpButton = document.getElementById('signUp');
        this.signInButton = document.getElementById('signIn');
        this.overlaySignUp = document.getElementById('overlaySignUp')
        this.overlaySignIn = document.getElementById('overlaySignIn')
        this.initForms();

        // Assign userData to the instance variable
        this.userData = userData;
    }

    initForms() {
        // Initialize form elements and event listeners
        this.nameInput = document.getElementById("name");
        this.emailInputSignUp = document.getElementById("email-sign-up");
        this.passwordInputSignUp = document.getElementById("password-sign-up");
        this.confirmPasswordInput = document.getElementById("confirm-password-sign-up");
        this.emailInputSignIn = document.getElementById("email-sign-in");
        this.passwordInputSignIn = document.getElementById("password-sign-in");

        // Event listeners for input fields in the sign-up form
        this.nameInput.addEventListener('input', () => this.handleInputValidation(this.nameInput));
        this.emailInputSignUp.addEventListener('input', () => this.handleInputValidation(this.emailInputSignUp));
        this.passwordInputSignUp.addEventListener('input', () => this.handleInputValidation(this.passwordInputSignUp));
        this.confirmPasswordInput.addEventListener('input', () => this.handleInputValidation(this.confirmPasswordInput));

        // Event listeners for input fields in the sign-in form
        this.emailInputSignIn.addEventListener('input', () => this.handleInputValidation(this.emailInputSignIn));
        this.passwordInputSignIn.addEventListener('input', () => this.handleInputValidation(this.passwordInputSignIn));

        // Event listener for image preview
        document.getElementById("image-upload").addEventListener('change', this.previewImage.bind(this));
    }

    initialize() {
        this.signUpButton.addEventListener('click', (e) => this.handleSignUpButtonClick(e));
        this.signInButton.addEventListener('click', (e) => this.handleSignInButtonClick(e));

        // Initialize other elements and event listeners
        this.overlaySignUp.addEventListener('click', () => this.showSignUpPanel());
        this.overlaySignIn.addEventListener('click', () => this.showSignInPanel());
    }


    showSignUpPanel() {
        this.container.classList.add("right-panel-active");
    }

    showSignInPanel() {
        this.container.classList.remove("right-panel-active");
    }

    handleSignUpButtonClick(e) {
        e.preventDefault()
        if (this.validateSignUpForm()) {
            this.register();
        }
    }

    handleSignInButtonClick(e) {
        e.preventDefault()
        if (this.validateSignInForm()) {
            this.signIn();
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
        isValid = this.formValidate(this.passwordInputSignIn, "Password cannot be blank or should min 8 letter password, with at least a symbol, upper and lower case letters and a number") && isValid;

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
        let regExPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

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
    }

    clearErrorMessage(input) {
        const errorMsgElement = input.nextElementSibling;
        errorMsgElement.innerHTML = "";
        input.style.backgroundColor = "";
    }

    showSuccessMessage(message) {
        // Create a success message element
        const successMessageElement = document.createElement('div');
        successMessageElement.className = 'success-message';
        successMessageElement.innerHTML = message;

        // Append the success message element to the container
        this.container.appendChild(successMessageElement);

        // Clear the success message after a delay (e.g., 3000 milliseconds)
        setTimeout(() => {
            this.container.removeChild(successMessageElement);
        }, 3000);
    }

    previewImage() {
        const preview = document.getElementById("image-preview");
        const fileInput = document.getElementById("image-upload");
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                preview.src = e.target.result;
                preview.style.display = "block";
            };

            reader.readAsDataURL(file);
        } else {
            preview.src = "#";
            preview.style.display = "none";
        }
    }

    resetForm() {
        // Reset sign-up form fields
        this.nameInput.value = '';
        this.emailInputSignUp.value = '';
        this.passwordInputSignUp.value = '';
        this.confirmPasswordInput.value = '';

        // Reset sign-in form fields
        this.emailInputSignIn.value = '';
        this.passwordInputSignIn.value = '';

        // Clear any error messages
        document.querySelector(".error-sign-up").innerText = "";
        document.querySelector(".error-sign-in").innerText = "";

        // Clear image preview
        document.getElementById("image-preview").src = "#";
        document.getElementById("image-upload").value = "";
    }


    signIn() {
        const username = document.getElementById("email-sign-in").value;
        const password = document.getElementById("password-sign-in").value;

        // 
        // Check if the user exists in the fetched JSON data
        let userFromData = this.userData.find(u => u.email === username && u.password === password);

        // Check if the user exists in local storage
        let userFromLocalStorage = JSON.parse(localStorage.getItem('users'))?.find(u => u.email === username && u.password === password);

        if (userFromData || userFromLocalStorage) {
            // Use the user from the fetched JSON data if available, otherwise use the one from local storage
            let user = userFromData || userFromLocalStorage;

            // Store the user data in localStorage
            localStorage.setItem("user", JSON.stringify(user));

            // Send a message to the parent window
            window.parent.postMessage({ type: "userLoggedIn", user }, "*");

            // Reset the form after successful sign-in
            this.resetForm();

        } else {
            document.querySelector(".error-sign-in").innerText = "User not found. Please sign up.";
        }
    }

    register() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email-sign-up").value;
        const password = document.getElementById("password-sign-up").value;
        const confirmPassword = document.getElementById("confirm-password-sign-up").value;

        // Clear existing error messages
        document.querySelector(".error-sign-up").innerText = "";

        if (password !== confirmPassword) {
            document.querySelector(".error-sign-up").innerText = "Passwords do not match.";
            return;
        }

        // Check if the email is already taken in the fetched JSON data
        if (this.userData.some(u => u.email === email)) {
            document.querySelector(".error-sign-up").innerText = "Email already exists. Please choose another.";
        }
        else {
            const fileInput = document.getElementById("image-upload");
            const file = fileInput.files[0];

            if (file) {
                const imagePath = `/assets/images/${file.name}`;

                // Save the data URL as a link in the project directory
                const preview = document.getElementById("image-preview");
                const a = document.createElement('a');
                a.href = preview.src;
                a.download = imagePath;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                const newUser = { "name": name, "email": email, "password": password, "image": imagePath };
                // Save new user to local storage
                const localStorageUsers = JSON.parse(localStorage.getItem('users')) || [];
                localStorageUsers.push(newUser);
                localStorage.setItem('users', JSON.stringify(localStorageUsers));
                console.log('Data in Local Storage:', localStorageUsers[localStorageUsers.length - 1]);

                // Send a message to the parent window
                window.parent.postMessage({ type: "userRegistered", user: newUser }, "*");

                // Reset the form after successful registration
                this.resetForm();
            } else {
                this.showErrorMessage(fileInput, "Please upload an image.");
            }
        }
    }

}

document.addEventListener('DOMContentLoaded', function () {
    let userData; // Declare userData variable
    // Fetch USER DATA
    fetch('/assets/json/user.json')
        .then(response => response.json())
        .then(data => {
            userData = data; // Assign fetched data to userData

            // Instantiate LoginForm with userData
            const loginForm = new LoginForm(userData);
            loginForm.initForms();
            loginForm.initialize();
        })
        .catch(error => console.error('Error fetching JSON:', error));
});
