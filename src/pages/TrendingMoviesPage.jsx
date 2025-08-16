// src/pages/TrendingMoviesPage.jsx
import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, CircularProgress, Alert } from "@mui/material";
import MovieService from "../services/movie.service"; // Movie API service
import MovieCard from "../components/MovieCard"; // Reusable MovieCard component

const TrendingMoviesPage = () => {
  const [movies, setMovies] = useState([]); // State for trending movies
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error messages

  // Fetch trending movies on mount
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await MovieService.getTrendingMovies();
        setMovies(response.data);
      } catch (err) {
        setError("Failed to fetch trending movies. Please try again later.");
        console.error("Error fetching trending movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingMovies();
  }, []);

  // Loading spinner
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  // Error alert
  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 4, minHeight: "100vh", backgroundColor: "#000", color: "#fff" }}>
      {/* Updated heading */}
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          mt: 2,
          // New styling to match the professional homepage and category headings
          fontFamily: "'Playfair Display', serif",
          fontWeight: 800,
          letterSpacing: "1.5px",
          color: "#FFD700", // A more vibrant, solid gold color
          textShadow: "2px 2px 8px rgba(255, 255, 255, 0.2)",
          mb: 4,
          display: "block", // Ensure it's a block element for consistent spacing
        }}
      >
        Trending Movies
      </Typography>

      <Grid container spacing={3}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">
              No trending movies found yet. Add some recent reviews and likes!
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default TrendingMoviesPage;