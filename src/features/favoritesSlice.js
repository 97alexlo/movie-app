import {createSlice} from "@reduxjs/toolkit"

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        value: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []
    },
    reducers: {
        addFavorite: (state, action) => {
            state.value = [...state.value, action.payload]
            localStorage.setItem('favorites', JSON.stringify(state.value))
        },
        removeFavorite: (state, action) => {
            state.value = state.value.filter(movie => movie.id !== action.payload)
            localStorage.setItem('favorites', JSON.stringify(state.value))
        }
    }
});

export const {addFavorite, removeFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer
