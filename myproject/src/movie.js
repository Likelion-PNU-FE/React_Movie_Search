import { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './movie.css';
import Skeleton from './skeleton';

const MovieSearch = () => {
  const apiKey = '1074b154';
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const loader = useRef(null);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true); // 로딩 시작
      try {
        const response = await axios.get(`http://www.omdbapi.com/?s=popular&apikey=${apiKey}&page=${page}`);
        if (response.data.Search) {
          setMovies(prevMovies => [...prevMovies, ...response.data.Search]);
          setTotalResults(response.data.totalResults);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
        setMovies([]);
      }
      setLoading(false); // 로딩 종료
    };

    fetchInitialData();
  }, [page, apiKey]);

  useEffect(() => {
    const fetchData = async () => {
      if (search.trim() === "") {
        setMovies([]);
        return;
      }
      setLoading(true); // 로딩 시작
      try {
        const response = await axios.get(`http://www.omdbapi.com/?s=${search}&apikey=${apiKey}`);
        if (response.data.Search) {
          setMovies(response.data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
        setMovies([]);
      }
      setLoading(false); // 로딩 종료
    };

    const debounceFetchData = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(debounceFetchData);
  }, [search, apiKey]);

  const onChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const filterTitle = movies.filter((p) => {
    return p.Title.replaceAll(" ", "").toLowerCase().includes(search.replaceAll(" ", "").toLowerCase());
  });

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage(prevPage => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);

  return (
    <div>
      <div className='Search'>
        <input type='text' value={search} onChange={onChange} />
      </div>

      <div className='movieTitle'>
        {loading ? (
          <div className="skeleton-container">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        ) : (
          filterTitle.map(movie => (
            <div key={movie.imdbID} className='movieLayout' onClick={() => handleClick(movie.imdbID)}>
              <img src={movie.Poster} alt={movie.Title} className="moviePoster" />
              <span>{movie.Title}</span>
            </div>
          ))
        )}

        <div ref={loader} className="loading">
          {loading && <Skeleton />}
        </div>
      </div>
    </div>
  );
};

export default MovieSearch;
