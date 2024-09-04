import logo from './logo.svg';
import './App.css';
import './movie.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './movie.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import MovieSearch from './movie.js';
import MovieDetail from './movieDetail.js';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
    <div className="App">
   
      <Routes>
      <Route path="/" element={<MovieSearch />} />
         
        </Routes>
        </div>
    </Router>
    </QueryClientProvider>
  );
}

export default App;
