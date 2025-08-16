import React, { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  CircularProgress,
  Alert,
  TextField,
  IconButton,
} from "@mui/material";
import MovieService from "../services/movie.service";
import MovieCard from "../components/MovieCard";
import SearchIcon from "@mui/icons-material/Search";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setMovies([]);
      setSearched(true);
      return;
    }
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const response = await MovieService.searchMovies(query);
      setMovies(response.data);
    } catch (err) {
      setError("Failed to perform search. Please try again.");
      console.error("Error searching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Updated Heading */}
      <Typography
        variant="h4" // Using h4 for consistency with other pages
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 800, // Matching the professional heading style
          letterSpacing: "1.5px",
          color: "#FFD700",
          fontFamily: "'Playfair Display', serif", // Matching the font
          textShadow: "2px 2px 8px rgba(255, 255, 255, 0.2)",
          mb: 4,
          textAlign: "center",
        }}
      >
        Search Movies
      </Typography>

      {/* Search Bar */}
      <Box
        display="flex"
        alignItems="center"
        sx={{
          maxWidth: "600px",
          mx: "auto",
          p: 1,
          borderRadius: "25px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
          mb: 4,
        }}
      >
        <TextField
          fullWidth
          variant="standard"
          placeholder="Search by title, genre, or year"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            disableUnderline: true,
            sx: {
              color: "white",
              px: 2,
            },
          }}
          sx={{
            flexGrow: 1,
            "& .MuiInputBase-input::placeholder": {
              color: "rgba(255, 255, 255, 0.7)",
            },
          }}
        />
        <IconButton
          onClick={handleSearch}
          sx={{
            color: "white",
            background: "linear-gradient(90deg, #FFA500, #FFD700)",
            borderRadius: "50%",
            p: 1,
            "&:hover": {
              background: "linear-gradient(90deg, #FFA500, #FFD700)",
              opacity: 0.9,
            },
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      )}

      {!loading && searched && movies.length === 0 && (
        <Alert severity="info" sx={{ mt: 4 }}>
          No movies found matching your search query.
        </Alert>
      )}

      {!loading && movies.length > 0 && (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SearchPage;