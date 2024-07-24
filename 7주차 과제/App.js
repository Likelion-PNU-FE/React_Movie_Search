import React, { useState } from 'react';
import MovieSearch from './MovieSearch';
import MovieDetails from './MovieDetails';
import './App.css';

const App = () => {
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [searchState, setSearchState] = useState({
        movies: [],
        query: '',
        page: 1,
        hasSearched: false,
    });

    const handleMovieClick = (id) => {
        setSelectedMovieId(id);
    };

    const handleBack = () => {
        setSelectedMovieId(null);
    };

    const updateSearchState = (movies, query, page, hasSearched) => {
        setSearchState({ movies, query, page, hasSearched });
    };

    return (
        <div className='app'>
            {selectedMovieId ? (
                <MovieDetails movieId={selectedMovieId} onBack={handleBack} />
            ) : (
                <MovieSearch
                    onMovieClick={handleMovieClick}
                    initialMovies={searchState.movies}
                    initialQuery={searchState.query}
                    initialPage={searchState.page}
                    initialHasSearched={searchState.hasSearched}
                    updateSearchState={updateSearchState}
                />
            )}
        </div>
    );
};

export default App;
