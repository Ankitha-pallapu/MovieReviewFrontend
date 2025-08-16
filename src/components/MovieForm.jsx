import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const MovieForm = ({ movie, onSubmit, onClose, formTitle }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const theme = useTheme();

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setGenre(movie.genre);
      setDescription(movie.description || "");
      setPosterUrl(movie.posterUrl || "");
      setReleaseDate(movie.releaseDate || "");
    } else {
      setTitle("");
      setGenre("");
      setDescription("");
      setPosterUrl("");
      setReleaseDate("");
    }
  }, [movie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: movie ? movie.id : null,
      title,
      genre,
      description,
      posterUrl,
      releaseDate,
    });
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        border: "1px solid #ccc",
        borderRadius: "16px",
        maxWidth: "900px",
        width: "100%",
        margin: "auto",
        mt: 0,
        bgcolor: "#1e1e1e",
        boxShadow: 6,
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {/* The Typography component for the subheading has been removed. */}

      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
            inputProps={{ style: { color: "white" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: theme.palette.grey[600] },
                "&:hover fieldset": { borderColor: theme.palette.primary.light },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFA500",
                },
                backgroundColor: "#2e2e2e",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Genre"
            variant="outlined"
            fullWidth
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
            inputProps={{ style: { color: "white" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: theme.palette.grey[600] },
                "&:hover fieldset": { borderColor: theme.palette.primary.light },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFA500",
                },
                backgroundColor: "#2e2e2e",
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
            inputProps={{ style: { color: "white" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: theme.palette.grey[600] },
                "&:hover fieldset": { borderColor: theme.palette.primary.light },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFA500",
                },
                backgroundColor: "#2e2e2e",
              },
              "& .MuiInputBase-inputMultiline": {
                "&::-webkit-scrollbar": { display: "none" },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Poster URL"
            variant="outlined"
            fullWidth
            value={posterUrl}
            onChange={(e) => setPosterUrl(e.target.value)}
            placeholder="e.g., https://example.com/movie-poster.jpg"
            InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
            inputProps={{ style: { color: "white" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: theme.palette.grey[600] },
                "&:hover fieldset": { borderColor: theme.palette.primary.light },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFA500",
                },
                backgroundColor: "#2e2e2e",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Release Date"
            variant="outlined"
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
              style: { color: theme.palette.text.secondary },
            }}
            inputProps={{ style: { color: "white" } }}
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: theme.palette.grey[600] },
                "&:hover fieldset": { borderColor: theme.palette.primary.light },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFA500",
                },
                backgroundColor: "#2e2e2e",
              },
            }}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          type="submit"
          sx={{
            mr: 2,
            background: "linear-gradient(to right, #ff7e5f, #feb47b)",
            color: "#000",
            fontWeight: "bold",
            "&:hover": {
              background: "linear-gradient(to right, #feb47b, #ff7e5f)",
            },
          }}
        >
          {movie ? "Update Movie" : "Add Movie"}
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            borderColor: "#FFA500",
            color: "#FFA500",
            "&:hover": {
              borderColor: "#FFD700",
              backgroundColor: "rgba(255, 165, 0, 0.1)",
            },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default MovieForm;