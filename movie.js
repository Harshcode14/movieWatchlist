 let savedMovies=JSON.parse(localStorage.getItem('movieWatchlistArray'))|| []
const modal=document.getElementById("modal-message")
const searchBar=document.getElementById("movie-name")
const exploreEl=document.getElementById("explore")
const searchFail=document.getElementById("search-fail")
const movieCard=document.getElementById("movies")

console.log("running")
document.getElementById("searchMovie").addEventListener("click",function(){
     console.log("running")
    if(searchBar.value)    
    {renderMovies(searchBar.value)
       exploreEl.classList.add("none")
    }
}
)

function renderMovies(name){
    movieCard.innerHTML=""
fetch(`https://www.omdbapi.com/?s="${name}"&apikey=f141fda`)
.then(res=>res.json())
.then(data=>{ 
    if (data.Search){
        searchFail.classList.add("none")
        data.Search.forEach(obj=>{ 
fetch(`https://www.omdbapi.com/?i=${obj.imdbID}&apikey=f141fda`)
.then(res=>res.json())
.then(data=>{
    movieCard.innerHTML+=
           ` <div class="movie-card">
                <img src=${data.Poster}>
                <div class="movie-details">
                    <div class="head">
                        <span >${data.Title}</span>
                        <i class="fa-solid fa-star star" ></i>
                        <span class="rate">${data.imdbRating}</span>
                    </div>
                    <div class="runtime">
                        <span>${data.Runtime}</span>
                        <span>${data.Genre}</span>
                        <button id="${data.imdbID}"><i class="fa-solid fa-plus-circle "></i> <span>Watchlist</span></button>
                    </div>
                    <p class="plot">${data.Plot}</p>
                </div>
            </div>
            <hr>
            `
})
})
}
else
    searchFail.classList.remove("none")
})
}
movieCard.addEventListener("click",function(e){
   
    if(!savedMovies.includes(e.target.closest("button").id)){
        savedMovies.push(e.target.closest("button").id)
        localStorage.setItem('movieWatchlistArray', JSON.stringify (savedMovies));
        modal.classList.remove("none")
        setTimeout(()=>{modal.classList.add("none")},1000)
    }
})
 