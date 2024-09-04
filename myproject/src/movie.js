import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { useQuery, gql } from '@apollo/client';
import { searchAtom } from './atoms.js'; // Jotai atom import
import './movie.css';


const SEARCH_MOVIES = gql`
  query SearchMovies($query: String!, $page: Int!) {
    searchMovies(query: $query, page: $page) {
      id
      title
      overview
      poster_path
      release_date
    }
  }
`;

const MovieSearch = () => {
  const [search, setSearch] = useAtom(searchAtom);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  const { data, loading, fetchMore } = useQuery(SEARCH_MOVIES, {
    variables: { query: search, page },
    skip: !search,
  });

  const movies = data?.searchMovies || [];

  const onChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loading && data?.searchMovies) { // 조건을 추가하여 불필요한 호출 방지
      fetchMore({
        variables: { query: search, page: page + 1 },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
  
          return {
            searchMovies: [...(prev.searchMovies || []), ...fetchMoreResult.searchMovies],
          };
        },
      });
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, fetchMore, search, page, data]); // 의존성 배열을 정확히 관리
  
  

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]); // 의존성 배열에 handleObserver만 포함하여 불필요한 재호출 방지
  

  return (
    <div>
      <div className='Search'>
        <input type='text' value={search} onChange={onChange} />
      </div>

      <div className='movieTitle'>
  {movies.map((movie) => (
    <div key={movie.id} className='movieLayout' onClick={() => handleClick(movie.id)}>
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
        className="moviePoster" 
      />
      <span>{movie.title}</span>
    </div>
  ))}
</div>

    </div>
  );
};

export default MovieSearch;
