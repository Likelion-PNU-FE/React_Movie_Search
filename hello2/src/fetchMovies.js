export const fetchMovies = async (searchTerm) => {
    const apiKey = '2c51318f';
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`);
    const data = await response.json();
    return data;

};