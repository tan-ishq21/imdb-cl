import React, { useEffect, useState } from "react";
import Card from "../cards/Card";
import "./MovieList.css";
import { useParams } from "react-router-dom";

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const {type} = useParams();
    useEffect(() => {
        getData()
    },[])

    useEffect(() => {
        getData()
    },[type])
// 
    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=017bbeb28b0d985ad79adf8821348576&language=en-US`)
        .then(res => res.json())
        .then(data => setMovieList(data.results))
    }

    return (
        <>
            <div className="movie-list">
                <h2 className="list-title">
                    {(type ? type : "POPULAR").toUpperCase()}
                </h2>
                <div className="list-cards">
                    {
                        movieList.map(movie => (
                            <Card key={movie.id} movie={movie} />
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default MovieList;