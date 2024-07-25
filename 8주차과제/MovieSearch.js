import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import MovieList from './MovieList';
import Skeleton from './skeleton';
import { fetchMovies } from './movie';
import { useSetAtom } from 'jotai';
import { searchQueryAtom } from './Atoms';

const MovieSearch = ({ initialMovies, initialQuery, initialPage, initialHasSearched, updateSearchState }) => {
    const [query, setQuery] = useState(initialQuery);
    const observerRef = useRef(null);
    const setSearchQuery = useSetAtom(searchQueryAtom); //검색어 상태 전역적 설정
    const navigate = useNavigate(); //Router 페이지이동

    //무한스크롤
    const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteQuery(
        ['movies', query], //검색어가 있는 경우
        ({ pageParam = 1 }) => fetchMovies(query, pageParam),
        {
            getNextPageParam: (lastPage, allPages) => {
                if (lastPage && lastPage.Response === 'True') {
                    const totalResults = parseInt(lastPage.totalResults, 10);
                    const totalPages = Math.ceil(totalResults / 10);
                    return allPages.length < totalPages ? allPages.length + 1 : undefined; // 다음 페이지가 있는 경우
                }
                return undefined;
            },
            enabled: !!query,
        }
    );

    const movies = data?.pages.flatMap((page) => page.Search) || [];

    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0];
            if (target.isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        },
        [fetchNextPage, hasNextPage]
    );

    useEffect(() => {
        const option = {
            root: null,
            threshold: 0.7,
        };
        const observer = new IntersectionObserver(handleObserver, option); //무한스크롤

        const currentObserver = observerRef.current;
        if (currentObserver) observer.observe(currentObserver);

        return () => {
            if (currentObserver) observer.unobserve(currentObserver);
        };
    }, [handleObserver]);

    const handleSearch = () => {
        if (query.trim()) {
            setSearchQuery(query);
        }
    };

    const handleMovieClick = (id) => {
        updateSearchState(movies, query, initialPage, !!query);
        navigate(`/movie/${id}`);
    };

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
            {isError && <div className='error'>{error.message || '네트워크 오류'}</div>}
            <div className='movie-list-container'>
                <MovieList movies={movies} onMovieClick={handleMovieClick} />
                {isLoading || isFetchingNextPage
                    ? Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} />)
                    : null}
                <div ref={observerRef} className='observer'></div>
            </div>
        </div>
    );
};

export default MovieSearch;
