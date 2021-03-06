import { Form, FormControl } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import ResultCard from "./ResultCard";
import "../styles/search.css";
import searchIcon from "../images/search.png";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = async (e) => {
    e.preventDefault();
    setQuery(e.target.value);

    if (e.target.value !== "") { // check for empty string or else it returns error 422
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
        );
        //console.log(res);
        if (res.data.results.length > 0) {
          setResults(res.data.results.splice(0, 12));
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error(error);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div className="wrapper-search">
      <div>
        <img className="search-icon" src={searchIcon} alt="search-icon" />
        <Form className="search-input">
          <FormControl
            type="search"
            placeholder="Search for a movie"
            value={query}
            onChange={handleChange}
          />
        </Form>{" "}
      </div>
      <div className="movie-list">
        {results.length > 0 && (
          <ul>
            {results.map((movie) => (
              <li key={movie.id}>
                <ResultCard movie={movie}></ResultCard>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;
