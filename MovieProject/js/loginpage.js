
// Get references to the sign-up and sign-in buttons
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');

// Get reference to the forms
const signUpForm = document.forms["sign-up-form"];
const signInForm = document.forms["sign-in-form"];

// Add event listener for sign-up button
signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

// Add event listener for sign-in button
signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

// Add event listener for sign-up form submission
signUpForm.addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();
  
  // Retrieve form data
  const formData = {
    name: signUpForm["sign-up-name"].value,
    email: signUpForm["sign-up-email"].value,
    password: signUpForm["sign-up-passwd"].value
  };

  // Log the form data to the console
});

// Add event listener for sign-in form submission
signInForm.addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();
  
  // Retrieve form data
  const formData = {
    email: signInForm["sign-in-email"].value,
    password: signInForm["sign-in-passwd"].value
  };

  // Log the form data to the console
});
