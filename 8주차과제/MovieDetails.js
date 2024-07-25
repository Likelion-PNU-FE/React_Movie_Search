import React from 'react';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from './movie';

const MovieDetails = () => {
    const { id: movieId } = useParams();
    const navigate = useNavigate();

    const { data: movie, error, isLoading } = useQuery(['movie', movieId], () => fetchMovieDetails(movieId));

    if (isLoading) {
        return <div>...불러오는 중...</div>;
    }

    if (error) {
        return <div className='error'>{error.message || '네트워크 오류'}</div>;
    }

    if (!movie) {
        return null;
    }

    return (
        <div className='movie-details'>
            <h2>{movie.Title}</h2>
            <p>{movie.Plot}</p>
            <img src={movie.Poster} alt={`${movie.Title} 포스터`} />
            <p>개봉 연도: {movie.Year}</p>
            <p>장르: {movie.Genre}</p>
            <p>감독: {movie.Director}</p>
            <p>주연 배우: {movie.Actors}</p>
            <p>IMDb 평점: {movie.imdbRating}</p>
            <button onClick={() => navigate(-1)}>뒤로 가기</button>
        </div>
    );
};

export default MovieDetails;
