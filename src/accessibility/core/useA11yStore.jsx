import { useState, useEffect } from "react";


export function useA11yStore() {
 const [state, setState] = useState({

  contrast: "none",        // none | invert | dark | light
  links: false,

  textSize: 0,             // 0 1 2 3 4

  spacing: 0,              // 0 1 2 3

  noanim: false,
  hideimg: false,

  font: "normal",          // normal | dyslexia | readable

  cursor: "normal",        // normal | big | mask | guide

  tooltips: false,

  lineHeight: 0,           // 0 1 2 3

  lowVision: false,

  align: "default",        // left right center justify

  saturation: "normal",    // normal low high desat
  screenReader: "off" ,     // off | normal | slow | fast
  widgetSize: "normal",   // normal | big
  widgetPosition: "right", // left | right
  colorBlindMode: "none", // none | protanopia | deuteranopia | tritanopia
});

//default settings
const DEFAULT_STATE = {
  contrast: "none",
  links: false,
  textSize: 0,
  spacing: 0,
  noanim: false,
  hideimg: false,
  font: "normal",
  cursor: "normal",
  tooltips: false,
  lineHeight: 0,
  align: "default",
  saturation: "normal",
  screenReader: "off",
  colorBlindMode: "none",
  lowVision: false,
  widgetSize: "normal",
  widgetPosition: "right",
};

const resetAll = () => {
  const resetState = {
    ...DEFAULT_STATE,
    widgetSize: state.widgetSize,
  };

  // 1. Reset React state
  setState(resetState);

  // 2. Clear localStorage
  localStorage.removeItem("a11y");

  // 3. Remove all a11y classes
  const body = document.body;
  body.classList.remove(
    ...Array.from(body.classList).filter(c =>
      c.startsWith("a11y-")
    )
  );
  body.classList.remove(
    "cvd-protanopia",
    "cvd-deuteranopia",
    "cvd-tritanopia"
  );
  body.style.removeProperty("filter");

  // 4. Stop screen reader
  window.speechSynthesis.cancel();

  // 5. Remove cursor effects
  document.querySelector(".a11y-guide-line")?.remove();
  document.querySelector(".a11y-mask")?.remove();
  document.onmousemove = null;
};

//Force stop when turning OFF screen reader
useEffect(() => {
  if (state.screenReader === "off") {
    window.speechSynthesis.cancel();
  }
}, [state.screenReader]);

  // Load saved settings

  useEffect(() => {

    const saved = localStorage.getItem("a11y");

    if (saved) {
      setState(JSON.parse(saved));
    }

  }, []);


  // Apply settings

  useEffect(() => {

    localStorage.setItem(
      "a11y",
      JSON.stringify(state)
    );

    applyClasses(state);

  }, [state]);

  useEffect(() => {
    if (state.screenReader === "off") return;

    const getRoleFromTag = (element) => {
      const tag = element.tagName?.toLowerCase();
      const type = element.getAttribute?.("type")?.toLowerCase();

      if (element.hasAttribute("role")) {
        return element.getAttribute("role");
      }

      switch (tag) {
        case "button":
          return "Button";
        case "a":
          return "Link";
        case "img":
          return "Image";
        case "input":
          return type === "checkbox"
            ? "Checkbox"
            : type === "radio"
            ? "Radio button"
            : type === "submit"
            ? "Submit button"
            : "Input";
        case "textarea":
          return "Text area";
        case "select":
          return "Select";
        case "label":
          return "Label";
        default:
          return tag ? tag.charAt(0).toUpperCase() + tag.slice(1) : "Element";
      }
    };

    const getUsageText = (element) => {
      const title = element.getAttribute("title");
      const describedBy = element.getAttribute("aria-describedby");
      const parts = [];

      if (title) {
        parts.push(title);
      }

      if (describedBy) {
        const ids = describedBy.split(" ").filter(Boolean);
        ids.forEach((id) => {
          const descElement = document.getElementById(id);
          if (descElement?.innerText) {
            parts.push(descElement.innerText.trim());
          }
        });
      }

      return parts.join(" ");
    };

    const handleSpeak = (event) => {
      const target = event.target.closest(
        "button, a, input, textarea, select, img, label, [role]"
      ) || event.target;

      if (target.closest(".a11y-float")) {
        return;
      }

      const label =
        target.getAttribute("aria-label") ||
        target.getAttribute("alt") ||
        target.innerText?.trim() ||
        target.getAttribute("placeholder") ||
        target.getAttribute("title") ||
        String(target.value || "").trim();

      if (!label) return;

      const role = getRoleFromTag(target);
      const usage = getUsageText(target);
      let text = role ? `${role}: ${label}` : label;

      if (usage && usage !== label) {
        text += `. Usage: ${usage}`;
      }

      if (text.length > 120) {
        text = text.slice(0, 120) + "...";
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      switch (state.screenReader) {
        case "slow":
          utterance.rate = 0.4;
          break;
        case "fast":
          utterance.rate = 1.7;
          break;
        default:
          utterance.rate = 1;
      }

      utterance.pitch = 1;
      requestAnimationFrame(() => {
        window.speechSynthesis.speak(utterance);
      });
    };

    document.body.addEventListener("click", handleSpeak);

    return () => {
      document.body.removeEventListener("click", handleSpeak);
      window.speechSynthesis.cancel();
    };

  }, [state.screenReader]);


 const toggle = (key) => {

  setState((s) => ({
    ...s,
    [key]: !s[key],
  }));

};
const setMode = (key, value) => {

  setState((s) => {

    const current = s[key];

    return {
      ...s,
      [key]: current === value ? getDefault(key) : value,
    };

  });

};


// widget position toggle 
const togglePosition = () => {
  setState((s) => ({
    ...s,
    widgetPosition: s.widgetPosition === "right" ? "left" : "right",
  }));
};

const setLevel = (key, level) => {

  setState((s) => ({

    ...s,

    [key]: s[key] === level
      ? 0
      : level,

  }));

};

  return {
    toggle,
    setMode,
    setLevel,
    state,
    resetAll,
    reset: resetAll,
    togglePosition,
  };
}

function getDefault(key) {
  const defaults = {
    contrast: "none",
    font: "normal",
    cursor: "normal",
    align: "default",
    saturation: "normal",
    screenReader: "off",
    widgetSize: "normal",
    widgetPosition: "right",
    colorBlindMode: "none", 
  };

  return defaults[key] || 0;
}


function applyClasses(state) {
  

  const body = document.body;

  // body.className = "";
body.classList.remove(
  ...Array.from(body.classList).filter(c => c.startsWith("a11y-"))
);



  // boolean

  if (state.links)
    body.classList.add("a11y-links");

  if (state.noanim && !state.lowVision)
    body.classList.add("a11y-noanim");

  if (state.hideimg)
    body.classList.add("a11y-hideimg");

  if (state.tooltips)
    body.classList.add("a11y-tooltips");


  // contrast

  if (state.contrast !== "none") {
    body.classList.add(
      "a11y-contrast-" + state.contrast
    );
  }


  // text size

  if (state.textSize > 0) {
    body.classList.add(
      "a11y-text-" + state.textSize
    );
  }




  // spacing

  if (state.spacing > 0) {
    body.classList.add(
      "a11y-spacing-" + state.spacing
    );
  }


  // font

  if (state.font !== "normal") {
    body.classList.add(
      "a11y-font-" + state.font
    );
  }



  // Widget size
document.body.classList.remove("a11y-widget-big");
if (state.widgetSize === "big") {
  document.body.classList.add("a11y-widget-big");
}

// Widget position
document.body.classList.remove("a11y-widget-left", "a11y-widget-right");
document.body.classList.add("a11y-widget-" + state.widgetPosition);

  // cursor
// =========================
// CURSOR MODES
// =========================

  // Clean up previous cursor elements
  const existingGuide = document.querySelector('.a11y-guide-line');
  if (existingGuide) existingGuide.remove();
  const existingMask = document.querySelector('.a11y-mask');
  if (existingMask) existingMask.remove();
  if (window.__a11yMoveHandler) {
    document.removeEventListener('mousemove', window.__a11yMoveHandler);
    window.__a11yMoveHandler = null;
  }

  if (state.cursor === "big") {

    document.body.classList.add("a11y-cursor-big");

  }

  if (state.cursor === "guide") {

    document.body.classList.add("a11y-cursor-guide");

    const line = document.createElement("div");
    line.className = "a11y-guide-line";

    document.body.appendChild(line);

    const handleGuideMove = (e) => {
      const width = 330;
      line.style.width = width + "px";
      line.style.height = "8px";
      line.style.left = e.clientX + "px";
      line.style.top = e.clientY + "px";
      line.style.transform = "translate(-50%, -50%)";
    };

    window.__a11yMoveHandler = handleGuideMove;
    document.addEventListener("mousemove", handleGuideMove);

  }

  if (state.cursor === "mask") {

    document.body.classList.add("a11y-cursor-mask");

    const mask = document.createElement("div");
    mask.className = "a11y-mask";

    document.body.appendChild(mask);

    const handleMaskMove = (e) => {
      mask.style.top = e.clientY + "px";
    };

    window.__a11yMoveHandler = handleMaskMove;
    document.addEventListener("mousemove", handleMaskMove);

  }
  // line height

  if (state.lineHeight > 0) {
    body.classList.add(
      "a11y-line-" + state.lineHeight
    );
  }


  // align

  if (state.align !== "default") {
    body.classList.add(
      "a11y-align-" + state.align
    );
  }


  // saturation

  if (state.saturation !== "normal") {
    body.classList.add(
      "a11y-sat-" + state.saturation
    );
  }

  if (state.lowVision) {
    body.classList.add("a11y-lowvision");
  }

  applyVisualFilter(state);

}

function applyVisualFilter(state) {
  const body = document.body;
  const filters = [];

  if (state.colorBlindMode !== "none") {
    filters.push(`url(#${state.colorBlindMode})`);
  }

  if (state.contrast === "invert") {
    filters.push("invert(1)", "hue-rotate(180deg)");
  }

  switch (state.saturation) {
    case "low":
      filters.push("saturate(0.65)");
      break;
    case "high":
      filters.push("saturate(1.6)");
      break;
    case "desat":
      filters.push("saturate(0)");
      break;
    default:
      break;
  }

  if (state.lowVision) {
    filters.push("brightness(1.12)", "contrast(1.3)", "saturate(1.3)");
  }

  if (filters.length > 0) {
    body.style.filter = filters.join(" ");
    return;
  }

  body.style.removeProperty("filter");
}










// function handleSpeak(e) {

//   const text = e.target.innerText?.trim();

//   if (!text) return;

//   const speech = new SpeechSynthesisUtterance(text);

//   // 🔥 MODE CONTROL
//   switch (window.a11yState?.screenReader) {

//     case "slow":
//       speech.rate = 0.7;
//       break;

//     case "fast":
//       speech.rate = 1.5;
//       break;

//     default:
//       speech.rate = 1;
//   }

//   speech.pitch = 1;

//   window.speechSynthesis.cancel();
//   window.speechSynthesis.speak(speech);

// }

// function applyClasses(state) {

//   const classes = [
//     "a11y-contrast",
//     "a11y-links",
//     "a11y-big",
//     "a11y-spacing",
//     "a11y-noanim",
//     "a11y-hideimg",
//     "a11y-dyslexia",
//     "a11y-cursor"
//   ];

//   document.body.classList.remove(...classes);

//   Object.keys(state).forEach((key) => {

//     if (state[key]) {
//       document.body.classList.add("a11y-" + key);
//     }

//   });

// }
