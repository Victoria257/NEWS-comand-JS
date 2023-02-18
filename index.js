

const API_KEY_S = '2Q5D7fvynyshAi0a8Zmy3AdyyqPFqoa6';
const API_KEY_P ='VYHuklirnHOoGLBMe1pMZhn6akzpgva6'

const input = document.querySelector("input");
const form = document.querySelector("form");
const listNews = document.querySelector(".list-news")

form.addEventListener("submit", searchNewsfromApi)

popularNews() 

function popularNews() {
 axios.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY_P}`)
     .then(response => {
        markUpNewsPopular(response.data.results)
        }).catch(error => console.log("error"));
}


function markUpNewsPopular(arr) {
    // console.log(arr);
    if (window.matchMedia("(max-width: 320px)").matches) {
       arr=arr.slice(0,4)
        console.log("(max-width: 320px)");
        markUp ()
    } else if(window.matchMedia("(min-width: 321px) and (max-width: 1279px)").matches) {
        arr=arr.slice(0,7)
        markUp ()     
    } else {
       arr=arr.slice(0,8)
    }
    
    function markUp() {
        const array= arr.map(({ url, media, title, abstract, published_date }, index) => {
            let dateUser = new Date(published_date)
            let date = dateUser.toLocaleDateString()
            // .replace('/', '')
            let photo = media.length !== 0 ? media[0]['media-metadata'][2].url : "https://timenews.in.ua/wp-content/uploads/2017/07/News.jpg";
            return markUpPage(photo, title, abstract, date, url, index)

        }).join("");
        return array
    }
        listNews.innerHTML = `<div class="weather">Weather</div>`
        listNews.insertAdjacentHTML("beforeend", markUp());
    
}


function searchNewsfromApi(event) {
    
    event.preventDefault();

    const name = input.value;
    console.log(name);
    const date = "2023-02-16";
    axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${name}&api-key=${API_KEY_S}&begin_date=${date}&end_date=${date}`)
        .then(response => {
            const arr = response.data.response.docs;
            if (arr.length === 0 ) {
            listNews.innerHTML=`<div>
            <p class="text-error">We haven’t found news from this category</p>
            <img class="img-error" src="./img/image-error-1x.png" alt="Image for error">
            </div>`
            } else markUpSearchNews(arr)
        })
}


function markUpSearchNews(arr) {

    const markUp = arr.map(({ web_url, multimedia, headline, abstract, pub_date }, index) => {
        let dateUser = new Date(pub_date)
        let date = dateUser.toLocaleDateString()
        let photo = multimedia.length!==0 ? `https://static01.nyt.com/${multimedia[0].url}` : "https://timenews.in.ua/wp-content/uploads/2017/07/News.jpg";     
        // if (urlToImage === null) {
        //     urlToImage = "https://timenews.in.ua/wp-content/uploads/2017/07/News.jpg"
        //     // "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_01/2705191/nbc-social-default.png" - заглушка для фото
        // }
        return markUpPage (photo, headline.main, abstract, date, web_url,index)
        
    }).join("");
    listNews.innerHTML=`<div class="weather">Weather</div>`
    listNews.insertAdjacentHTML("beforeend", markUp);
}


function markUpPage(photo, title, abstract, date, url, index) {
    return `<div class="set">
                <div class="overlay"></div>
                <div class="thumb">
                <img class="img-news" src="${photo}" alt="" width="288"
                onerror= src="https://timenews.in.ua/wp-content/uploads/2017/07/News.jpg">
                <button class="name-category">Тут буде категорія</button >
                <button class="already-read-button">Already read</button >
                <button class="button-add" data-id=${index}>Add to favorite</button>
                </div>
                <h2 class="title">${title}</h2>
                <p class="text">${abstract}</p>
                <div class="wrapper">
                <p class="date">${date}</p>
                <a href="${url}" class="read" target="_blank" rel="noreferrer noopener">Read more</a>
                </div>
            </div>  `
}