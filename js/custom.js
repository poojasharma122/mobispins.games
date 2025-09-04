function openNav() {
    document.getElementById("mySidenavs").classList.add("open");
    document.getElementById("menuOverlay").classList.add("active");
}

function closeNav() {
    document.getElementById("mySidenavs").classList.remove("open");
    document.getElementById("menuOverlay").classList.remove("active");
}

//  header sticky js start  
const header = document.querySelector("header");
const toggleClass = "is-sticky";

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 40) {
        header.classList.add(toggleClass);
    } else {
        header.classList.remove(toggleClass);
    }
});
//  header sticky js end

// Form Validation Functions
function validateField(field, showMessage = false) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing validation classes
    field.classList.remove('is-valid', 'is-invalid');

    // Check if field is required and empty
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }
    // Check email format
    else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    // Check minimum length
    else if (field.hasAttribute('minlength') && value) {
        const minLength = parseInt(field.getAttribute('minlength'));
        if (value.length < minLength) {
            isValid = false;
            errorMessage = `This field must be at least ${minLength} characters long.`;
        }
    }
    // Check password strength for registration
    else if (field.id === 'regPassword' && value) {
        if (value.length < 8) {
            isValid = false;
            errorMessage = 'Password must be at least 8 characters long.';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            isValid = false;
            errorMessage = 'Password must contain at least one uppercase letter, one lowercase letter, and one number.';
        }
    }

    // Apply validation classes and show error message only if showMessage is true
    if (isValid) {
        field.classList.add('is-valid');
        const feedbackElement = field.parentNode.querySelector('.invalid-feedback');
        if (feedbackElement) {
            feedbackElement.classList.remove('show');
        }
    } else {
        field.classList.add('is-invalid');
        const feedbackElement = field.parentNode.querySelector('.invalid-feedback');
        if (feedbackElement) {
            feedbackElement.textContent = errorMessage;
            if (showMessage) {
                feedbackElement.classList.add('show');
            } else {
                feedbackElement.classList.remove('show');
            }
        }
    }

    return isValid;
}

function validateForm(form) {
    const fields = form.querySelectorAll('input[required], textarea[required]');
    let isFormValid = true;

    fields.forEach(field => {
        if (!validateField(field, true)) { // Show messages on form submit
            isFormValid = false;
        }
    });

    return isFormValid;
}

function setupFormValidation() {
    // Login Form Validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Form is valid - you can add your login logic here
                alert('Login form is valid! (This is a demo - no actual login will occur)');
                // Reset form
                this.reset();
                this.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
                    field.classList.remove('is-valid', 'is-invalid');
                });
            }
        });

        // Real-time validation on input
        loginForm.querySelectorAll('input').forEach(input => {
            let hasInteracted = false;
            
            input.addEventListener('blur', function() {
                hasInteracted = true;
                validateField(this, hasInteracted);
            });
            input.addEventListener('input', function() {
                if (hasInteracted && this.classList.contains('is-invalid')) {
                    validateField(this, hasInteracted);
                }
            });
        });
    }

    // Registration Form Validation
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Form is valid - you can add your registration logic here
                alert('Registration form is valid! (This is a demo - no actual registration will occur)');
                // Reset form
                this.reset();
                this.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
                    field.classList.remove('is-valid', 'is-invalid');
                });
            }
        });

        // Real-time validation on input
        registerForm.querySelectorAll('input').forEach(input => {
            let hasInteracted = false;
            
            input.addEventListener('blur', function() {
                hasInteracted = true;
                validateField(this, hasInteracted);
            });
            input.addEventListener('input', function() {
                if (hasInteracted && this.classList.contains('is-invalid')) {
                    validateField(this, hasInteracted);
                }
            });
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Form is valid - you can add your contact form logic here
                alert('Contact form is valid! (This is a demo - no actual message will be sent)');
                // Reset form
                this.reset();
                this.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
                    field.classList.remove('is-valid', 'is-invalid');
                });
            }
        });

        // Real-time validation on input
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            let hasInteracted = false;
            
            field.addEventListener('blur', function() {
                hasInteracted = true;
                validateField(this, hasInteracted);
            });
            field.addEventListener('input', function() {
                if (hasInteracted && this.classList.contains('is-invalid')) {
                    validateField(this, hasInteracted);
                }
            });
        });
    }
}

// Infinite Typing Effect Function
function infiniteTypeWriter(element, text, speed = 100, pauseTime = 2000) {
    let i = 0;
    let isDeleting = false;
    let currentText = '';
    
    function type() {
        if (!isDeleting && i < text.length) {
            // Typing forward
            currentText += text.charAt(i);
            i++;
        } else if (isDeleting && currentText.length > 0) {
            // Deleting backward
            currentText = currentText.slice(0, -1);
            i--;
        } else if (!isDeleting && i >= text.length) {
            // Finished typing, pause then start deleting
            setTimeout(() => {
                isDeleting = true;
                type();
            }, pauseTime);
            return;
        } else if (isDeleting && currentText.length === 0) {
            // Finished deleting, pause then start typing again
            isDeleting = false;
            i = 0;
            setTimeout(() => {
                type();
            }, pauseTime / 2);
            return;
        }
        
        element.innerHTML = currentText;
        
        // Adjust speed - slower when deleting
        const currentSpeed = isDeleting ? speed / 2 : speed;
        setTimeout(type, currentSpeed);
    }
    
    type();
}

// Initialize infinite typing effect when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation();
    
    // Start infinite typing effect after a short delay
    setTimeout(function() {
        const typingElement = document.getElementById('typing-text');
        if (typingElement) {
            const originalText = typingElement.textContent;
            infiniteTypeWriter(typingElement, originalText, 150, 3000);
        }
    }, 1000); // Start after 1 second delay
});