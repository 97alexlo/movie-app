export default function AppReducer(state, action) {

    switch(action.type) {
        case "ADD_MOVIE_TO_FAVORITES":
            return {
                favorites: [action.payload, ...state.favorites]
            }
        case "REMOVE_MOVIE_FROM_FAVORITES":
            return {
                favorites: state.favorites.filter(movie => movie.id !== action.payload)
            }
        default:
            return state;
    }
}