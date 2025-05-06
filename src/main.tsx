import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  MantineProvider,
  createTheme,
  defaultCssVariablesResolver,
} from "@mantine/core";
import "@mantine/core/styles.css";

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
      theme={theme}
      cssVariablesResolver={defaultCssVariablesResolver}
      defaultColorScheme="dark"
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
