import React , {useEffect, useState} from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/MovieList";

const Home = () => {

    const [ popularMovies, setPopularMovies ] = useState([]);
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=017bbeb28b0d985ad79adf8821348576&language=en-US")
        .then(res => res.json())
        .then(data => setPopularMovies(data.results))
    }, [])
    return (
        <>
            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        popularMovies.map(movie => (
                            <Link style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`}>
                            <div className="poster-image">
                                <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt="" />

                            </div>
                            <div className="poster-image-overlay">
                                <div className="poster-image-title">{movie ? movie.original_title : ""}</div>
                                <div className="poster-image-runtime">
                                    {movie ? movie.release_date : ""}
                                    <span className="poster-image-rating">
                                        {movie ? movie.vote_average : ""}
                                        <i class="fa-solid fa-star"></i>{" "}
                                    </span>
                                </div>
                                <div className="poster-image-description">{movie ? movie.overview : "" }</div>
                            </div>
                            </Link>
                        ))
                    }
                </Carousel>
                <MovieList />
            </div>
        </>
    );
};

export default Home;