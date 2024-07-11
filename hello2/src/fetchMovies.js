export const fetchMovies = async (searchTerm) => {
    const apiKey = '2c51318f';
    const response = await fetch(`https://www.omdbapi.com/?apikey={2c51318f}&s={frozen}`);
    const data = await response.json();
    return data;

};