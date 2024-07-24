import React, { useState, useRef, useCallback, useEffect } from 'react';
import MovieList from './MovieList';
import Skeleton from './skeleton';
import { fetchMovies } from './movie';

const MovieSearch = ({
    onMovieClick,
    initialMovies,
    initialQuery,
    initialPage,
    initialHasSearched,
    updateSearchState,
}) => {
    const [query, setQuery] = useState(initialQuery);
    const [movies, setMovies] = useState(initialMovies);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasSearched, setHasSearched] = useState(initialHasSearched);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const observerRef = useRef(null);
    const [totalResults, setTotalResults] = useState(0);

    const searchMovies = useCallback(
        async (newPage = 1, reset = false) => {
            setLoading(true);
            setError('');
            try {
                const data = await fetchMovies(query, newPage);
                setTotalResults(data.totalResults);
                if (reset) {
                    setMovies(data.Search);
                } else {
                    setMovies((prevMovies) => [...prevMovies, ...data.Search]);
                }
                setHasSearched(true);
            } catch (error) {
                console.error('영화를 찾는 도중 오류 발생:', error);
                setError(error.message || '네트워크 오류');
                setMovies([]);
                setHasSearched(false);
            }
            setLoading(false);
        },
        [query]
    );

    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0];
            if (target.isIntersecting && !loading && movies.length < totalResults) {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        },
        [loading, movies.length, totalResults]
    );

    useEffect(() => {
        const option = {
            root: null,
            threshold: 0.7,
        };
        const observer = new IntersectionObserver(handleObserver, option);

        const currentObserver = observerRef.current;
        if (currentObserver) observer.observe(currentObserver);

        return () => {
            if (currentObserver) observer.unobserve(currentObserver);
        };
    }, [handleObserver]);

    useEffect(() => {
        if (hasSearched && currentPage > initialPage) {
            searchMovies(currentPage, false);
        }
    }, [currentPage, hasSearched, searchMovies, initialPage]);

    const handleSearch = () => {
        if (query.trim()) {
            setCurrentPage(1);
            searchMovies(1, true);
        }
    };

    const handleMovieClick = (id) => {
        onMovieClick(id);
        updateSearchState(movies, query, currentPage, hasSearched);
    };

    useEffect(() => {
        const handleBackNavigation = () => {
            setCurrentPage(initialPage);
            setMovies(initialMovies);
            setQuery(initialQuery);
            setHasSearched(initialHasSearched);
            setError('');
        };

        window.addEventListener('popstate', handleBackNavigation);

        return () => {
            window.removeEventListener('popstate', handleBackNavigation);
        };
    }, [initialPage, initialMovies, initialQuery, initialHasSearched]);

    return (
        <div className='movie-search'>
            <div className='movie-search-container'>
                <input
                    type='text'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='영화를 검색해 보세요'
                />
                <button onClick={handleSearch}>🔎</button>
            </div>
            {error && <div className='error'>{error}</div>}
            <div className='movie-list-container'>
                <MovieList movies={movies} onMovieClick={handleMovieClick} />
                {loading && Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} />)}
                <div ref={observerRef} className='observer'></div>
            </div>
        </div>
    );
};

export default MovieSearch;
