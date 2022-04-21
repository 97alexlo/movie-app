import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./router/App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import favoritesReducer from "./features/favoritesSlice.js";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
