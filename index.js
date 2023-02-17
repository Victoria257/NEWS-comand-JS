

const API_KEY_S = '2Q5D7fvynyshAi0a8Zmy3AdyyqPFqoa6';
const API_KEY_P ='VYHuklirnHOoGLBMe1pMZhn6akzpgva6'

const input = document.querySelector("input");
const form = document.querySelector("form");
const listNews =document.querySelector(".list-news")

function firstPage() {
 axios.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY_P}`)
     .then(response => {
        markUpNewsPopular(response.data.results)
        }).catch(error => console.log("error"));
}
firstPage() 

function markUpNewsPopular(arr) {
    console.log(arr);
    const markUp = arr.map(({ url, media, title, abstract, published_date }) => {
        let dateUser = new Date(published_date)
        let date = dateUser.toLocaleDateString()
        const imagePopular = `media[0]['media-metadata'][2].url`
        console.log(imagePopular);
        console.log(media[0]['media-metadata'][2].url);
  
        // if (urlToImage === null) {
        //     urlToImage = "https://timenews.in.ua/wp-content/uploads/2017/07/News.jpg"
        //     // "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_01/2705191/nbc-social-default.png" - заглушка для фото
        // }
        return `<div class="set">
                <div class="thumb">
                <img class="img-news" src="${imagePopular}" alt="" width="288"
                onerror= src="https://timenews.in.ua/wp-content/uploads/2017/07/News.jpg">
                </div>
                
                <h2 class="title">${title}</h2>
                <p class="text">${abstract}</p>
                <div class="wrapper">
                <p class="date">${date}</p>
                <a href="${url}" class="read" target="_blank" rel="noreferrer noopener">Read more</a>
                </div>
            </div>  `
    }).join("");
 
    listNews.insertAdjacentHTML("beforeend", markUp);
}

// form.addEventListener("submit", searchNewsfromApi)

// function searchNewsfromApi(event) {
    
//     event.preventDefault();

//     const name = input.value;
//     console.log(name);
//     const date = "2023-02-16";
//     axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${name}&api-key=${API_KEY_S}&begin_date=${date}&end_date=${date}`)
//         .then(response => {
//             markUpNews(response.data.response.docs)
//         })
// }

// function markUpNews(arr) {
//     console.log(arr);
//     const markUp = arr.map(({ web_url, multimedia, headline, abstract, pub_date }) => {
//         let dateUser = new Date(pub_date)
//         let date = dateUser.toLocaleDateString()
//       console.log(multimedia);
//         let photo = multimedia.length!==0 ? `https://static01.nyt.com/${multimedia[0].url}` : "https://timenews.in.ua/wp-content/uploads/2017/07/News.jpg";
        
//         console.log(photo);
//         // if (urlToImage === null) {
//         //     urlToImage = "https://timenews.in.ua/wp-content/uploads/2017/07/News.jpg"
//         //     // "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_01/2705191/nbc-social-default.png" - заглушка для фото
//         // }
//         return `<div class="set">
//                 <div class="thumb">
//                 <img class="img-news" src="${photo}" alt="" width="288"
//                 onerror= src="https://timenews.in.ua/wp-content/uploads/2017/07/News.jpg">
//                 </div>
                
//                 <h2 class="title">${headline.main}</h2>
//                 <p class="text">${abstract}</p>
//                 <div class="wrapper">
//                 <p class="date">${date}</p>
//                 <a href="${web_url}" class="read" target="_blank" rel="noreferrer noopener">Read more</a>
//                 </div>
//             </div>  `
//     }).join("");
//     listNews.innerHTML=`<div class="weather">Weather</div>`
//     listNews.insertAdjacentHTML("beforeend", markUp);
// }
