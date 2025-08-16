// src/services/trending-recommendation.service.js
import api from "./api";

class TrendingRecommendationService {
  getPersonalizedRecommendations(userId) {
    return api.get(`/movies/recommendations`, { params: { userId } });
  }
}

export default new TrendingRecommendationService();
