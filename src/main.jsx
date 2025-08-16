// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Your main App component
import { BrowserRouter } from "react-router-dom"; // For client-side routing
import { CssBaseline } from "@mui/material"; // Material-UI CSS reset for consistent styling
import { ThemeProvider } from "@mui/material/styles"; // Material-UI ThemeProvider
import theme from "./theme"; // Your custom theme definition

// ReactDOM.createRoot is the entry point for React 18+ applications
ReactDOM.createRoot(document.getElementById("root")).render(
  // React.StrictMode enables development-only checks and warnings
  <React.StrictMode>
    {/* BrowserRouter enables client-side routing using the browser's history API */}
    <BrowserRouter>
      {/* ThemeProvider applies your custom Material-UI theme to all components within it */}
      <ThemeProvider theme={theme}>
        {/* CssBaseline provides a consistent baseline for styling across browsers.
            It also applies the global overflow:hidden from theme.js */}
        <CssBaseline />
        {/* Your main application component */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
