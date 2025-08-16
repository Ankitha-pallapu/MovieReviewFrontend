// src/services/auth.service.js
import api from "./api"; // Import the configured Axios instance

class AuthService {
  // API call for user login
  login(email, password) {
    return api.post("/auth/login", { email, password });
  }

  // API call for user registration (reviewer role)
  register(email, password) {
    return api.post("/auth/register", { email, password });
  }

  // API call to get current logged-in user's profile
  getCurrentUser() {
    return api.get("/auth/users/me");
  }
}

export default new AuthService(); // Export an instance of the service
