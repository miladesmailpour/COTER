document.querySelectorAll('.comment-dropdown-btn').forEach((button) => {
    button.addEventListener('click', async (event) => {
      const tweetId = event.target.closest('#cote').dataset.id;
      const dropdownMenu = event.target.nextElementSibling;
  
      if (dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
      } else {
        // Fetch comments for the tweetId
        const response = await fetch('/api/comments');
        if (response.ok) {
          const comments = await response.json();
          renderComments(comments, dropdownMenu);
          dropdownMenu.classList.add('show');
        } else {
          alert('Failed to fetch comments');
        }
      }
    });
  });
  
  function renderComments(comments, dropdownMenu) {
    dropdownMenu.innerHTML = '';
    comments.forEach((comment) => {
      const commentElement = document.createElement('div');
      commentElement.classList.add('dropdown-item');
      commentElement.textContent = comment.comment_text;
      dropdownMenu.appendChild(commentElement);
    });
  }
  