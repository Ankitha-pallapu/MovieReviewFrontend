import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Rating,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import theme from "../theme";

const MovieCard = ({ movie }) => {
  const defaultPoster = "https://via.placeholder.com/200x300?text=No+Poster";

  return (
    <Card
      component={Link}
      to={`/movies/${movie.id}`}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "12px",
        boxShadow: theme.components.MuiCard.styleOverrides.root.boxShadow,
        background: "linear-gradient(135deg, #FF5733 0%, #FFC300 100%)",
        textDecoration: "none",
        color: "#fff",
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      {/* Fixed height for poster */}
      {movie.posterUrl ? (
        <CardMedia
          component="img"
          image={movie.posterUrl}
          alt={`${movie.title} Poster`}
          sx={{
            width: "100%",
            height: 300,
            objectFit: "cover",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: 300,
            backgroundColor: "grey.800",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        >
          <Typography variant="caption" sx={{ color: "grey.300" }}>
            No Poster
          </Typography>
        </Box>
      )}

      {/* Content fills remaining space */}
      <CardContent
        sx={{
          flexGrow: 1,
          p: 1.5,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Title and year with fixed height */}
        <Box sx={{ minHeight: 45 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              lineHeight: 1.2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {movie.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#fff" }}>
            {movie.releaseDate
              ? new Date(movie.releaseDate).getFullYear()
              : "N/A"}
          </Typography>
        </Box>

        {/* Rating and likes always at bottom */}
        <Box sx={{ mt: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating
              name="read-only"
              value={movie.averageRating || 0}
              readOnly
              size="small"
              sx={{
                "& .MuiRating-iconFilled": { color: "#FFD700" },
                "& .MuiRating-iconEmpty": { color: "#fff" },
              }}
            />
            <Typography variant="body2" sx={{ color: "#fff" }}>
              ({movie.averageRating ? movie.averageRating.toFixed(1) : "N/A"})
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{ mt: 0.5 }}
          >
            <FavoriteIcon fontSize="inherit" sx={{ color: "#FF4500" }} />
            <Typography variant="body2" sx={{ color: "#fff" }}>
              {movie.likeCount || 0} Likes
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
