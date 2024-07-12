import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieInfo({ imdbid, onBack }) {
    const [movie, setMovie] = useState(null);
    const apikey = '2440beac';
    const {id} = useParams();


    useEffect(() => {
      const fetchMovieDetails = async () => {
          try {
            console.log(imdbid);
              const response = await fetch(`https://www.omdbapi.com/?i=${imdbid}&apikey=${apikey}`);
              const data = await response.json();
              setMovie(data);
          } catch (error) {
            console.log(error);
          }
         
      };
      fetchMovieDetails();
  }, [id]);

    if (!movie) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <div className="container">
          <button className="backButton" onClick={onBack}>뒤로가기</button>
          <div className="content">
            <img className="posterInfo" src={movie.Poster} alt={`${movie.Title} poster`} />
            <div>
              <h1>{movie.Title}</h1>
              <p>{movie.Genre} / {movie.Year}</p>
              <hr />
              <div className="detail">
                <p><b>상영시간</b></p>
                <p>{movie.Runtime}</p>
                <p><b>감독</b></p>
                <p>{movie.Director}</p>
                <p><b>배우</b></p>
                <p>{movie.Actors}</p>
                <p><b>줄거리</b></p>
                <p>{movie.Plot}</p>
              </div>
            </div>
          </div>
        </div>
      );
}

export default MovieInfo;
