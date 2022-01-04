import {Form, FormControl} from 'react-bootstrap'
import {useState} from 'react'
import axios from 'axios'
import ResultCard from './ResultCard'
import '../styles/search.css'

function Search() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])

    const findMovies = async(e) => {
        try {
            let res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`)    
            if(res === null) {
                setResults([])
            }
            else {
                setResults(res.data.results.splice(0, 12))
            }
        } catch(error) {
            console.error(error)
            setResults([])
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
        findMovies(e)
    }

    return (
        <div className='wrapper-search'>
            <div>
                <Form className='search-input'>
                    <FormControl
                    type="search"
                    placeholder="Search for a movie"
                    value={query}
                    onChange={handleChange}
                    />
                </Form>
            </div>
            <div className='movie-list'>
                {results.length > 0 && 
                <ul>
                    {results.map(movie => 
                        <li key={movie.id}>
                            <ResultCard movie={movie}></ResultCard>
                        </li>)
                    }
                </ul>
                }
            </div>
        </div>
    )
}

export default Search
