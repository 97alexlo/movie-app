// import { useContext } from "react"
import Movies from "../components/Movies.js";
// import { GlobalContext } from "../context/GlobalState.js"
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../styles/favoritesPage.css";

function FavoritesPage() {
  const favorites = useSelector((state) => state.favorites.value);
  // const {favorites} = useContext(GlobalContext)

  return (
    <div className="favorites-wrapper">
      {favorites.length !== 0 ? (
        <>
          <div className="favorites-header">
            <Badge pill className="badge-counter" bg="light">
              {favorites.length} {favorites.length === 1 ? `Movie` : `Movies`}
            </Badge>
            <h3 className="favorites-title">My Favorites</h3>
          </div>
          <Movies moviesData={favorites} />
        </>
      ) : (
        <h4 className="no-favorites">
          Sorry you have no favorited movies. Return to the home page to add a
          favorite movie!
        </h4>
      )}
    </div>
  );
}

export default FavoritesPage;
