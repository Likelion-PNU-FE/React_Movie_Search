import React, { useState,useEffect} from 'react';
import './movie.css';
import axios from 'axios';
import movieDetail from './movieDetail.js';
import { useNavigate } from 'react-router-dom';


const MovieSearch = () => {
  const apiKey = '1074b154';
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    const [page, setPage] = useState(1); // 현재 페이지 상태 추가
    const [totalResults, setTotalResults] = useState(0); // 총 결과 수 상태 추가
    
    const itemsPerPage = 10; // 페이지당 항목 수

    useEffect(() => {
        const fetchInitialData = async () => {
          try {
            const response = await axios.get(`http://www.omdbapi.com/?s=popular&apikey=${apiKey}&page=${page}`);
            if (response.data.Search) {
              setMovies(response.data.Search);
              setTotalResults(response.data.totalResults);
            } else {
              setMovies([]);
            }
          } catch (error) {
            console.error('데이터 가져오기 오류:', error);
            setMovies([]);
          }
        };
    
        fetchInitialData();
      }, [page, apiKey]);//초기화면
    
    useEffect(() => {
      const fetchData = async () => {
          if (search.trim() === "") {
              setMovies([]);
              return;
          }

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
      };
      const debounceFetchData = setTimeout(() => {
        fetchData();
    }, 500); // 500ms 디바운싱 
  }, [search, apiKey]);//검색결과


  
  const onChange = (e) => {
      setSearch(e.target.value); 
      setPage(1);
   }; //검색

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
    } //영화 클릭

  const filterTitle = movies.filter((p) => {
      return p.Title.replaceAll(" ","").toLocaleLowerCase().includes(search.replaceAll(" ","").toLocaleLowerCase());
  });

  const totalPages = Math.ceil(totalResults / itemsPerPage);
    
   return(
    <div>
        <div className='Search'>
            <input type = 'text' value={search} onChange={onChange}/>
        </div>

        <div className='movieTitle'>  
            {filterTitle.map(movie => 
            <div key={movie.imdbID} className='movieLayout' onClick={() => handleClick(movie.imdbID)}>
                <img src={movie.Poster} alt={movie.Title} className="moviePoster" />
              <span>{movie.Title}</span>
        </div>)}
            

        <div className='pagination'>
        <button className = 'previous'onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span className='pageNum'>Page {page} of {totalPages}</span>
        <button className='next' onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
        </div>


    </div>)
}

export default MovieSearch;