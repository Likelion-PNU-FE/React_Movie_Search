import logo from './logo.svg';
import './App.css';
import './movie.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './movie.css';
import MovieSearch from './movie.js';
import MovieDetail from './movieDetail.js';

function App() {
  return (
    <Router>
    <div className="App">
   
      <Routes>
      <Route path="/" element={<MovieSearch />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
        </div>
    </Router>
  );
}

export default App;
