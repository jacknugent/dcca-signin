import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  MantineProvider,
  createTheme,
  defaultCssVariablesResolver,
} from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@mantine/core/styles.css";

const queryClient = new QueryClient();

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
      theme={theme}
      cssVariablesResolver={defaultCssVariablesResolver}
      defaultColorScheme="dark"
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>
);
