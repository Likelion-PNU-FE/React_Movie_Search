// src/MovieDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
    const { id } = useParams(); // URL 파라미터에서 영화 ID를 가져옴
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(
                    `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}`
                );
                const data = await response.json();
                setMovie(data);
            } catch (err) {
                console.error('Failed to fetch movie details', err);
            }
        };

        fetchMovie();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div>
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Plot}</p>
            <p>Release Date: {movie.Released}</p>
            <p>Runtime: {movie.Runtime}</p>
            <p>Genre: {movie.Genre}</p>
            <p>Director: {movie.Director}</p>
            <p>Actors: {movie.Actors}</p>
            <p>IMDB Rating: {movie.imdbRating}</p>
        </div>
    );
};

export default MovieDetail;
