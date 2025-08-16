import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Divider,
  Grid,
} from "@mui/material";
import MovieCard from "../components/MovieCard";
import MovieCategoryRow from "../components/MovieCategoryRow";
import ReviewService from "../services/review.service";
import TrendingRecommendationService from "../services/trending-recommendation.service";
import { Link } from "react-router-dom";

const UserDashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [myReviews, setMyReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!isAuthenticated || !user || !user.id) {
        setLoading(false);
        return;
      }

      try {
        // This is the correct API call to fetch recommendations
        const recsResponse =
          await TrendingRecommendationService.getPersonalizedRecommendations(
            user.id
          );
        // The state is correctly updated with the API response
        setRecommendedMovies(recsResponse.data);

        const reviewsResponse = await ReviewService.getReviewsByUserId(user.id);
        setMyReviews(reviewsResponse.data);

        const countResponse = await ReviewService.countReviewsByUserId(user.id);
        setReviewCount(countResponse.data);
      } catch (err) {
        setError("Failed to fetch dashboard data.");
        console.error("Dashboard data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user, isAuthenticated]);

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
    <Box sx={{ p: 3, bgcolor: "#000", color: "#fff", minHeight: "100vh" }}>
      {/* Profile Section */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: "flex",
          alignItems: "center",
          mb: 4,
          bgcolor: "grey.900",
        }}
      >
        <Box
          sx={{
            // Updated profile icon background color
            bgcolor: "#FFB74D",
            color: "black", // Changed text color for better contrast
            width: 80,
            height: 80,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3rem",
            mr: 3,
            fontWeight: "bold",
          }}
        >
          {user.email ? user.email.charAt(0).toUpperCase() : "U"}
        </Box>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {user.email}
          </Typography>
          <Typography variant="h6" mt={1}>
            Reviews: {reviewCount}
          </Typography>
        </Box>
      </Paper>

      <Divider sx={{ my: 4, borderColor: "#444" }} />

      {/* My Reviews Section */}
      <Typography
        variant="h4" // Consistent heading size
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
        My Reviews
      </Typography>
      <Box sx={{ mt: 2 }}>
        {myReviews.length > 0 ? (
          myReviews.map((review) => (
            <Paper key={review.id} sx={{ p: 2, mb: 2, bgcolor: "#111" }}>
              <Typography variant="h6" fontWeight="bold">
                <Link
                  to={`/movies/${review.movieId}`}
                  style={{ textDecoration: "none", color: "#FFB74D" }}
                >
                  {review.movieTitle}
                </Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(review.timestamp).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {review.content}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            You haven't posted any reviews yet.
          </Typography>
        )}
      </Box>

      <Divider sx={{ my: 4, borderColor: "#444" }} />

      {/* Recommended Movies Section */}
      <Typography
        variant="h4" // Consistent heading size
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
        Recommended Movies
      </Typography>
      <Box sx={{ mt: 2 }}>
        {recommendedMovies.length > 0 ? (
          <MovieCategoryRow movies={recommendedMovies} />
        ) : (
          <Typography variant="body1" color="text.secondary">
            No recommendations yet. Review some movies to get personalized
            suggestions!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default UserDashboardPage;