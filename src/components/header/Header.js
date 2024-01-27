import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Card from "../cards/Card";

const Header = () => {
    const [searchText, setSearchText] = useState("");
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);

    const myDivRef = useRef(null);

  const hideDiv = () => {
    if (searchClicked) {
    //   myDivRef.current.style.display = 'none';
        setSearchClicked(false);
    }
  };

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=017bbeb28b0d985ad79adf8821348576&language=en-US")
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results);
                setFilteredMovies(data.results);
            });
    }, []);

    const handleSearch = () => {
        const filtered = movies.filter((movie) =>
            movie.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredMovies(filtered);
        setSearchClicked(true);
    };

    return (
        <>
            <div className="header">
                <div className="header-left">
                    <Link to="/">
                        <img
                            className="header-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                            alt="Logo"
                        />
                    </Link>
                    <Link to="/movies/popular" className="head-links">
                        <span>Popular</span>
                    </Link>
                    <Link to="/movies/top_rated" className="head-links">
                        <span>Top Rated</span>
                    </Link>
                    <Link to="/movies/upcoming" className="head-links">
                        <span>Upcoming</span>
                    </Link>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button className="search-btn" onClick={handleSearch}>
                        Search
                    </button>
                    {/* <button className="search-btn">Hide Search</button> */}
                </div>
            </div>

            {searchClicked && (
                <>
                <div ref={myDivRef} className="search-results">
                    {filteredMovies.map((movie) => (
                        <div key={movie.id} className="result-item">
                            {/* <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            <p>{movie.title}</p> */}
                            <Card movie={movie} />
                        </div>
                    ))}
                <div className="cancel-btn">
                    <button className="search-btn" onClick={hideDiv}>Clear</button>
                </div>
                </div>
                </>
            )}
        </>
    );
};

export default Header;
