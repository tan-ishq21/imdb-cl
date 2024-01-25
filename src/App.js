
import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Home from './pages/homepage/Home';
import MovieList from './components/movieList/MovieList';
import MovieDetail from './pages/movieDetail/movie';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path='movie/:id' element={<MovieDetail />}></Route>
          <Route path='movies/:type' element={<MovieList />}></Route>
          <Route path='/*' element={<h1>Error Page</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
