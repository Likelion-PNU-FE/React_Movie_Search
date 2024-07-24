// src/components/MovieSearch.js
import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { queryAtom } from '../state';
import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../api';

const fetchMovies = async ({ queryKey, pageParam = 1 }) => {
    const [, query] = queryKey;
    const response = await api.get('/', { params: { s: query, page: pageParam } });
    const data = response.data;
    return {
        results: data.Search || [],
        nextPage: data.Search ? pageParam + 1 : undefined,
    };
};

const MovieSearch = () => {
    const [query, setQuery] = useAtom(queryAtom);
    const observer = useRef();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
        queryKey: ['movies', query],
        queryFn: fetchMovies,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        enabled: !!query,
    });

    const lastMovieElementRef = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            });
            if (node) observer.current.observe(node);
        },
        [hasNextPage, isFetchingNextPage, fetchNextPage]
    );

    const searchMovies = (e) => {
        e.preventDefault();
        refetch();
    };

    return (
        <div>
            <form onSubmit={searchMovies}>
                <input
                    type='text'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Search for a movie'
                />
                <button type='submit'>Search</button>
            </form>
            <ul>
                {data?.pages.map((page, pageIndex) =>
                    page.results.map((movie, movieIndex) => {
                        if (pageIndex === data.pages.length - 1 && movieIndex === page.results.length - 1) {
                            return (
                                <li key={movie.imdbID} ref={lastMovieElementRef}>
                                    <Link to={`/movie/${movie.imdbID}`}>
                                        <img src={movie.Poster} alt={movie.Title} />
                                        <p>
                                            {movie.Title} ({movie.Year})
                                        </p>
                                    </Link>
                                </li>
                            );
                        } else {
                            return (
                                <li key={movie.imdbID}>
                                    <Link to={`/movie/${movie.imdbID}`}>
                                        <img src={movie.Poster} alt={movie.Title} />
                                        <p>
                                            {movie.Title} ({movie.Year})
                                        </p>
                                    </Link>
                                </li>
                            );
                        }
                    })
                )}
            </ul>
            <div className='loading'>{isFetchingNextPage ? 'Loading more...' : ''}</div>
        </div>
    );
};

export default MovieSearch;
