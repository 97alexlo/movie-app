import { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
    // on page load check if localstorage has favorites, otherwise ouput empty array
    favorites: localStorage.getItem('favorites') !== null ? JSON.parse(localStorage.getItem('favorites')) : []
};

// create context
export const GlobalContext = createContext(initialState)

// provider components
export const GlobalProvider = props => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(state.favorites))
    }, [state])

    //actions 
    const addMovieToFavorites = movie => {
        dispatch({
            type: "ADD_MOVIE_TO_FAVORITES", 
            payload: movie
        })
    }

    const removeMovieFromFavorites = movieID => {
        dispatch({
            type: "REMOVE_MOVIE_FROM_FAVORITES", 
            payload: movieID
        })
    }

    return (
        <GlobalContext.Provider value={{
            favorites: state.favorites,
            addMovieToFavorites,
            removeMovieFromFavorites}}>
            {props.children}
        </GlobalContext.Provider>
    )
}