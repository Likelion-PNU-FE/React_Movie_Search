import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './movieDetail.css';
import { useAtom } from 'jotai';
import { searchAtom } from './atoms.js';

const MovieDetail = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [search] = useAtom(searchAtom);


  return (
    <div className='detailContainer'>
      <div className='blurPoster'>
        <img src={movie.Poster} alt={movie.Title} />
      </div>
      <div className='detailContent'>
        <h1 className='detailTitle'>{movie.Title}</h1>
        <img src={movie.Poster} alt={movie.Title} />
        <p>{movie.Plot}</p>
        <p><strong className='strong'>Director:</strong> {movie.Director}</p>
        <p><strong className='strong'>Actors:</strong> {movie.Actors}</p>
        <p><strong className='strong'>Released:</strong> {movie.Released}</p>
        <p><strong className='strong'>Genre:</strong> {movie.Genre}</p>
      </div>
    </div>
  );
};

export default MovieDetail; 