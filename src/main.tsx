import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

(function initFeedbackWidget() {
  if (document.getElementById("feedlet-widget-root")) return;

  const widgetDiv = document.createElement("div");
  widgetDiv.id = "feedlet-widget-root";
  document.body.appendChild(widgetDiv);

  createRoot(widgetDiv).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
})();
