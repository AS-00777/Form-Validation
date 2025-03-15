document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    validateForm();
});

// Add real-time validation using onChange event
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("change", validateForm);
});

function validateForm() {
    let isValid = true;

    // Define validation rules
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
