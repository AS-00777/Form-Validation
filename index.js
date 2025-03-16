// Add event listener to the Register button (onclick)
document.getElementById("registerButton").addEventListener("click", function() {
    validateForm();  // Call the validation function when Register is clicked
});

// Add real-time validation using onChange event for each input
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("change", function() {
        validateField(input); // Validate individual field when user changes input
    });
});

// Validate the whole form (this will be triggered on submit)
function validateForm() {
    let isValid = true;

    // Define validation rules for required fields
    const fields = [
        { id: "fullName", minLength: 5, errorId: "nameError", errorMsg: "Name must be at least 5 characters long." },
        { id: "email", pattern: /.+@.+\..+/, errorId: "emailError", errorMsg: "Enter a valid email." },
        { id: "phone", pattern: /^\d{10}$/, errorId: "phoneError", errorMsg: "Enter a valid 10-digit phone number." }
    ];

    // Loop through each field and validate
    fields.forEach(field => {
        let value = document.getElementById(field.id).value.trim();
        if (field.minLength && value.length < field.minLength) {
            setError(field.errorId, field.errorMsg);
            isValid = false;
        } else if (field.pattern && !field.pattern.test(value)) {
            setError(field.errorId, field.errorMsg);
            isValid = false;
        } else {
            clearError(field.errorId);
        }
    });

    // Password validation
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();
    let fullName = document.getElementById("fullName").value.trim();

    if (password.length < 8 || password.toLowerCase() === "password" || password.toLowerCase() === fullName.toLowerCase()) {
        setError("passwordError", "Password must be at least 8 characters and should not be 'password' or your name.");
        isValid = false;
    } else {
        clearError("passwordError");
    }

    if (confirmPassword !== password) {
        setError("confirmPasswordError", "Passwords do not match.");
        isValid = false;
    } else {
        clearError("confirmPasswordError");
    }

    // If validation passes, show success message
    if (isValid) {
        alert("Form submitted successfully!");
        document.getElementById("registrationForm").reset(); // Reset form after success
    }
}

// Helper functions to set and clear error messages
function setError(id, message) {
    document.getElementById(id).innerText = message;
}

function clearError(id) {
    document.getElementById(id).innerText = "";
}

// Individual field validation (onChange event handler)
function validateField(input) {
    const fieldId = input.id;
    let errorId = `${fieldId}Error`;
    let value = input.value.trim();
    let isValid = true;

    if (fieldId === "fullName" && value.length < 5) {
        setError(errorId, "Name must be at least 5 characters long.");
        isValid = false;
    } else if (fieldId === "email" && !/.+@.+\..+/.test(value)) {
        setError(errorId, "Enter a valid email.");
        isValid = false;
    } else if (fieldId === "phone" && (!/^\d{10}$/.test(value) || value === "123456789")) {
        setError(errorId, "Enter a valid 10-digit phone number.");
        isValid = false;
    } else if (fieldId === "password" && (value.length < 8 || value.toLowerCase() === "password" || value.toLowerCase() === document.getElementById("fullName").value.trim().toLowerCase())) {
        setError(errorId, "Password must be at least 8 characters and should not be 'password' or your name.");
        isValid = false;
    } else if (fieldId === "confirmPassword" && value !== document.getElementById("password").value.trim()) {
        setError(errorId, "Passwords do not match.");
        isValid = false;
    } else {
        clearError(errorId);
    }
}
