import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './movieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const apiKey = '1074b154';
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
        setMovie(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };

    fetchMovieDetails();
  }, [id, apiKey]);

  if (!movie) {
    return <div className='loading'>Loading...</div>;
  }

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