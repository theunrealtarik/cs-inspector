import React from "react";
import ReactDOM from "react-dom/client";
import Entry from "./Entry";

import "./styles/index.css";

import { VechaiProvider } from "@vechaiui/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <VechaiProvider colorScheme="dark">
      <Entry />
    </VechaiProvider>
  </React.StrictMode>
);
