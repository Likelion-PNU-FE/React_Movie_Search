import React, { useState } from 'react';
import MovieSearch from './MovieSearch';
import MovieDetails from './MovieDetails';
import MovieList from './MovieList';
import './App.css';

const App = () => {
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchPage, setSearchPage] = useState(1);

    const handleMovieClick = (id) => {
        setSelectedMovieId(id);
    };

    const handleBack = () => {
        setSelectedMovieId(null); // 뒤로가기 함수, 수정 필요
    };

    const handleSearchQueryChange = (query) => {
        setSearchQuery(query);
        setSearchPage(1);
    };

    const handleSearchPageChange = (page) => {
        setSearchPage(page);
    };

    return (
        <div className='app'>
            {selectedMovieId ? (
                <MovieDetails movieId={selectedMovieId} onBack={handleBack} />
            ) : (
                <>
                    <MovieSearch
                        onMovieClick={handleMovieClick}
                        searchQuery={searchQuery}
                        setSearchQuery={handleSearchQueryChange}
                        searchPage={searchPage}
                        setSearchPage={handleSearchPageChange}
                    />
                    <MovieList onMovieClick={handleMovieClick} />
                </>
            )}
        </div>
    );
};

export default App;
