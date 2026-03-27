import React from "react";
import ReactDOM from "react-dom/client";
import AccessibilityWidget from "./accessibility/ui/AccessibilityWidget";

(function () {
  // prevent duplicate load
  if (window.__A11Y_WIDGET__) return;
  window.__A11Y_WIDGET__ = true;

  // create container
  const container = document.createElement("div");
  container.id = "a11y-widget-root";
  document.body.appendChild(container);

  // inject CSS
  const css = document.createElement("link");
  css.rel = "stylesheet";
  // Get the script's src to derive CSS path
  const scripts = document.querySelectorAll('script');
  const currentScript = Array.from(scripts).find(script => script.src.includes('accessibility-widget.js'));
  if (currentScript) {
    const scriptSrc = currentScript.src;
    const baseUrl = scriptSrc.substring(0, scriptSrc.lastIndexOf('/') + 1);
    css.href = baseUrl + "accessibility-widget.css";
  } else {
    // Fallback to relative path
    css.href = "./accessibility-widget.css";
  }
  document.head.appendChild(css);

  // mount React
  const root = ReactDOM.createRoot(container);
  root.render(<AccessibilityWidget />);
})();