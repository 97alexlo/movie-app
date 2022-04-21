import { useState, useEffect } from "react";
import Movies from "../components/Movies.js";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "../styles/homePage.css";
import axios from "axios";
import Search from "../components/Search.js";

function HomePage() {
  const [moviesData, setMoviesData] = useState(null);
  const [filter, setFilter] = useState("popular");
  const [dropdownName, setDropdownName] = useState("Popular");

  useEffect(() => {
    document.title = "Movie App - Home";
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${filter}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
        );
        // const first12Movies = res.data.results.slice(0, 12);
        setMoviesData(res.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, [filter]);

  function handleChange(e) {
    setFilter(e.target.id);
    setDropdownName(e.target.innerHTML);
  }

  return (
    <div className="home-page">
      <div className="dropdown-div">
        <Search />
        <DropdownButton
          className="filter-button"
          variant="light"
          id="dropdown-basic-button"
          title={dropdownName}
        >
          <Dropdown.Item id="popular" onClick={(e) => handleChange(e)}>
            Popular
          </Dropdown.Item>
          <Dropdown.Item id="top_rated" onClick={(e) => handleChange(e)}>
            Top Rated
          </Dropdown.Item>
          <Dropdown.Item id="now_playing" onClick={(e) => handleChange(e)}>
            Now Playing
          </Dropdown.Item>
          <Dropdown.Item id="upcoming" onClick={(e) => handleChange(e)}>
            Upcoming
          </Dropdown.Item>
        </DropdownButton>
      </div>
      {moviesData !== null ? (
        <Movies moviesData={moviesData} />
      ) : (
        <p>Fetching Movies...</p>
      )}
    </div>
  );
}

export default HomePage;
