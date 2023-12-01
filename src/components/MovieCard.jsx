import React from "react";
import { Link } from "react-router-dom";
import "../css/Moviecard.css";

export const MovieCard = ({ movie }) => {
  const addToFavorites = () => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites-movies")) || [];

    const isAlreadyInFavorites = favorites.some(
      (fav) => fav.imdbID === movie.imdbID
    );

    if (!isAlreadyInFavorites) {
      favorites.push(movie);

      localStorage.setItem("favorites-movies", JSON.stringify(favorites));
      alert("Movie added to favorites!");
    } else {
      alert("Movie is already in favorites!");
    }
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        <img src={movie.Poster} alt={`${movie.Title} Poster`} />
        <h5>{movie.Title}</h5>
        <p>Year:{movie.Year}</p>
      </Link>
      <button onClick={addToFavorites}>Add to Favorites</button>
    </div>
  );
};
