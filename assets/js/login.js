//target all our classes and id from the HTML

let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);


//store the classes and id inside these variables
let firstName = id("first-name"),
    lastName = id("last-name"),
    email = id("email"),
    password = id("password"),
    confirmPassword = id("confirm-password"),
    form = id("form"),

    errorMsg = classes("error"),
    successIcon = classes("success-icon"),
    failureIcon = classes("failure-icon");


//target our form and add the submit event listener
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validateForm()) {
        // Get form values
        const formData = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
        };

        // Store the form data in localStorage
        localStorage.setItem("formData", JSON.stringify(formData));


        // Form is successfully validated
        alert("Success! Form is validated.");

        // Redirect to "output.html" after the alert is dismissed

        setTimeout(function () {
            window.location.href = "./assets/output.html";
        }, 1000); // Delay the redirect for 1 second (adjust as needed)
    }
});

// function to validate the entire form
function validateForm() {
    let isValid = true;

    // Validate each form field using formValidate function
    if(!formValidate(firstName, 0, "First Name cannot be blank or should consist alphabet only")){
        isValid=false;
    }
    if(!formValidate(lastName, 1, "Last Name cannot be blank or should consist alphabet only")){
        isValid=false;
    }
    if(!formValidate(email, 2, "Email cannot be blank or should have the correct format")){
        isValid=false;
    }
    if(!formValidate(password, 3, "Password cannot be blank or should be at least 8 characters long")){
        isValid=false;
    }

    // Check for password match
    if (!matchPassword(4, "Password isn't the same")) {
        isValid = false;
    }

    return isValid;
}


// The function to validate each input field
function formValidate(id, serial, message) {
    if (id.value.trim() === "") {
        errorMsg[serial].innerHTML = message;
        id.style.backgroundColor = "#336087";

        // icons
        failureIcon[serial].style.opacity = "1";
        successIcon[serial].style.opacity = "0";
        return false;

    } else if (!regEx(id)) {
        errorMsg[serial].innerHTML = message;
        id.style.backgroundColor = "#336087";

        // icons
        failureIcon[serial].style.opacity = "1";
        successIcon[serial].style.opacity = "0";
        return false;

    } else {
        errorMsg[serial].innerHTML = "";

        // icons
        failureIcon[serial].style.opacity = "0";
        successIcon[serial].style.opacity = "1";
        return true;
    }
}

// The function to check if passwords match
function matchPassword(serial, message) {
    if (password.value !== confirmPassword.value) {
        errorMsg[serial].innerHTML = message;
        confirmPassword.style.backgroundColor = "#336087";

        // icons
        failureIcon[serial].style.opacity = "1";
        successIcon[serial].style.opacity = "0";
        return false;
    } else if (confirmPassword.value === "") {
        errorMsg[serial].innerHTML = message;
        confirmPassword.style.backgroundColor = "#336087";

        // icons
        failureIcon[serial].style.opacity = "1";
        successIcon[serial].style.opacity = "0";
        return false;
    } else {
        errorMsg[serial].innerHTML = "";

        // icons
        failureIcon[serial].style.opacity = "0";
        successIcon[serial].style.opacity = "1";
        return true;
    }
}


function regEx(id) {
    let regExName = /^[A-Za-z]+$/;
    let regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let regExPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    if (id.value.match(regExPassword)) {
        return true;
    }
    else if (id.value.match(regExEmail)) {
        return true;
    }
    else if (id.value.match(regExName)) {
        return true;
    }
    else { return false }
}

// INPUT FIELD TRANSITION
const inputs = document.querySelectorAll('.inputbox input');

// Loop through each input
inputs.forEach(input => {

  // Add event listener for input
  input.addEventListener('input', () => {

    // Check if input has value
    if(input.value.trim() !== '') {

      // If has value, add valid style
      input.classList.add('valid');
      input.nextElementSibling.classList.add('moved-label');

    } else {
    
      // If empty, remove valid style
      input.classList.remove('valid');
      input.nextElementSibling.classList.remove('moved-label');
    }
  });

});