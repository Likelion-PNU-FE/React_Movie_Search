import React, { useState, useEffect } from 'react';
import { fetchMovieDetails } from './movie';

const MovieDetails = ({ movieId, onBack }) => {
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getMovieDetails = async () => {
            setLoading(true);
            try {
                const data = await fetchMovieDetails(movieId);
                setMovie(data);
                setError(null);
            } catch (error) {
                setError(error.message || '네트워크 오류');
                setMovie(null);
            }
            setLoading(false);
        };

        if (movieId) {
            getMovieDetails();
        }
    }, [movieId]);

    if (loading) {
        return <div>...Loading...</div>;
    }

    if (error) {
        return <div className='error'>{error}</div>;
    }

    if (!movie) {
        return null;
    }

    return (
        <div className='movie-details'>
            <button onClick={onBack}>뒤로 가기</button>
            <h2>{movie.Title}</h2>
            <p>{movie.Plot}</p>
            <img src={movie.Poster} alt={`${movie.Title} 포스터`} />
            <p>개봉 연도: {movie.Year}</p>
            <p>장르: {movie.Genre}</p>
            <p>감독: {movie.Director}</p>
            <p>주연 배우: {movie.Actors}</p>
            <p>IMDb 평점: {movie.imdbRating}</p>
        </div>
    );
};

export default MovieDetails;
