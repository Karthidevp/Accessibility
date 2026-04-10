import React from "react";
import { createRoot } from "react-dom/client";
import AccessibilityWidget from "./accessibility/ui/AccessibilityWidget";

export function initAccessibilityWidget(config = {}) {
  let container = document.getElementById("a11y-widget-root");

  if (!container) {
    container = document.createElement("div");
    container.id = "a11y-widget-root";
    document.body.appendChild(container);
  }

  const root = createRoot(container);

  // ✅ NO JSX here
  root.render(
    React.createElement(AccessibilityWidget, config)
  );
}