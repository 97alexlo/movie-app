import { Link } from "react-router-dom";
import noPoster from "../images/no-movie-poster.jpg";
import "../styles/movieCard.css";
import { Badge } from "react-bootstrap";
// import {useContext} from 'react'
// import {GlobalContext} from '../context/GlobalState.js'
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../features/favoritesSlice.js";

function MovieCard({ movie }) {
  const overviewSubstring = movie.overview.substring(0, 100);
  // const {addMovieToFavorites, removeMovieFromFavorites, favorites}  = useContext(GlobalContext)

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.value);

  const favoritedMovie = favorites.find((movieObj) => movieObj.id === movie.id);

  return (
    <div className="movie-card">
      <div className="movie-poster">
        {movie.poster_path === null ? (
          <Link to={`/movie/${movie.id}`}>
            <img className="movie-image" src={noPoster} alt="No Poster" />
          </Link>
        ) : (
          <Link to={`/movie/${movie.id}`}>
            <img
              className="movie-image"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
            />
          </Link>
        )}
      </div>
      <div>
        <div className="movie-info">
          <div className="card-header-mobile">
            <Badge pill className="badge-rating-mobile" bg="success">
              {movie.vote_average !== null ? movie.vote_average : `No Rating`}{" "}
            </Badge>
            <h5>{movie.title}</h5>
          </div>
          <ul>
            <li>Released: {movie.release_date}</li>
          </ul>
          <p>{overviewSubstring}...</p>
          <div className="buttons">
            <Link to={`/movie/${movie.id}`}>
              <button className="btn-moreinfo">More Info</button>
            </Link>{" "}
            <button
              className="btn-favorite"
              onClick={
                favoritedMovie
                  ? () => dispatch(removeFavorite(movie.id))
                  : () => dispatch(addFavorite(movie))
              }
            >
              {favoritedMovie ? "Unfavorite" : "Favorite"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
