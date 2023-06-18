const coteExtend=document.querySelectorAll('.cote-extend');
const btnExtends=document.querySelectorAll('.btn-extend');
const saveComment=document.querySelector('#save-comment');
const userComment=document.querySelector('#user-comment');
const body = document.body;
const news=document.querySelector('#news');
const likeButtons = document.querySelectorAll('.like-btn');


likeButtons.forEach(button => {
  button.addEventListener('click', async (event) => {
    const coteId = event.target.getAttribute('data-id');
    const response = await fetch(`/api/tweets/${coteId}/like`, {
      method: 'POST',
    });
    if (response.ok) {
      // Update the like count on the button
      const likeCountElement = button.nextElementSibling;
      const currentLikeCount = parseInt(likeCountElement.textContent);
      likeCountElement.textContent = currentLikeCount + 1;
    } else {
      alert('Failed to like the Cote');
    }
  });
});

async function newsApi() {
    const url = 'https://newsapi.org/v2/top-headlines?' +
                'country=us&' +
                'apiKey=a93d9d3ab51c4dcca78a2a97e0703167';

    var req = new Request(url);

    var req = new Request(url);
    fetch(req)
        .then(function(response) {
            if (response.ok) {
                return response.json()
            } else {
              alert(response.statusText);
              return
            }            
        })
        .then((data)=>{
            // console.log(data.articles)
            for(let i=0;i<7;i++){
                const newsLink = document.createElement('a');
                const newsImg = document.createElement('img');
                const newsTitle = document.createElement('p');
                newsLink.href = data.articles[i].url
                newsImg.src = data.articles[i].urlToImage
                newsTitle.textContent = data.articles[i].title
                newsLink.setAttribute("style", "text-decoration: none; color: var(--E);");
                newsImg.setAttribute("style", "height: 200px; width: 200px; border-radius: 5px; margin: 5px;");
                news.setAttribute("style", "font-size: 1.0rem;");

                newsLink.appendChild(newsImg);
                newsLink.appendChild(newsTitle);
                news.appendChild(newsLink);
            }
        }) 
        .catch(e=>console.log(e));
  
  }

// const btnExtendHandler = async (event) => {
btnExtends.forEach(btn=>{
    btn.addEventListener('click', async(event)=>{
        const btnId = event.target.getAttribute('data-id')
        console.log(btnId)
        coteExtend.forEach(ex=>{
            const exId = ex.getAttribute('id')
            if(btnId === exId){
                const display = ex.style.display;
                if(!display){
                    ex.setAttribute("style", "display: block;");
                } 
                if(display == 'none'){
                    ex.setAttribute("style", "display: block;");
                } 
                if(display === 'block') {
                    ex.setAttribute("style", "display: none;");
                }
            }
        })
    })
})


const saveCommentHandler = async (event) => {
    event.preventDefault();
    const comment_text = userComment.value.trim();
    const tweet_id = event.target.parentNode.parentNode.getAttribute('data-id');
    // console.log(event.target.parentNode.parentNode.getAttribute('data-id'));

    if(comment_text){
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment_text, tweet_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Comment Not saved, try again');
        }
    }
};


// btnExtend.addEventListener('click', btnExtendHandler);
saveComment.addEventListener('click', saveCommentHandler);

newsApi();