import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Link,
  OutlinedInput,
  FormControl,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTheme } from "@mui/material/styles";

const AuthForm = ({ type, onSubmit, errorMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "register" && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    onSubmit(email, password);
  };

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const themePrimaryMain = "#ffb300"; // A solid orange-yellow color
  const themePrimaryLight = "#ffca28"; // A lighter orange-yellow for hover

  return (
    <Box
      component="form"
      sx={{
        backgroundColor: "rgba(0,0,0,0.6)",
        borderRadius: "16px",
        padding: "30px",
        maxWidth: "450px",
        width: "100%",
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.4)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{
          color: themePrimaryMain, // Replaced purple color
          fontWeight: "bold",
          mb: 3,
        }}
      >
        {type === "login" ? "Login" : "Register"}
      </Typography>
      {errorMessage && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          {errorMessage}
        </Typography>
      )}

      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <OutlinedInput
          id="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          startAdornment={
            <InputAdornment position="start">
              <PersonOutlineIcon sx={{ color: "white" }} />
            </InputAdornment>
          }
          sx={{
            bgcolor: "#2e2e2e",
            borderRadius: "4px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: themePrimaryLight, // Replaced with new theme color
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: themePrimaryMain, // Replaced with new theme color
            },
            "& .MuiInputBase-input": {
              color: "white",
              "&::placeholder": {
                color: "rgba(255, 255, 255, 0.7)",
                opacity: 1,
              },
            },
          }}
        />
      </FormControl>

      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <OutlinedInput
          id="password-input"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          startAdornment={
            <InputAdornment position="start">
              <LockOutlinedIcon sx={{ color: "white" }} />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleToggleShowPassword}
                edge="end"
                sx={{ color: "white" }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          sx={{
            bgcolor: "#2e2e2e",
            borderRadius: "4px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: themePrimaryLight, // Replaced with new theme color
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: themePrimaryMain, // Replaced with new theme color
            },
            "& .MuiInputBase-input": {
              color: "white",
              "&::placeholder": {
                color: "rgba(255, 255, 255, 0.7)",
                opacity: 1,
              },
            },

            "& input::-ms-reveal, & input::-ms-clear": {
              display: "none",
            },
            "& input[type='password']::-webkit-password-toggle-button": {
              display: "none",
            },
          }}
        />
      </FormControl>

      {type === "register" && (
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <OutlinedInput
            id="confirm-password-input"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
            startAdornment={
              <InputAdornment position="start">
                <LockOutlinedIcon sx={{ color: "white" }} />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={handleToggleShowConfirmPassword}
                  edge="end"
                  sx={{ color: "white" }}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            sx={{
              bgcolor: "#2e2e2e",
              borderRadius: "4px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: themePrimaryLight, // Replaced with new theme color
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: themePrimaryMain, // Replaced with new theme color
              },
              "& .MuiInputBase-input": {
                color: "white",
                "&::placeholder": {
                  color: "rgba(255, 255, 255, 0.7)",
                  opacity: 1,
                },
              },

              "& input::-ms-reveal, & input::-ms-clear": {
                display: "none",
              },
              "& input[type='password']::-webkit-password-toggle-button": {
                display: "none",
              },
            }}
          />
        </FormControl>
      )}

      {type === "login" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            mb: 2,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: themePrimaryMain, // Replaced with new theme color
                  },
                }}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: "white" }}>
                Remember me
              </Typography>
            }
          />
          <Link
            component={RouterLink}
            to="/forgot-password"
            variant="body2"
            sx={{
              color: themePrimaryLight,
              alignSelf: "center",
              textDecoration: "none",
            }} // Replaced with new theme color
          >
            Forgot password?
          </Link>
        </Box>
      )}

      <Button
        variant="contained"
        type="submit"
        sx={{
          mt: 1,
          mb: 2,
          width: "180px",
          height: "50px",
          borderRadius: "25px",
          background: "linear-gradient(45deg, #FFB300 30%, #FF8E53 90%)", // Updated gradient
          color: "white",
          fontWeight: "bold",
          "&:hover": {
            background: "linear-gradient(45deg, #FF8E53 30%, #FFB300 90%)", // Flipped gradient on hover
            opacity: 0.9,
          },
        }}
      >
        {type === "login" ? "Login" : "Register"}
      </Button>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {type === "login" && (
          <Typography variant="body2" sx={{ color: "white" }}>
            Don't have an account?{" "}
            <Link
              component={RouterLink}
              to="/register"
              sx={{
                color: themePrimaryMain, // Replaced with new theme color
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Register
            </Link>
          </Typography>
        )}
        {type === "register" && (
          <Typography variant="body2" sx={{ color: "white" }}>
            Already have an account?{" "}
            <Link
              component={RouterLink}
              to="/login"
              sx={{
                color: themePrimaryMain, // Replaced with new theme color
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AuthForm;
