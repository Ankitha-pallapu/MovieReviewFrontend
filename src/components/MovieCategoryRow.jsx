import React, { useRef } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MovieCard from "./MovieCard";

const MovieCategoryRow = ({ title, movies }) => {
  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <Box sx={{ my: 4, position: "relative" }}>
      {/* Category Title */}
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 800,
          letterSpacing: "1.5px",
          color: "#FFD700", // A more vibrant, solid gold color
          textShadow: "2px 2px 8px rgba(255, 255, 255, 0.2)", // Stronger shadow for better visibility
          mb: 2,
        }}
      >
        {title}
      </Typography>

      {/* Scroll Left Button */}
      <IconButton
        onClick={() => scroll(-300)}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          zIndex: 10,
          bgcolor: "rgba(0, 0, 0, 0.5)",
          "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
          display: { xs: "none", md: "block" },
        }}
      >
        <ArrowBackIosIcon sx={{ color: "white" }} />
      </IconButton>

      {/* Scrollable Movie Cards */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          gap: 2,
          py: 1,
          overflowX: "auto",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          MsOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Box key={movie.id} sx={{ flexShrink: 0, width: 250 }}>
              <MovieCard movie={movie} />
            </Box>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No movies found in this category.
          </Typography>
        )}
      </Box>

      {/* Scroll Right Button */}
      <IconButton
        onClick={() => scroll(300)}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          zIndex: 10,
          bgcolor: "rgba(0, 0, 0, 0.5)",
          "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
          display: { xs: "none", md: "block" },
        }}
      >
        <ArrowForwardIosIcon sx={{ color: "white" }} />
      </IconButton>
    </Box>
  );
};

export default MovieCategoryRow;