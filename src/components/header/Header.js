import React, { useState } from "react";
import { Link } from "react-router-dom"
import "./Header.css";

const Header = () => {

    const [searchText , setSearchText] = useState("ABC");
    return (
    <>
        <div className="header">
            <div className="header-left">
                <Link to="/"><img className="header-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt="Logo" /></Link>
                <Link to="/movies/popular" className="head-links"><span>Popular</span></Link>
                <Link to="/movies/top_rated" className="head-links"><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" className="head-links"><span>UpComing</span></Link>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search..." value={searchText} onChange={(e) => {setSearchText(e.target.value)}}/>
                <button className="search-btn">Search</button>
            </div>
        </div>
    </>
    );
}

export default Header;