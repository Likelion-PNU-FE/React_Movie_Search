import React, { useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchForm from './SearchForm';
import MovieList from './MovieList';
import { fetchMovies } from './fetchMovies'; // fetch 함수 가져오기
import { useAtom } from 'jotai';
import { searchQueryAtom, moviesAtom, loadingAtom } from './atom';

const App = () => {
    const [, setSearchQuery] = useAtom(searchQueryAtom);
    const [, setMovies] = useAtom(moviesAtom);
    const [, setLoading] = useAtom(loadingAtom);

    const handleSearch = useCallback(async (searchTerm) => {
        setLoading(true);
        setSearchQuery(searchTerm);
        const data = await fetchMovies(searchTerm);
        if (data.Response === 'True') {
            setMovies(data.Search);
        } else {
            setMovies([]);
        }
        setLoading(false);
    }, [setLoading, setSearchQuery, setMovies]);

    return (
        <Router>
            <div className='fixed w-full bg-white shadow-md z-10'>
                <SearchForm onSearch={handleSearch} />
            </div>
            <Routes>
                <Route path='/' element={<MovieList />} />
            </Routes>
        </Router>
    );
};

export default App;