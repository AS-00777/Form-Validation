document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    validateForm();
});

function validateForm() {
    let isValid = true;

    // Get form values
    let fullName = document.getElementById("fullName").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Name validation
    if (fullName.length < 5) {
        setError("nameError", "Name must be at least 5 characters long.");
        isValid = false;
    } else {
        clearError("nameError");
    }

    // Email validation
    if (!email.includes("@")) {
        setError("emailError", "Enter a valid email.");
        isValid = false;
    } else {
        clearError("emailError");
    }

    // Phone validation
    if (phone.length !== 10 || phone === "1234567890" || isNaN(phone)) {
        setError("phoneError", "Enter a valid 10-digit phone number.");
        isValid = false;
    } else {
        clearError("phoneError");
    }

    // Password validation
    if (password.length < 8 || password.toLowerCase() === "password" || password.toLowerCase() === fullName.toLowerCase()) {
        setError("passwordError", "Password must be at least 8 characters and should not be 'password' or your name.");
        isValid = false;
    } else {
        clearError("passwordError");
    }

    // Confirm password validation
    if (confirmPassword !== password) {
        setError("confirmPasswordError", "Passwords do not match.");
        isValid = false;
    } else {
        clearError("confirmPasswordError");
    }

    // If all validations pass
    if (isValid) {
        alert("Form submitted successfully!");
        document.getElementById("registrationForm").reset();
    }
}

// Helper functions to set and clear error messages
function setError(id, message) {
    document.getElementById(id).innerText = message;
}

function clearError(id) {
    document.getElementById(id).innerText = "";
}
