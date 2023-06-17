// const newsLink=document.querySelector('#news-link');
// const newsImg=document.querySelector('#news-img');
// const newsTitle=document.querySelector('#news-title');
const body = document.body;
const news=document.querySelector('#news');
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
            for(let i=0;i<data.articles.length;i++){
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
  newsApi();