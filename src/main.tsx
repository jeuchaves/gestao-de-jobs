import "./utils/translationYup";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

import "react-datepicker/dist/react-datepicker.css";
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
