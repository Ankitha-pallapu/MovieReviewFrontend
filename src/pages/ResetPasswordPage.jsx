import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";

const ResetPasswordPage = () => {
  console.log("ResetPasswordPage component is rendering."); // <-- DEBUGGING LINE
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing token.");
    }
  }, [token]);

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!token) {
      setError("Invalid or missing token.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/reset-password",
        {
          token: token,
          newPassword: newPassword,
        }
      );
      setMessage(response.data);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data || "Failed to reset password. Please try again."
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 80px)",
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
          Reset Password
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

        {/* Only show the form if a valid token exists */}
        {!error && (
          <Box
            component="form"
            onSubmit={handleResetPassword}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="new-password"
              label="New Password"
              name="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              variant="outlined"
              InputProps={{ sx: { color: "white" } }}
              InputLabelProps={{ sx: { color: "white" } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirm-password"
              label="Confirm New Password"
              name="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
              InputProps={{ sx: { color: "white" } }}
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
              disabled={!token || newPassword === "" || confirmPassword === ""}
            >
              Reset Password
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
        )}
      </Paper>
    </Box>
  );
};

export default ResetPasswordPage;
