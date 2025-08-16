// src/pages/AdminMovieManagementPage.jsx (Optimized Table Layout & Spacing)
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import MovieService from "../services/movie.service";
import MovieForm from "../components/MovieForm"; // The form component
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import theme from "../theme";

const AdminMovieManagementPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  const fetchMovies = async () => {
    try {
      const response = await MovieService.getAllMovies();
      setMovies(response.data);
    } catch (err) {
      setError(err.response?.data || "Failed to fetch movies.");
      console.error("Error fetching movies for admin:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleAddMovie = () => {
    setEditingMovie(null);
    setShowForm(true);
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleDeleteMovie = async (movieId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this movie? This will also delete all associated reviews, comments, and likes!"
      )
    ) {
      try {
        await MovieService.deleteMovie(movieId);
        fetchMovies();
      } catch (err) {
        setError(err.response?.data || "Failed to delete movie.");
        console.error("Error deleting movie:", err);
      }
    }
  };

  const handleMovieFormSubmit = async (movieData) => {
    try {
      if (movieData.id) {
        await MovieService.updateMovie(movieData.id, movieData);
      } else {
        await MovieService.createMovie(movieData);
      }
      setShowForm(false);
      setEditingMovie(null);
      fetchMovies();
    } catch (err) {
      setError(err.response?.data || "Failed to save movie.");
      console.error("Error saving movie:", err);
    }
  };

  const defaultThumbnail = "https://via.placeholder.com/50x75?text=No";

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
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 0,
      }}
    >
      {/* Main title for the page */}
      {!showForm && (
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            mt: 2,
            mb: 3,
            ml: 3,
            alignSelf: "flex-start",
            // Applied professional font styling
            fontFamily: "'Playfair Display', serif",
            fontWeight: 800,
            letterSpacing: "1.5px",
            color: "#FFD700",
            textShadow: "2px 2px 8px rgba(255, 255, 255, 0.2)",
          }}
        >
          Manage Movies
        </Typography>
      )}

      {/* Render MovieForm */}
      {showForm && (
        <>
          <Typography
            variant="h4" // Using h4 for consistency
            component="h2"
            gutterBottom
            sx={{
              mt: 2,
              mb: 3,
              textAlign: "center",
              // Applied professional font styling
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              letterSpacing: "1.5px",
              color: "#FFD700",
              textShadow: "2px 2px 8px rgba(255, 255, 255, 0.2)",
            }}
          >
            {editingMovie ? "Edit Movie" : "Add New Movie"}
          </Typography>
          <MovieForm
            movie={editingMovie}
            onSubmit={handleMovieFormSubmit}
            onClose={() => {
              setShowForm(false);
              setEditingMovie(null);
            }}
            formTitle={editingMovie ? "Edit Movie" : "Add New Movie"}
          />
        </>
      )}

      {/* Add New Movie button */}
      {!showForm && (
        <Button
          variant="contained"
          onClick={handleAddMovie}
          sx={{
            mb: 2,
            ml: 3,
            alignSelf: "flex-start",
            background: "linear-gradient(to right, #ff7e5f, #feb47b)",
            color: "#000",
            fontWeight: "bold",
            "&:hover": {
              background: "linear-gradient(to right, #feb47b, #ff7e5f)",
            },
          }}
        >
          Add New Movie
        </Button>
      )}

      {/* Movie Table */}
      {!showForm && movies.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.components.MuiCard.styleOverrides.root.boxShadow,
            borderRadius:
              theme.components.MuiCard.styleOverrides.root.borderRadius,
            p: 3, // Padding inside the TableContainer
            width: "100%", // Ensure table container takes full width
            // No explicit height here, allowing overflowY on App.jsx container to handle scroll
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="movie management table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white" }}>ID</TableCell>
                <TableCell sx={{ color: "white" }}>Title</TableCell>
                <TableCell sx={{ color: "white" }}>Genre</TableCell>
                <TableCell sx={{ color: "white" }}>Release Date</TableCell>
                <TableCell sx={{ color: "white" }}>Poster</TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell sx={{ color: "text.secondary" }}>
                    {movie.id}
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    {movie.title}
                  </TableCell>
                  <TableCell sx={{ color: "text.secondary" }}>
                    {movie.genre}
                  </TableCell>
                  <TableCell sx={{ color: "text.secondary" }}>
                    {movie.releaseDate}
                  </TableCell>
                  <TableCell>
                    {movie.posterUrl ? (
                      <Box
                        component="img"
                        src={movie.posterUrl}
                        alt={`${movie.title} Poster`}
                        sx={{
                          width: 50,
                          height: 75,
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      <Box
                        component="img"
                        src={defaultThumbnail}
                        alt="No Poster"
                        sx={{
                          width: 50,
                          height: 75,
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditMovie(movie)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteMovie(movie.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!showForm && movies.length === 0 && (
        <Typography
          variant="body1"
          sx={{ color: "white", mt: 4, ml: 3, alignSelf: "flex-start" }}
        >
          No movies to manage. Add one!
        </Typography>
      )}
    </Box>
  );
};

export default AdminMovieManagementPage;