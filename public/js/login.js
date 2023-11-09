async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const loginFormHandler = async (event) => {
  console.log("loginFormHandler");

  event.preventDefault();

  const username = document.querySelector('#user-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        await sleep(1000);
        console.log('Redirecting to home page');
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    } catch (error) {
      alert('An error occurred during login.');
      console.error('Login error:', error);
    }
  }
};
 
const signupFormHandler = (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const is_admin = false;

  if (username && password) {
    fetch('/api/user/', {
      method: 'POST',
      body: JSON.stringify({ username, password, is_admin }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => {
      if (response.ok) {
        console.log('Redirecting to home page');
        document.location.replace('/');
      } else {
        throw new Error('Signup was not successful.');
      }
    })
    .catch((error) => {
      alert('Failed to sign up. Please try again.');
      console.error('Signup error:', error);
    });
  }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

