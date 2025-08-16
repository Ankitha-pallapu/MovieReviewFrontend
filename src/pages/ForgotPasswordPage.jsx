import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      // API call to your backend endpoint
      const response = await axios.post(
        "http://localhost:8080/api/auth/forgot-password",
        email,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      setMessage(response.data);
      setEmail(""); // Clear the email field on success
    } catch (err) {
      // The backend should always return a success message for security,
      // but we handle potential network errors
      setError("Failed to send password reset request. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 80px)", // Adjust for AppBar height
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 450,
          width: "100%",
          bgcolor: "grey.900",
          color: "white",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Forgot Password
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Enter your email address and we'll send you a password reset link.
        </Typography>

        {message && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleForgotPassword}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            InputProps={{
              sx: { color: "white" },
              style: { borderColor: "white" },
            }}
            InputLabelProps={{ sx: { color: "white" } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            Send Reset Link
          </Button>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <RouterLink
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              Back to Login
            </RouterLink>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPasswordPage;
