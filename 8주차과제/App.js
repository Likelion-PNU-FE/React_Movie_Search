import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import MovieSearch from './MovieSearch';
import MovieDetails from './MovieDetails';
import './App.css';

const queryClient = new QueryClient();

const App = () => {
    const [searchState, setSearchState] = useState({
        movies: [],
        query: '',
        page: 1,
        hasSearched: false,
    });

    const updateSearchState = (movies, query, page, hasSearched) => {
        setSearchState({ movies, query, page, hasSearched });
    };

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className='app'>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <MovieSearch
                                    initialMovies={searchState.movies}
                                    initialQuery={searchState.query}
                                    initialPage={searchState.page}
                                    initialHasSearched={searchState.hasSearched}
                                    updateSearchState={updateSearchState}
                                />
                            }
                        />
                        <Route path='/movie/:id' element={<MovieDetails />} />
                    </Routes>
                </div>
            </Router>
        </QueryClientProvider>
    );
};

export default App;
