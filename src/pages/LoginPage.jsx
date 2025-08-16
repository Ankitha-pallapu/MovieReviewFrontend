import React, { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const LoginPage = () => {
  const { login, userRole, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === "ADMIN") {
        navigate("/admin/movies");
      } else if (userRole === "REVIEWER") {
        navigate("/movies");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, userRole, navigate]);

  const handleLogin = async (email, password) => {
    setErrorMessage("");
    try {
      await login(email, password);
    } catch (error) {
      setErrorMessage(
        error.response?.data || "Login failed. Please check your credentials."
      );
      console.error("Login attempt error:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/regbg.jpg)", // Ensure this image is in public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: -1,
        },
      }}
    >
      <Box
        sx={{
          p: 3,
          borderRadius: "8px",
          bgcolor: "rgba(0,0,0,0.7)",
          zIndex: 1,
        }}
      >
        <AuthForm
          type="login"
          onSubmit={handleLogin}
          errorMessage={errorMessage}
        />
      </Box>
    </Box>
  );
};

export default LoginPage;
