const newFormHandler = async (event) => {
    event.preventDefault();


    const cote = document.querySelector('#cote-descr').value.trim();

    if (cote) {
        const response = await fetch(`/api/tweets`, {
            method: 'POST',
            body: JSON.stringify({ cote }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create project');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/tweets/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete project');
        }
    }
};

document
    .querySelector('.new-cote-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.cote-list')
    .addEventListener('click', delButtonHandler);
=======
  
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