import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/singleMoviePage.css";
import { Badge } from "react-bootstrap";
// import {useContext} from 'react'
// import {GlobalContext} from '../context/GlobalState.js'
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../features/favoritesSlice.js";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";

function SingleMoviePage() {
  const [movieData, setMovieData] = useState({});
  const [actors, setActors] = useState([]);
  const { id } = useParams();

  // const {addMovieToFavorites, removeMovieFromFavorites, favorites}  = useContext(GlobalContext)

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.value);

  const favoritedMovie = favorites.find(
    (movieObj) => movieObj.id === movieData.id
  );

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        //console.log(res.data)
        setMovieData(res.data);

        const actorsRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setActors(actorsRes.data.cast);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovie();
  }, [id]);

  const handleDragStart = (e) => e.preventDefault();
  const items = actors?.map((a) => {
    if (a.profile_path !== null) {
      return (
        <div className="actor-div">
          <img
            src={`https://image.tmdb.org/t/p/original${a.profile_path}`}
            alt={a.name}
            className="carousel-image"
            onDragStart={handleDragStart}
          />
          <p>{a.name}</p>
        </div>
      );
    } else {
      return (
        <div className="actor-div-error">
          <p>No image found</p>
        </div>
      );
    }
  });

  const responsive = {
    0: {
      items: 3,
    },
    600: {
      items: 4,
    },
    900: {
      items: 6,
    },
  };

  return (
    <div className="page-wrapper">
      <div
        className="single-movie-wrapper"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
        }}
      >
        <div className="inner-movie-div">
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
            alt={movieData.title}
          />
          <div className="movie-overview">
            <h3 className="singlepage-title">{movieData.title}</h3>
            <ul>
              <li>
                Genres:{" "}
                {movieData.genres &&
                  movieData.genres.map((g) => " " + g.name) + " "}
              </li>
              <li>Released: {movieData.release_date}</li>
              <li>
                Rating:{" "}
                <Badge pill bg="success">
                  {movieData.vote_average}{" "}
                </Badge>
              </li>
            </ul>
            <p className="movie-content">{movieData.overview}</p>
            <button
              className="bottom-btns"
              onClick={
                favoritedMovie
                  ? () => dispatch(removeFavorite(movieData.id))
                  : () => dispatch(addFavorite(movieData))
              }
            >
              {favoritedMovie ? "Unfavorite" : "Favorite"}
            </button>
          </div>
        </div>
      </div>
      <div className="carousel-wrapper">
        <div className="carousel">
          <h5>Credits (Swipe left or right)</h5>
          <AliceCarousel
            mouseTracking
            autoPlay
            autoPlayInterval={900}
            disableDotsControls
            disableButtonsControls
            showArrows={true}
            infinite
            controlsStrategy="alternate"
            responsive={responsive}
            items={items}
          />
        </div>
      </div>
      <div className="bottom-movie-overview">
        <h3>{movieData.title}</h3>
        <button
          className="bottom-btns"
          onClick={
            favoritedMovie
              ? () => dispatch(removeFavorite(movieData.id))
              : () => dispatch(addFavorite(movieData))
          }
        >
          {favoritedMovie ? "Unfavorite" : "Favorite"}
        </button>
        <ul>
          <li>
            Genres:{" "}
            {movieData.genres &&
              movieData.genres.map((g) => " " + g.name) + " "}
          </li>
          <li>Released: {movieData.release_date}</li>
          <li>
            Rating:{" "}
            <Badge pill bg="success">
              {movieData.vote_average}{" "}
            </Badge>
          </li>
        </ul>
        <p className="movie-content">{movieData.overview}</p>
      </div>
    </div>
  );
}

export default SingleMoviePage;
