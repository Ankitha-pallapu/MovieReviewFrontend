import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CommentForm = ({ reviewId, parentCommentId, onSubmit, onClose }) => {
  const [content, setContent] = useState("");
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      reviewId: reviewId,
      content: content,
      parentCommentId: parentCommentId || null,
    });
    setContent("");
    if (onClose) onClose();
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
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "8px",
        bgcolor: "#121212",
        color: "white",
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h6" gutterBottom color="#FFA500">
        {" "}
        {/* Updated color here */}
        {parentCommentId ? "Reply to Comment" : "Add a Comment"}
      </Typography>
      <TextField
        label="Your Comment"
        variant="outlined"
        multiline
        rows={3}
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        InputLabelProps={{
          style: { color: theme.palette.grey[400] },
        }}
        InputProps={{
          style: {
            color: "white",
            backgroundColor: "#1e1e1e",
          },
        }}
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: theme.palette.grey[600] },
            "&:hover fieldset": { borderColor: theme.palette.primary.light },
            "&.Mui-focused fieldset": {
              borderColor: "#FFA500",
            },
          },
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <Button
          variant="contained"
          type="submit"
          sx={{
            mr: 1,
            background: "linear-gradient(90deg, #FFA500, #FFD700)",
            color: "black",
            fontWeight: "bold",
            "&:hover": {
              background: "linear-gradient(90deg, #FF8C00, #FFC300)",
            },
          }}
        >
          Submit Comment
        </Button>
        {onClose && (
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CommentForm;
