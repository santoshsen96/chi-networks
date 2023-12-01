import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";
import { FaSearch } from "react-icons/fa";

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("year");
  const [genreFilter, setGenreFilter] = useState("");
  const [releaseYearFilter, setReleaseYearFilter] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=289665eb&page=${page}`

      );

      setMovies((prevMovies) => [...prevMovies, ...(response.data.Search || [])]);
      setHasMore(response.data.Search && response.data.Search.length > 0);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }finally {
        setLoading(false);
        setIsLoadingMore(false);
      }
  };

  const addToFavorites = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };


  const handleSearch = () => {
    setPage(1);
    fetchMovies();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setPage(1);
      fetchMovies();
    }
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleReleaseYearFilterChange = (e) => {
    setReleaseYearFilter(e.target.value);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  // Sorting logic
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortCriteria === "year") {
      return b.Year.localeCompare(a.Year);
    } else if (sortCriteria === "rating") {
      return parseFloat(b.imdbRating) - parseFloat(a.imdbRating);
    }
    return 0;
  });

  // Filtering logic
  const filteredMovies = sortedMovies.filter((movie) => {
    const genreMatch =
      genreFilter === "" || (movie.Genre && movie.Genre.includes(genreFilter));

    const releaseYearMatch =
      releaseYearFilter === "" ||
      (movie.Year && movie.Year.includes(releaseYearFilter));

    return genreMatch && releaseYearMatch;
  });

  useEffect(() => {
    fetchMovies();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  

  return (
    <div style={styles.container}>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          style={styles.input}
        />
        <FaSearch style={styles.searchIcon} onClick={handleSearch} />
      </div>
      <div style={styles.filterContainer}>
        <label style={styles.filterLabel}>
          Sort by:
          <select
            value={sortCriteria}
            onChange={handleSortChange}
            style={styles.select}
          >
            <option value="year">Year(High to Low)</option>
            <option value="rating">Rating(High to Low)</option>
          </select>
        </label>
        <label style={styles.filterLabel}>
          Release Year Filter:
          <input
            type="text"
            placeholder="Enter release year..."
            value={releaseYearFilter}
            onChange={handleReleaseYearFilterChange}
            style={styles.input}
          />
        </label>
      </div>
      {loading && <p>Loading...</p>}
      {isLoadingMore && <p>Loading more...</p>}
      <MovieList
        movies={filteredMovies}
        favorites={favorites}
        addToFavorites={addToFavorites}
      />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "20px",
    marginTop: "7%",
  },
  inputContainer: {
    position: "relative",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
  },
  searchIcon: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    cursor: "pointer",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  filterLabel: {
    flex: "1",
    marginRight: "10px",
  },
  select: {
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
  },
};
