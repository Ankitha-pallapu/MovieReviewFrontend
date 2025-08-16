// src/services/review.service.js
import api from "./api";

class ReviewService {
  addReview(movieId, review) {
    return api.post(`/reviews/movie/${movieId}`, review);
  }

  getReviewsByMovieId(movieId) {
    return api.get(`/reviews/movie/${movieId}`);
  }

  updateReview(reviewId, review) {
    return api.put(`/reviews/${reviewId}`, review);
  }

  deleteReview(reviewId) {
    return api.delete(`/reviews/${reviewId}`);
  }

  // --- NEW METHODS FOR THE DASHBOARD ---
  getReviewsByUserId(userId) {
    return api.get(`/reviews/user/${userId}`);
  }

  countReviewsByUserId(userId) {
    return api.get(`/reviews/user/${userId}/count`);
  }

  // Comments
  addComment(reviewId, comment) {
    return api.post(`/comments/review/${reviewId}`, comment);
  }

  getCommentsByReviewId(reviewId) {
    return api.get(`/comments/review/${reviewId}`);
  }

  deleteComment(commentId) {
    return api.delete(`/comments/${commentId}`);
  }

  // Likes
  likeReview(reviewId) {
    return api.post(`/likes/review/${reviewId}`);
  }

  unlikeReview(reviewId) {
    return api.delete(`/likes/review/${reviewId}`);
  }

  getLikeCountForReview(reviewId) {
    return api.get(`/likes/review/${reviewId}/count`);
  }

  hasUserLikedReview(reviewId, userId) {
    return api.get(`/likes/review/${reviewId}/user/${userId}/hasLiked`);
  }
}

export default new ReviewService();
