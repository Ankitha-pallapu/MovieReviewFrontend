import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Button,
  Rating,
  Divider,
} from "@mui/material";
import MovieService from "../services/movie.service";
import ReviewService from "../services/review.service";
import { useAuth } from "../context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReviewForm from "../components/ReviewForm";
import CommentForm from "../components/CommentForm";
import { useTheme } from "@mui/material/styles";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { user, isAuthenticated, userRole } = useAuth();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [hasReviewed, setHasReviewed] = useState(false);
  const theme = useTheme();

  const fetchMovieAndReviews = async () => {
    try {
      const movieRes = await MovieService.getMovieById(id);
      setMovie(movieRes.data);

      const reviewsRes = await ReviewService.getReviewsByMovieId(id);
      const reviewsWithDetails = await Promise.all(
        reviewsRes.data.map(async (review) => {
          const commentsRes = await ReviewService.getCommentsByReviewId(
            review.id
          );
          const likeCountRes = await ReviewService.getLikeCountForReview(
            review.id
          );
          const hasLikedRes =
            isAuthenticated && user
              ? await ReviewService.hasUserLikedReview(review.id, user.id)
              : { data: false };
          return {
            ...review,
            comments: commentsRes.data,
            likeCount: likeCountRes.data,
            hasLiked: hasLikedRes.data,
          };
        })
      );
      setReviews(reviewsWithDetails);

      if (isAuthenticated && user) {
        setHasReviewed(
          reviewsRes.data.some((review) => review.userId === user.id)
        );
      }
    } catch (err) {
      setError(
        "Failed to fetch movie details. Please check the movie ID or try again."
      );
      console.error("Error fetching movie details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieAndReviews();
  }, [id, user, isAuthenticated]);

  const handleReviewSubmit = async (reviewData) => {
    try {
      if (reviewData.id) {
        await ReviewService.updateReview(reviewData.id, reviewData);
      } else {
        await ReviewService.addReview(id, reviewData);
      }
      setShowReviewForm(false);
      setEditingReview(null);
      fetchMovieAndReviews();
    } catch (err) {
      setError(err.response?.data || "Failed to submit review.");
      console.error("Error submitting review:", err);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await ReviewService.deleteReview(reviewId);
        fetchMovieAndReviews();
      } catch (err) {
        setError(err.response?.data || "Failed to delete review.");
        console.error("Error deleting review:", err);
      }
    }
  };

  const handleLikeToggle = async (reviewId, hasLiked) => {
    if (!isAuthenticated) {
      alert("Please log in to like reviews.");
      return;
    }
    try {
      if (hasLiked) {
        await ReviewService.unlikeReview(reviewId);
      } else {
        await ReviewService.likeReview(reviewId);
      }
      fetchMovieAndReviews();
    } catch (err) {
      setError(err.response?.data || "Failed to toggle like.");
      console.error("Error toggling like:", err);
    }
  };

  const handleCommentSubmit = async (commentData) => {
    if (!isAuthenticated) {
      alert("Please log in to comment.");
      return;
    }
    try {
      await ReviewService.addComment(commentData.reviewId, {
        content: commentData.content,
        parentId: commentData.parentCommentId,
      });
      fetchMovieAndReviews();
    } catch (err) {
      setError(err.response?.data || "Failed to add comment.");
      console.error("Error adding comment:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await ReviewService.deleteComment(commentId);
        fetchMovieAndReviews();
      } catch (err) {
        setError(err.response?.data || "Failed to delete comment.");
        console.error("Error deleting comment:", err);
      }
    }
  };

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

  if (!movie) {
    return (
      <Alert severity="info" sx={{ mt: 4 }}>
        Movie not found.
      </Alert>
    );
  }

  const defaultPoster = "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <Box sx={{ p: 3, bgcolor: "#000", color: "#fff", minHeight: "100vh" }}>
      <Box display="flex" alignItems="flex-start" sx={{ mb: 4 }}>
        <Box
          component="img"
          src={movie.posterUrl || defaultPoster}
          alt={`${movie.title} Poster`}
          sx={{
            width: 250,
            height: 375,
            objectFit: "cover",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
            mr: 4,
            flexShrink: 0,
          }}
        />
        <Box>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              mt: 2,
              // Applied professional font styling
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              letterSpacing: "1.5px",
              color: "#FFD700",
              textShadow: "2px 2px 8px rgba(255, 255, 255, 0.2)",
            }}
          >
            {movie.title} (
            {movie.releaseDate
              ? new Date(movie.releaseDate).getFullYear()
              : "N/A"}
            )
          </Typography>
          <Typography variant="h6" sx={{ color: "#bbb" }} gutterBottom>
            Genre: {movie.genre} | Released: {movie.releaseDate}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
            {movie.description}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 4, borderColor: "#444" }} />
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ 
          // Applied professional font styling
          fontFamily: "'Playfair Display', serif",
          fontWeight: 800,
          letterSpacing: "1.5px",
          color: "#FFD700",
          textShadow: "2px 2px 8px rgba(255, 255, 255, 0.2)",
          mb: 2,
        }}
      >
        Reviews
      </Typography>

      {isAuthenticated &&
        userRole === "REVIEWER" &&
        !hasReviewed &&
        !showReviewForm && (
          <Button
            variant="contained"
            onClick={() => setShowReviewForm(true)}
            sx={{
              mb: 2,
              background: "linear-gradient(to right, #ff7e5f, #feb47b)",
              color: "#000",
              fontWeight: "bold",
              "&:hover": {
                background: "linear-gradient(to right, #feb47b, #ff7e5f)",
              },
            }}
          >
            Write a Review
          </Button>
        )}

      {(showReviewForm || editingReview) && (
        <ReviewForm
          movie={movie}
          movieId={movie.id}
          review={editingReview}
          onSubmit={handleReviewSubmit}
          onClose={() => {
            setShowReviewForm(false);
            setEditingReview(null);
          }}
        />
      )}

      {reviews.length === 0 && !showReviewForm && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No reviews yet. Be the first to add one!
        </Typography>
      )}

      <Box sx={{ mt: 3 }}>
        {reviews.map((review) => (
          <Paper
            key={review.id}
            sx={{
              p: 2,
              mb: 3,
              display: "flex",
              flexDirection: "column",
              bgcolor: "#111",
              color: "#fff",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {review.userEmail}
              </Typography>
              <Rating value={review.rating} readOnly size="small" />
            </Box>
            <Typography variant="body2" sx={{ color: "#aaa", mb: 1 }}>
              {new Date(review.timestamp).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {review.content}
            </Typography>

            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
              {isAuthenticated && userRole === "REVIEWER" && (
                <Button
                  size="small"
                  onClick={() => handleLikeToggle(review.id, review.hasLiked)}
                  startIcon={
                    review.hasLiked ? <ThumbDownIcon /> : <ThumbUpIcon />
                  }
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
                  {review.hasLiked ? "Unlike" : "Like"}
                </Button>
              )}
              <Typography variant="body2" sx={{ color: "#bbb" }}>
                {review.likeCount} Likes
              </Typography>

              {isAuthenticated &&
                review.userId === user.id &&
                userRole === "REVIEWER" && (
                  <>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setEditingReview(review);
                        setShowReviewForm(true);
                      }}
                      sx={{
                        ml: 2,
                        mr: 1,
                        background:
                          "linear-gradient(to right, #ff7e5f, #feb47b)",
                        color: "#000",
                        fontWeight: "bold",
                        "&:hover": {
                          background:
                            "linear-gradient(to right, #feb47b, #ff7e5f)",
                        },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}

              {isAuthenticated &&
                userRole === "ADMIN" &&
                review.userId !== user.id && (
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteReview(review.id)}
                    sx={{ ml: 2 }}
                  >
                    Delete (Admin)
                  </Button>
                )}
            </Box>

            <Divider sx={{ my: 1, borderColor: "#444" }} />
            <Typography variant="h6" sx={{ mt: 2, color: "#FFB74D" }}>
              Comments
            </Typography>
            <Box sx={{ ml: 2, mt: 1 }}>
              {review.comments.length > 0 ? (
                review.comments.map((comment) => (
                  <Paper
                    key={comment.id}
                    sx={{
                      p: 1.5,
                      mb: 1.5,
                      bgcolor: "#222",
                      color: "white",
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="subtitle2" fontWeight="bold">
                        {comment.userEmail}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#bbb" }}>
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography variant="body2">{comment.content}</Typography>
                    {isAuthenticated &&
                      (userRole === "ADMIN" ||
                        (userRole === "REVIEWER" &&
                          comment.userId === user.id)) && (
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleDeleteComment(comment.id)}
                          startIcon={<DeleteIcon />}
                          sx={{ mt: 0.5 }}
                        >
                          Delete
                        </Button>
                      )}
                  </Paper>
                ))
              ) : (
                <Typography variant="body2" sx={{ color: "#bbb" }}>
                  No comments yet.
                </Typography>
              )}
              {isAuthenticated && (
                <CommentForm
                  reviewId={review.id}
                  onSubmit={handleCommentSubmit}
                />
              )}
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default MovieDetailPage;