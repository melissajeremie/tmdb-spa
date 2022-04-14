const API_KEY = 'b0738a033f97cb8789236ad33e1812e7';
const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=`;
const popUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
const popRated = `https://api.themoviedb.org/3/movie/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&language=en-US&page=1`
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

const searchButton = document.querySelector('#search');
const input = document.querySelector('#inputValue');
const popular = document.querySelector('#popular');
const ratingsButton = document.querySelector('#popular-ratings');
const info = document.querySelector('#info');
const searchResults = document.querySelector('#search-results');


window.onload = function(data) {
    fetch(popUrl) 
    .then((res) => res.json())
    .then(getPopularMovies)
    .catch((error) => {
        console.log('Error: ', error)
})};

function movieLayout(movies){
    return movies.map((movie) => {
        if (movie.poster_path) {
        return `
        <img class="posters" src=${IMAGE_URL + movie.poster_path} data-movie-id=${movie.id}/>)" 
        `;
        }
    })
}

// function infoLayout(movie){
//     return movie.map((movie) => {
//          return `
//         <h3>${movie.original_title}</h3>
//         <h4>${movie.release_date}</h4>
//         <h4>${movie.vote_average}</h4>
//         <h5>${movie.overview}</h5>
//         `;
//         }
//     )
// }
function createMovieContainer(movies) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const movieTemplate = `
    <section class="section">
    ${movieLayout((movies))}
    </section>
    `;

    movieElement.innerHTML = movieTemplate;

    return movieElement;
}

// function createMovieInfo(movie) {
//  const infoElement = document.createElement('div');
//  createMovieInfo.setAttribute('class', 'info');

//  const infoUrl = `
//  https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`

//  fetch(infoUrl) 
//  .then((res) => res.json())
//  .then(renderMovieInfo)
//  .catch((error) => {
//      console.log('Error: ', error)
//  });

// const infoTemplate = `
//     <div class="movie-info">
//     ${infoLayout((movie))}
//     </div>
//     `;

//     infoElement.innerHTML = infoTemplate;
//  return infoElement;
// };

function renderSearchResults(data) {
    searchResults.innerHTML = '';
    const movies = data.results;
        const movieBlock = createMovieContainer(movies);
        searchResults.appendChild(movieBlock)
        console.log('Data: ', data);
}
// function renderMovieInfo(data) {
//     info.innerHTML = '';
//     const movies = data.results;
//         const infoBlock = createMovieInfo(movies);
//         info.appendChild(infoBlock)
//         console.log('Data: ', data);
// }
function getPopularMovies(data) {
    const movies = data.results;
        const movieBlock = createMovieContainer(movies);
        popular.appendChild(movieBlock)
        console.log('Data: ', data);
}

// ratingsButton.onclick =function renderPopularRated(event) {
//     const movies = data.results;
//         const movieBlock = createMovieContainer(movies);
//         popular.appendChild(movieBlock)
// }
searchButton.onclick = function(event) {
    event.preventDefault();
    const value = input.value;
    console.log('Entered: ', value);
    const newUrl = url + value;
    
    fetch(newUrl) 
    .then((res) => res.json())
    .then(renderSearchResults)
    .catch((error) => {
        console.log('Error: ', error)
    });
input.value = '';
}

//  function(event) {
//     event.preventDefault();
//     fetch(popRated) 
//     .then((res) => res.json())
//     .then(getPopularMovies)
//     .catch((error) => {
//         console.log('Error: ', error)
// })};