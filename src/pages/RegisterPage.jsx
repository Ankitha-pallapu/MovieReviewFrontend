// src/pages/RegisterPage.jsx (Fixed Duplicate Register & Refined Structure)
import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { Alert, Box } from "@mui/material"; // Removed Typography as AuthForm provides title

const RegisterPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (email, password) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await AuthService.register(email, password);
      setSuccessMessage("Registration successful! Please log in.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setErrorMessage(
        error.response?.data || "Registration failed. Please try again."
      );
      console.error("Registration attempt error:", error);
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
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2, zIndex: 1 }}>
          {successMessage}
        </Alert>
      )}
      {/* AuthForm now handles its own title */}
      <Box
        sx={{
          p: 3,
          borderRadius: "8px",
          bgcolor: "rgba(0,0,0,0.7)",
          zIndex: 1,
        }}
      >
        <AuthForm
          type="register"
          onSubmit={handleRegister}
          errorMessage={errorMessage}
        />
      </Box>
    </Box>
  );
};

export default RegisterPage;
