// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8A2BE2",
      light: "#A765F5",
      dark: "#6B00B8",
    },
    secondary: {
      main: "#BA68C8",
    },
    background: {
      default: "#141414",
      paper: "#1F1F1F",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#A0A0A0",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h1: { fontSize: "3rem", fontWeight: 700, color: "#8A2BE2" },
    h3: { fontSize: "2.5rem", fontWeight: 600, color: "#FFFFFF" },
    h4: { fontSize: "2rem", fontWeight: 600, color: "#FFFFFF" },
    h5: { fontSize: "1.5rem", fontWeight: 600, color: "#FFFFFF" },
    h6: { fontSize: "1.2rem", fontWeight: 500, color: "#FFFFFF" },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.5 },
  },
  zIndex: {
    appBar: 1300, // Ensures navbar stays above everything
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          boxShadow: "none",
          borderBottom: "none",
          zIndex: 1300,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: "4px", textTransform: "none", fontWeight: 600 },
        containedPrimary: {
          backgroundColor: "#8A2BE2",
          "&:hover": { backgroundColor: "#A765F5" },
        },
        outlinedPrimary: {
          color: "#8A2BE2",
          borderColor: "#8A2BE2",
          "&:hover": { borderColor: "#A765F5", color: "#A765F5" },
        },
        textPrimary: {
          color: "#FFFFFF",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1F1F1F",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
          borderRadius: "8px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1F1F1F",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#424242" },
            "&:hover fieldset": { borderColor: "#8A2BE2" },
            "&.Mui-focused fieldset": { borderColor: "#8A2BE2" },
          },
          "& .MuiInputLabel-root": { color: "#A0A0A0" },
          "& .MuiInputLabel-root.Mui-focused": { color: "#8A2BE2" },
          "& .MuiInputBase-input": { color: "#FFFFFF" },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          margin: 0,
          padding: 0,
          scrollBehavior: "smooth",
          overflowX: "hidden",
        },
        body: {
          margin: 0,
          padding: 0,
          overflowX: "hidden",
          backgroundColor: "#141414",
          color: "#FFFFFF",
          fontFamily: "Arial, sans-serif",

          // Global scrollbar styling
          "&::-webkit-scrollbar": {
            width: "8px",
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "10px",
            border: "1px solid transparent",
          },
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255, 255, 255, 0.2) transparent",
        },
        "#root": {
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        },
      },
    },
  },
});

export default theme;
