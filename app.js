const API_KEY = 'b0738a033f97cb8789236ad33e1812e7';

const searchButton = document.querySelector('#search');
const input = document.querySelector('#inputValue');

searchButton.onclick = function(event) {
    event.preventDefault();
    const value = input.value;
    console.log('Entered: ', value);

}