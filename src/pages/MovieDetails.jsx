import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const { imdbID } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=289665eb`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  return (
    <div className="movie-details" style={styles.container}>
      {loading && <p style={styles.loadingContainer}>Loading...</p>}
      {!loading && (
        <div style={styles.movieDetails}>
          <img src={movie.Poster} alt={`${movie.Title} Poster`} style={styles.poster} />
          <h2>{movie.Title}</h2>
          <p>Year:{movie.Released}</p>
          <p>Genre:{movie.Genre}</p>
          <p>Rating:{movie.imdbRating}</p>
          <p>Director:{movie.Director}</p>
          <p>Actors:{movie.Actors}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
      padding: '20px',
      marginTop: '5%',
    },
    movieDetailsContainer: {
      display: 'flex', 
      marginLeft: '20px', 
    },
    movieDetails: {
      textAlign: 'left',
      marginLeft: '20px', 
    },
    poster: {
      width: '40%', 
      maxWidth: '300px', 
      margin: '20px 0', 
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', 
    },
  };
  