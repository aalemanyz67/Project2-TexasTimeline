const logout = async () => {
  try {
    const response = await fetch('/api/user/logout', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('Logout response:', response); // Check the response from the server

    if (response.ok) {
      console.log('Logout successful, redirecting...');
      document.location.replace('/login');
    } else {
      alert('Failed to log out.');
    }
  } catch (error) {
    console.error('Logout failed with error:', error);
    alert('Failed to log out.');
  }
};

document.addEventListener('DOMContentLoaded', (event) => {
  const logoutButton = document.querySelector('#logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', logout);
    console.log('Logout event bound to button'); // Confirm event binding
  } else {
    console.error('Logout button not found'); // If the button isn't found
  }
});
