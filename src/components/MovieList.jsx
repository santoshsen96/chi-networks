
import React from 'react';
import { MovieCard } from './MovieCard';

const MovieList = ({ movies, favorites, addToFavorites }) => {
  return (
    <div style={styles.movieList}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
          addToFavorites={addToFavorites}
        />
      ))}
    </div>
  );
};

const styles = {
  movieList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    maxWidth: '1200px', 
    margin: '0 auto',
  },
};

export default MovieList;
