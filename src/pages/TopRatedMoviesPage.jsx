import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, CircularProgress, Alert } from "@mui/material";
import MovieService from "../services/movie.service";
import MovieCard from "../components/MovieCard";

const TopRatedMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await MovieService.getTopRatedMovies();
        setMovies(response.data);
      } catch (err) {
        setError("Failed to fetch top-rated movies. Please try again later.");
        console.error("Error fetching top-rated movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopRatedMovies();
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
        p: 4,
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
      }}
    >
      <Typography
        variant="h4" // Updated variant for a more professional size
        component="h1"
        gutterBottom
        sx={{
          mt: 2,
          // New styling to match the professional homepage heading
          fontFamily: "'Playfair Display', serif",
          fontWeight: 800,
          letterSpacing: "1.5px",
          color: "#FFD700", // A more vibrant, solid gold color
          textShadow: "2px 2px 8px rgba(255, 255, 255, 0.2)",
          mb: 4,
        }}
      >
        Top Rated Movies
      </Typography>

      <Grid container spacing={3}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Grid
              item
              key={movie.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 280,
                  height: 420,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <MovieCard movie={movie} />
              </Box>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">
              No top-rated movies found yet. Add some reviews!
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default TopRatedMoviesPage;