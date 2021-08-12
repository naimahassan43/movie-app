// https://api.themoviedb.org/3/movie/550?api_key=ba0f20889114736fe19bb8f0d5b9444a

//Data fetching from API
const url =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ba0f20889114736fe19bb8f0d5b9444a&page=1";
const searchUrl =
  'https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=ba0f20889114736fe19bb8f0d5b9444a&query="';
const imagePath = `https://image.tmdb.org/t/p/w500`;

//API request
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  renderMovies(data.results);
}

getMovies(url);

//Javascript Selectors
const main = document.querySelector(".main");
const form = document.querySelector("form");
const input = document.querySelector("#search");
//Render Function
function renderMovies(movies) {
  main.innerHTML = ``;
  movies.forEach((movie) => {
    const movieTitle = movie.title;
    const movieRating = movie.vote_average;
    const moviePoster = movie.poster_path;
    const movieOverview = movie.overview;

    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    movieDiv.innerHTML = `
    <img src="${imagePath + moviePoster}" alt="${movieTitle}">
    <div class="movie-info">
       <h3>${movieTitle}</h3>
       <span class="${getScoreClass(movieRating)}">${movieRating}</span>
    </div>
    <div class="overview">
       <h3>Overview</h3>
      ${movieOverview} 
    </div>
    `;

    main.appendChild(movieDiv);
  });
}

function getScoreClass(score) {
  if (score >= 8) {
    return "green";
  } else if (score >= 5 && score < 8) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchValue = input.value.trim();
  if (searchValue && searchValue !== "") {
    getMovies(searchUrl + searchValue);
    searchValue = null;
  } else {
    window.location.reload();
  }
});
