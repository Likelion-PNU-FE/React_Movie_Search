import React, { useState, useEffect } from 'react';
import './App.css';
import Movie from './components/Movie';
import MovieInfo from './components/MovieInfo';
import Pagination from './components/Pagination';

const key = process.env.REACT_APP_API_KEY;

function App() {
    const [input, setInput] = useState('');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    const fetchData = async (page = 1) => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${input}&page=${page}`);
            const data = await response.json();
            if (data.Search) {
                setMovies(data.Search);
                setTotalResults(data.totalResults);
            }
        } catch (error) {
            console.error('fetch error');
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchData(1);
    };

    const handleMovieClick = (movie) => {
        console.log(movie);
        setSelectedMovie(movie);
    };

    const handleBackButtonClick = () => {
        setSelectedMovie(null);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchData(newPage);
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    return (
        <div>
            <Search input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
            {selectedMovie ? (
                <MovieInfo imdbid={selectedMovie.imdbID} onBack={handleBackButtonClick} />
            ) : (
                <>
                    <MovieList movies={movies} onMovieClick={handleMovieClick} />
                    <Pagination currentPage={currentPage} totalResults={totalResults} onPageChange={handlePageChange} />
                </>
            )}
        </div>
    );
}

function Search({ input, handleInputChange, handleSubmit }) {
    return (
        <div>
            <div className='app-container'>
                <form onSubmit={handleSubmit}>
                    <input
                        id='search-engine'
                        type='text'
                        placeholder='영화를 검색해 보세요'
                        value={input}
                        onChange={handleInputChange}
                    />
                    <button id='search-button' type='submit'>
                        검색
                    </button>
                </form>
            </div>
        </div>
    );
}

function MovieList({ movies, onMovieClick }) {
    return (
        <div className='movie-list'>
            {movies.map((movie) => (
                <Movie
                    key={movie.imdbID}
                    title={movie.Title}
                    year={movie.Year}
                    imdbid={movie.imdbID}
                    type={movie.Type}
                    poster={movie.Poster}
                    onClick={() => onMovieClick(movie)}
                />
            ))}
        </div>
    );
}

export default App;
