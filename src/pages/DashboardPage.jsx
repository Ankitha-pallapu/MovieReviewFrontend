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
import MovieCard from "../components/MovieCard"; // Reuse the card component
import MovieCategoryRow from "../components/MovieCategoryRow"; // Reuse the row component
import ReviewService from "../services/review.service";
import TrendingRecommendationService from "../services/trending-recommendation.service";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [myReviews, setMyReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        return;
      }
      try {
        // Fetch personalized recommendations
        const recsResponse =
          await TrendingRecommendationService.getPersonalizedRecommendations(
            user.id
          );
        setRecommendedMovies(recsResponse.data);

        // Fetch user's reviews
        const reviewsResponse = await ReviewService.getReviewsByUserId(user.id);
        setMyReviews(reviewsResponse.data);

        // Fetch review count
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
    <Box sx={{ p: 3 }}>
      {/* Profile Section */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: "flex",
          alignItems: "center",
          mb: 4,
          // Change this line to set the background color to a light purple
          bgcolor: "#E0BBE4",
        }}
      >
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            width: 80,
            height: 80,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3rem",
            mr: 3,
          }}
        >
          {user.email ? user.email.charAt(0).toUpperCase() : "U"}
        </Box>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {user.email}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Joined {new Date(user.timestamp).getFullYear()}
          </Typography>
          <Typography variant="h6" mt={1}>
            Reviews: {reviewCount}
          </Typography>
        </Box>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* My Reviews Section */}
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ color: "white" }}
      >
        My Reviews
      </Typography>
      <Box sx={{ mt: 2 }}>
        {myReviews.length > 0 ? (
          myReviews.map((review) => (
            <Paper
              key={review.id}
              sx={{
                p: 2,
                mb: 2,
                // Change this line to set the background color to a light purple
                bgcolor: "#E0BBE4",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                <Link
                  to={`/movies/${review.movieId}`}
                  style={{ textDecoration: "none", color: "white" }}
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

      <Divider sx={{ my: 4 }} />

      {/* Recommended Movies Section */}
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ color: "white" }}
      >
        Recommended Movies
      </Typography>
      <Box sx={{ mt: 2 }}>
        {recommendedMovies.length > 0 ? (
          <MovieCategoryRow title="" movies={recommendedMovies} />
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

export default DashboardPage;
