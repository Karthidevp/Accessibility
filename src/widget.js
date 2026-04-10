import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

export function initAccessibilityWidget(config = {}) {
  let container = document.getElementById("a11y-widget-root");

  if (!container) {
    container = document.createElement("div");
    container.id = "a11y-widget-root";
    document.body.appendChild(container);
  }

  const root = createRoot(container);
  root.render(<App config={config} />);
}