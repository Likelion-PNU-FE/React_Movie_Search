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
    const [page, setPage] = useState(1); // ���� ������ ���� �߰�
    const [totalResults, setTotalResults] = useState(0); // �� ��� �� ���� �߰�
    
    const itemsPerPage = 10; // �������� �׸� ��

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
            console.error('������ �������� ����:', error);
            setMovies([]);
          }
        };
    
        fetchInitialData();
      }, [page, apiKey]);//�ʱ�ȭ��
    
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
              console.error('������ �������� ����:', error);
              setMovies([]);
          }
      };
      const debounceFetchData = setTimeout(() => {
        fetchData();
    }, 500); // 500ms ��ٿ�� 
  }, [search, apiKey]);//�˻����


  
  const onChange = (e) => {
      setSearch(e.target.value); 
      setPage(1);
   }; //�˻�

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
    } //��ȭ Ŭ��

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