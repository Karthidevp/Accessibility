import { initAccessibilityWidget } from "./index";

(function () {
  if (window.__A11Y_WIDGET__) return;
  window.__A11Y_WIDGET__ = true;

  initAccessibilityWidget();
})();