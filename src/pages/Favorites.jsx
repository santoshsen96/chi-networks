import React, { useState, useEffect } from 'react';
import '../css/Favorite.css'
export const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites-movies')) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (imdbID) => {
    const updatedFavorites = favorites.filter((movie) => movie.imdbID !== imdbID);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites-movies', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites">
      <h2>Favorites</h2>
      <div className="favorite-movies">
        {favorites.map((movie) => (
          <div key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={`${movie.Title} Poster`} />
            <button onClick={() => removeFromFavorites(movie.imdbID)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

