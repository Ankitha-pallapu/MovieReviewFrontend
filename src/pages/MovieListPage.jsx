import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import MovieService from "../services/movie.service";
import MovieCategoryRow from "../components/MovieCategoryRow";

const MovieListPage = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [tollywoodGems, setTollywoodGems] = useState([]);
  const [bollywoodGems, setBollywoodGems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const allMoviesResponse = await MovieService.getAllMovies();
        setAllMovies(allMoviesResponse.data);

        const tollywoodResponse = await MovieService.getMoviesByGenre(
          "Tollywood"
        );
        setTollywoodGems(tollywoodResponse.data);

        const bollywoodResponse = await MovieService.getMoviesByGenre(
          "Bollywood"
        );
        setBollywoodGems(bollywoodResponse.data);
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.");
        console.error("Error fetching movie data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategories();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#000", // black background
        color: "#fff", // white text
        minHeight: "100vh",
        py: 2,
      }}
    >
      {/* Tollywood Gems */}
      <MovieCategoryRow
        title="Tollywood Gems"
        movies={tollywoodGems}
        cardSx={{
          background: "linear-gradient(135deg, #FF5733 0%, #FFC300 100%)",
          color: "#fff",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
          "& .MuiTypography-body2": { color: "#fff" },
        }}
      />

      {/* Bollywood Gems */}
      <MovieCategoryRow
        title="Bollywood Gems"
        movies={bollywoodGems}
        cardSx={{
          background: "linear-gradient(135deg, #FF5733 0%, #FFC300 100%)",
          color: "#fff",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
          "& .MuiTypography-body2": { color: "#fff" },
        }}
      />

      {/* All Movies */}
      <MovieCategoryRow
        title="All Movies"
        movies={allMovies}
        cardSx={{
          background: "linear-gradient(135deg, #FF5733 0%, #FFC300 100%)",
          color: "#fff",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
          "& .MuiTypography-body2": { color: "#fff" },
        }}
      />
    </Box>
  );
};

export default MovieListPage;
