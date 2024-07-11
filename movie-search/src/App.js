// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieSearch from './Movie_search';
import MovieDetail from './Movie_detail';

function App() {
    return (
        <Router>
            <div className='App'>
                <h1>Movie Search</h1>
                <Routes>
                    <Route path='/' element={<MovieSearch />} />
                    <Route path='/movie/:id' element={<MovieDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
