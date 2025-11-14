import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./router/AppRouter.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { SavedActivitiesProvider } from "./contexts/SavedActivitiesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SavedActivitiesProvider>
        <AppRouter />
      </SavedActivitiesProvider>
    </AuthProvider>
  </React.StrictMode>
);
