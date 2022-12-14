import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Box } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <App />
    </Box>
  </React.StrictMode>
);
