import React from "react";
import { Typography, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundImage: `url("/home.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textAlign: "center",
        px: 2,
        "&::-webkit-scrollbar": { display: "none" },
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          borderRadius: "20px",
          padding: "40px",
          maxWidth: "650px", // Slightly increased width for medium content
          maxHeight: "90vh",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
          overflowY: "auto",
          "&::-webkit-scrollbar": { display: "none" },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          backdropFilter: "blur(5px)",
          border: "2px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Typography
          variant="h3" // Reduced heading size to h3
          sx={{
            fontWeight: 800,
            mb: 1,
            fontFamily: "'Playfair Display', serif", // A more elegant and professional font
            letterSpacing: "1.5px",
            color: "#FFD700", // Gold color
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.8)",
          }}
        >
          Movie Reviews
        </Typography>

        <Typography
          variant="h6" // Reduced subheading size to h6
          sx={{
            color: "#fff",
            fontWeight: 600,
            mb: 4,
            fontFamily: "'Montserrat', sans-serif",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
          }}
        >
          Discover, Rate, and Discuss Your Favorite Films
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "1rem",
            lineHeight: 1.8,
            textAlign: "justify", // Aligned for a cleaner, professional look
            mb: 3,
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          Welcome to **Movie Reviews**, a platform dedicated to the art of cinema.
          Our mission is to provide a comprehensive space where film enthusiasts can
          share and explore opinions on movies of all genres. We've built an
          intuitive system that allows you to easily **rate films, write detailed
          reviews, and engage with a vibrant community** of fellow cinephiles.
          Whether you're looking for recommendations or want to share your take
          on the latest release, this is your destination.
        </Typography>

        {!isAuthenticated && (
          <Typography
            sx={{
              color: "#ffcc00",
              fontSize: "1.1rem", // Slightly reduced font size for a cleaner look
              fontWeight: 600,
              mt: 4,
              textAlign: "center",
              fontFamily: "'Montserrat', sans-serif",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
            }}
          >
            Join our community today! **Log in** or **Register** to begin your cinematic journey.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;