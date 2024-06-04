import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <App />
  </SnackbarProvider>
);
