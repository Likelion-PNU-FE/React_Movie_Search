import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { queryAtom } from '../state';
import api from '../api';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [query] = useAtom(queryAtom);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await api.get('/', { params: { i: id } });
                const data = response.data;
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
            <p>Search Query: {query}</p>
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
