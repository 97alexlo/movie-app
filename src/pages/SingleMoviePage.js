import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import '../styles/singleMoviePage.css'
import {Badge} from 'react-bootstrap'
// import {useContext} from 'react'
// import {GlobalContext} from '../context/GlobalState.js'
import {useSelector, useDispatch} from 'react-redux'
import {addFavorite, removeFavorite} from '../features/favoritesSlice.js'

function SingleMoviePage() {

    const [movieData, setMovieData] = useState([]);
    const {id} = useParams();

    // const {addMovieToFavorites, removeMovieFromFavorites, favorites}  = useContext(GlobalContext)

    const dispatch = useDispatch()
    const favorites = useSelector((state) => state.favorites.value)

    // check if movie is already favorited
    let favoritedMovie = favorites.find(movieObj => movieObj.id === movieData.id)
    const favorited = favoritedMovie ? true : false

    useEffect(() => {
        const fetchMovie = async() => {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
            setMovieData(res.data);
        }

        // const fetchBackDrop = async() => {
        //     const res 
        // }
        fetchMovie()
    }, [id])
    console.log(`https://image.tmdb.org/t/p/w1280/${movieData.backdrop_path}`)
    return (
        <div className='page-wrapper'>
        <div className='single-movie-wrapper' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/${movieData.backdrop_path})`}}>
            <div className='inner-movie-div'>
                <img className='poster' src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`} alt={movieData.title} />
                <div className="movie-overview">
                    <h3 className='singlepage-title'>{movieData.title}</h3>
                    <ul>
                    <li>Genres: {movieData.genres && movieData.genres.slice(0, movieData.genres.length - 1).map(genre => " " + genre.name ) + ", " + movieData.genres.at(-1).name}</li> 
                        <li>Released: {movieData.release_date}</li>
                        <li>Rating: <Badge pill bg="success">{movieData.vote_average} </Badge></li>
                    </ul>
                    <p className='movie-content'>{movieData.overview}</p>
                    {favorited ?
                    <button className="bottom-btns" onClick={() => dispatch(removeFavorite(movieData.id))}>
                        Unfavorite
                    </button> 
                    :
                    <button className="bottom-btns" onClick={() => dispatch(addFavorite(movieData))}>
                        Favorite
                    </button>
                    }
                </div>         
            </div>
        </div>
        <div className='bottom-movie-overview'>
            <h3>{movieData.title}</h3>
            {favorited ?
                    <button className="bottom-btns" onClick={() => dispatch(removeFavorite(movieData.id))}>
                        Unfavorite
                    </button> 
                    :
                    <button className="bottom-btns" onClick={() => dispatch(addFavorite(movieData))}>
                        Favorite
                    </button>
                    }
            <ul>
            <li>Genres: {movieData.genres && movieData.genres.slice(0, movieData.genres.length - 1).map(genre => " " + genre.name ) + ", " + movieData.genres.at(-1).name}</li> 
                <li>Released: {movieData.release_date}</li>
                <li>Rating: <Badge pill bg="success">{movieData.vote_average} </Badge></li>
            </ul>
            <p className='movie-content'>{movieData.overview}</p>
            </div>
        </div>
    )
}

export default SingleMoviePage
