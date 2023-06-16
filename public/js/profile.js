const newFormHandler = async (event) => {
    event.preventDefault();
  
    const user_name = document.querySelector('#user-name').value.trim();
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
  
    if (user_name && name && email) {
      const response = await fetch(`/api/user`, {
        method: 'GET',
        body: JSON.stringify({ user_name, name, email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create profile');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/user/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('profile');
      } else {
        alert('Failed to delete profile');
      }
    }
  };
  
  document
    .querySelector('.new-profile')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.profile')
    .addEventListener('click', delButtonHandler);
  