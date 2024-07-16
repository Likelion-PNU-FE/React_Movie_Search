import React, { useState } from 'react';
import MovieList from './MovieList';
import { fetchMovies } from './movie';
//영화 검색
const MovieSearch = ({ onMovieClick }) => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);

    const itemsPerPage = 10;

    const searchMovies = async (newPage = 1) => {
        setLoading(true);
        setError('');
        try {
            const data = await fetchMovies(query, newPage);
            setMovies(data.Search);
            setPage(newPage);
        } catch (error) {
            console.error('영화를 찾는 도중 오류 발생:', error);
            setError(error.message || '네트워크 오류');
            setMovies([]);
        }
        setLoading(false);
    };

    const handleNextPage = () => searchMovies(page + 1);
    const handlePreviousPage = () => searchMovies(page - 1);

    return (
        <div className='movie-search'>
            <input
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='영화를 검색해 보세요'
            />
            <button onClick={() => searchMovies(1)}>🔎</button>
            {loading && <div>...Loading...</div>}
            {error && <div className='error'>{error}</div>}
            {!loading && !error && (
                <>
                    <MovieList movies={movies} onMovieClick={onMovieClick} />
                    <div className='pagination'>
                        {page > 1 && <button onClick={handlePreviousPage}>이전</button>}
                        {movies.length === itemsPerPage && <button onClick={handleNextPage}>다음</button>}
                    </div>
                </>
            )}
        </div>
    );
};

export default MovieSearch;
