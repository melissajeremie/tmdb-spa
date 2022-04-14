const API_KEY = 'b0738a033f97cb8789236ad33e1812e7';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=b0738a033f97cb8789236ad33e1812e7&language=en-US&page=1&query=';
const popUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

const searchButton = document.querySelector('#search');
const input = document.querySelector('#inputValue');
const popular = document.querySelector('#popular');
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
        <img src=${IMAGE_URL + movie.poster_path} data-movie-id=${movie.id}/>
        `;
        }
    })
}
function createMovieContainer(movies) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const movieTemplate = `
    <section class="section">
    ${movieLayout((movies))}
    </section>
    <div class="content">
    <p id="content-close">x</p>
    </div>
    `;

    movieElement.innerHTML = movieTemplate;

    return movieElement;
}

function renderSearchResults(data) {
    searchResults.innerHTML = '';
    const movies = data.results;
        const movieBlock = createMovieContainer(movies);
        searchResults.appendChild(movieBlock)
        console.log('Data: ', data);
}

function getPopularMovies(data) {
    const movies = data.results;
        const movieBlock = createMovieContainer(movies);
        popular.appendChild(movieBlock)
        console.log('Data: ', data);
}
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

