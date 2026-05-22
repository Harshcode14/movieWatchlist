 let savedMovies=JSON.parse(localStorage.getItem('movieWatchlistArray'))|| []
 const modal=document.getElementById("modal-message")
 const emptyList=document.getElementById("empty-watchlist")
 const watchlist=document.getElementById("watchlist")
 if(savedMovies.length){
    emptyList.classList.add("none")
    renderWatchlist()
 }
 else
      emptyList.classList.remove("none")
   
function renderWatchlist(){
    watchlist.innerHTML=""
    savedMovies.forEach(id=>{
        fetch(`http://www.omdbapi.com/?i=${id}&apikey=7116f7e2`)
.then(res=>res.json())
.then(data=>{
    watchlist.innerHTML+=
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
                        <button id="${data.imdbID}"><i class="fa-solid fa-minus-circle "></i> <span>Remove</span></button>
                    </div>
                    <p class="plot">${data.Plot}</p>
                </div>
            </div>
            <hr>
            `
    })
})}

watchlist.addEventListener("click",function(e){
    let id=e.target.closest("button").id
    savedMovies.splice(savedMovies.indexOf(id),1)
    localStorage.setItem('movieWatchlistArray', JSON.stringify (savedMovies));
     if(savedMovies.length)
    emptyList.classList.add("none")
    else 
    emptyList.classList.remove("none")
    renderWatchlist()
    modal.classList.remove("none")
        setTimeout(()=>{modal.classList.add("none")},1000)
})