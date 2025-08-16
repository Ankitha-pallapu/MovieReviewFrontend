import React, { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MovieListPage from "./pages/MovieListPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import AdminMovieManagementPage from "./pages/AdminMovieManagementPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import TopRatedMoviesPage from "./pages/TopRatedMoviesPage";
import TrendingMoviesPage from "./pages/TrendingMoviesPage";
import SearchPage from "./pages/SearchPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { Link as RouterLink } from "react-router-dom";

// Protected route
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, userRole } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requiredRole && userRole !== requiredRole)
    return <Navigate to="/" replace />;
  return children;
};

function AppContent() {
  const { isAuthenticated, userRole, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const isTransparentNavbarPage =
    location.pathname === "/" ||
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register") ||
    location.pathname.startsWith("/forgot-password") ||
    location.pathname.startsWith("/reset-password") ||
    location.pathname.startsWith("/movies") ||
    location.pathname.startsWith("/top-rated") ||
    location.pathname.startsWith("/trending") ||
    location.pathname.startsWith("/search");

  const isPageWithAestheticBackground =
    location.pathname === "/" ||
    location.pathname.startsWith("/movies") ||
    location.pathname.startsWith("/top-rated") ||
    location.pathname.startsWith("/trending") ||
    location.pathname.startsWith("/search");

  const isAuthPage =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register") ||
    location.pathname.startsWith("/forgot-password") ||
    location.pathname.startsWith("/reset-password");

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogoutClick = () => {
    handleMenuClose();
    logout();
    navigate("/");
  };

  const gradientButtonSx = {
    ml: 0.5,
    color: "white",
    background: "linear-gradient(45deg, #FF5733 30%, #FFC300 90%)",
    borderRadius: "25px",
    padding: "6px 12px",
    fontWeight: "bold",
    fontSize: "0.8rem",
    textTransform: "none",
    "&:hover": {
      background: "linear-gradient(45deg, #FF5733 30%, #FFC300 90%)",
      opacity: 0.9,
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflow: isPageWithAestheticBackground ? "hidden" : "auto",
        backgroundColor: "#000000", // Always black
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        "&::-webkit-scrollbar": { display: "none" },
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      }}
    >
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: isTransparentNavbarPage
            ? "rgba(0,0,0,0.6)"
            : "#1a1a1a",
          backdropFilter: isTransparentNavbarPage ? "blur(6px)" : "none",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            variant="h5" 
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 800, // Matching homepage style
              letterSpacing: "1.5px", // Matching homepage style
              textDecoration: "none",
              color: "#FFD700", // Gold color
              fontFamily: "'Playfair Display', serif", // Matching homepage style
              textShadow: "1px 1px 4px rgba(0, 0, 0, 0.8)", // Matching homepage style
              "&:hover": {
                color: "#fff", 
                textShadow: "1px 1px 5px rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            MovieReviews🌟
          </Typography>

          {/* Navigation */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isAuthenticated ? (
              <>
                <Button component={RouterLink} to="/" sx={gradientButtonSx}>
                  Home
                </Button>
                <Button
                  component={RouterLink}
                  to="/movies"
                  sx={gradientButtonSx}
                >
                  Movies
                </Button>
                <Button
                  component={RouterLink}
                  to="/top-rated"
                  sx={gradientButtonSx}
                >
                  Top Rated
                </Button>
                <Button
                  component={RouterLink}
                  to="/trending"
                  sx={gradientButtonSx}
                >
                  Trending
                </Button>
                <Button
                  component={RouterLink}
                  to="/search"
                  sx={gradientButtonSx}
                >
                  Search
                </Button>
                {userRole === "ADMIN" && (
                  <Button
                    component={RouterLink}
                    to="/admin/movies"
                    sx={gradientButtonSx}
                  >
                    Manage
                  </Button>
                )}
                {userRole === "ADMIN" ? (
                  <Button onClick={handleLogoutClick} sx={gradientButtonSx}>
                    Logout
                  </Button>
                ) : (
                  <>
                    <IconButton
                      onClick={handleMenuClick}
                      sx={gradientButtonSx}
                      size="small"
                    >
                      <DashboardIcon fontSize="small" />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleMenuClose}
                    >
                      <MenuItem
                        onClick={handleMenuClose}
                        component={RouterLink}
                        to="/dashboard"
                        sx={{ color: "#FF5733" }}
                      >
                        Dashboard
                      </MenuItem>
                      <MenuItem
                        onClick={handleLogoutClick}
                        sx={{ color: "#FF5733" }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </>
            ) : (
              !isAuthPage && (
                <>
                  <Button
                    component={RouterLink}
                    to="/login"
                    sx={gradientButtonSx}
                  >
                    Login
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/register"
                    sx={gradientButtonSx}
                  >
                    Register
                  </Button>
                </>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Container
        maxWidth={isPageWithAestheticBackground ? false : "lg"}
        disableGutters={isPageWithAestheticBackground}
        sx={{
          paddingTop: "80px",
          minHeight: "100vh",
          color: "white", // Always white text
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/movies" element={<MovieListPage />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="/top-rated" element={<TopRatedMoviesPage />} />
          <Route path="/trending" element={<TrendingMoviesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="REVIEWER">
                <UserDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/movies"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminMovieManagementPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </Box>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;