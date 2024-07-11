import React, { useState,useEffect} from 'react';
import './movie.css';
import axios from 'axios';


const MovieSearch = () => {
  const apiKey = '1074b154';

   
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    
    
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


     
  }, [search, apiKey]);


  
        const onChange = (e) => {
            setSearch(e.target.value);
           
          };

          const filterTitle = movies.filter((p) => {
            return p.Title.replaceAll(" ","").toLocaleLowerCase().includes(search.replaceAll(" ","").toLocaleLowerCase());
        });
    


   return(
    <div>
        <div className='Search'>
            <input type = 'text' value={search} onChange={onChange}/>
        </div>

        <div className='movieTitle'>
          
            {filterTitle.map(movie => 
            <div key={movie.imdbID} className='movieLayout'>
                <img src={movie.Poster} alt={movie.Title} className="moviePoster" />
              <span>{movie.Title}</span>
       
       
        </div>)}
            

        </div>


    </div>)
}

export default MovieSearch;