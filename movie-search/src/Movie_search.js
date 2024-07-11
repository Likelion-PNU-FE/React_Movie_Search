// src/MovieSearch.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const searchMovies = async (e) => {
        e.preventDefault(); // 폼 제출 기본 동작 방지

        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`);
            const data = await response.json();
            setMovies(data.Search || []); // 검색 결과를 상태에 저장
        } catch (err) {
            console.error('Failed to fetch movies', err);
        }
    };

    return (
        <div>
            <form onSubmit={searchMovies}>
                <input
                    type='text'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='영화 제목을 입력해주세요.'
                />
                <button type='submit'>검색</button>
            </form>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.imdbID}>
                        <Link to={`/movie/${movie.imdbID}`}>
                            <img src={movie.Poster} alt={movie.Title} />
                            <p>
                                {movie.Title} ({movie.Year})
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieSearch;
