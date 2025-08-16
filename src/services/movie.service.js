// src/services/movie.service.js
import api from "./api";

class MovieService {
  getAllMovies() {
    return api.get("/movies");
  }

  getMovieById(id) {
    return api.get(`/movies/${id}`);
  }

  createMovie(movie) {
    return api.post("/movies", movie);
  }

  updateMovie(id, movie) {
    return api.put(`/movies/${id}`, movie);
  }

  deleteMovie(id) {
    return api.delete(`/movies/${id}`);
  }

  getTopRatedMovies() {
    return api.get("/movies/top-rated");
  }

  getTrendingMovies() {
    return api.get("/movies/trending");
  }

  searchMovies(query) {
    return api.get(`/movies/search?query=${query}`);
  }

  getRecommendedMovies() {
    return api.get("/movies/recommendations");
  }

  getMoviesByGenre(genre) {
    return api.get(`/movies/category/${genre}`);
  }
}

export default new MovieService();
