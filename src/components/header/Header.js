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


    const hideDiv = () => {
        if (searchClicked) {
            setSearchClicked(false);
        }
    };

    return (
        <>
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img
                        className="header-icon"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                        alt="Logo"
                    />
                </Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link to="/movies/popular" className="head-links nav-link active">
                        <span className="links">Popular</span>
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/movies/top_rated" className="head-links nav-link active">
                        <span className="links">Top Rated</span>
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/movies/upcoming" className="head-links nav-link active">
                        <span className="links">Upcoming</span>
                    </Link>
                    </li>
                    
                </ul>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" 
                        type="text" 
                        placeholder="Search..."  
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button className="btn btn-outline-success" type="button" onClick={handleSearch}>Search</button>
                </form>
                </div>
            </div>
        </nav>


            {searchClicked && (
                <>
                    <div ref={myDivRef} className="search-results">
                        {filteredMovies.map((movie) => (
                            <div key={movie.id} className="result-item">
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
