import React from 'react';

const MovieList = ({ movies, onMovieClick }) => {
    return (
        <ul className='movie-list'>
            {movies.map((movie) => (
                <li key={movie.imdbID} className='movie-list__item' onClick={() => onMovieClick(movie.imdbID)}>
                    <img className='movie-list__item-img' src={movie.Poster} alt={movie.Title} />
                    <div className='movie-list__item-info'>
                        <p className='movie-list__item-info-title'>{movie.Title}</p>
                        <p className='movie-list__item-info-year'>{movie.Year}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default MovieList;
