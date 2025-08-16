// src/components/ReviewForm.jsx
import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Rating } from "@mui/material";

const ReviewForm = ({ review, movieId, onSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setContent(review.content);
    } else {
      setRating(0);
      setContent("");
    }
  }, [review]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: review ? review.id : null,
      movieId: movieId,
      rating: rating,
      content: content,
    });
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        mt: 2,
        p: 2,
        border: "1px solid #333",
        borderRadius: "8px",
        bgcolor: "#111",
        color: "#fff",
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h6" gutterBottom sx={{ color: "#FFB74D" }}>
        {review ? "Edit Your Review" : "Add Your Review"}
      </Typography>

      <Rating
        name="rating"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Your Review"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            color: "#fff",
            "& fieldset": {
              borderColor: "#555",
            },
            "&:hover fieldset": {
              borderColor: "#888",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#aaa",
          },
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <Button
          variant="contained"
          type="submit"
          sx={{
            mr: 1,
            background: "linear-gradient(to right, #ff7e5f, #feb47b)",
            color: "#000",
            fontWeight: "bold",
            "&:hover": {
              background: "linear-gradient(to right, #feb47b, #ff7e5f)",
            },
          }}
        >
          {review ? "Update Review" : "Submit Review"}
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            borderColor: "#888",
            color: "#fff",
            "&:hover": {
              borderColor: "#bbb",
              backgroundColor: "#222",
            },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewForm;