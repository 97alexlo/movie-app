import noPoster from "../images/no-movie-poster.jpg";
import "../styles/resultCard.css";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";

function ResultCard({ movie }) {  
  return (
    <div className="results-list-wrapper">
      <Link className="result-link" to={`movie/${movie.id}`}>
        <div className="result-card">
          <div className="poster-wrapper">
            {movie.poster_path ? (
              <img
                className="result-image"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <img className="result-image" src={noPoster} alt="No Poster" />
            )}
          </div>
          <div className="result-info">
            <h4>{movie.title}</h4>
            <ul>
              <li>
                {movie.release_date ? movie.release_date.substring(0, 4) : "-"}
              </li>
              <li>
                <Badge pill bg="success">
                  {movie.vote_average || "No Rating"}
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ResultCard;
