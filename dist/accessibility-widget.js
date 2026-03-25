var AccessibilityWidget = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/widget.js
  var import_react3 = __toESM(__require("react"));
  var import_react_dom = __toESM(__require("react-dom"));

  // src/accessibility/ui/AccessibilityWidget.jsx
  var import_react2 = __require("react");

  // src/accessibility/core/useA11yStore.jsx
  var import_react = __require("react");
  function useA11yStore() {
    const [state, setState] = (0, import_react.useState)({
      contrast: "none",
      // none | invert | dark | light
      links: false,
      textSize: 0,
      // 0 1 2 3 4
      spacing: 0,
      // 0 1 2 3
      noanim: false,
      hideimg: false,
      font: "normal",
      // normal | dyslexia | readable
      cursor: "normal",
      // normal | big | mask | guide
      tooltips: false,
      lineHeight: 0,
      // 0 1 2 3
      align: "default",
      // left right center justify
      saturation: "normal"
      // normal low high desat
    });
    (0, import_react.useEffect)(() => {
      const saved = localStorage.getItem("a11y");
      if (saved) {
        setState(JSON.parse(saved));
      }
    }, []);
    (0, import_react.useEffect)(() => {
      localStorage.setItem(
        "a11y",
        JSON.stringify(state)
      );
      applyClasses(state);
    }, [state]);
    const toggle = (key) => {
      setState((s) => ({
        ...s,
        [key]: !s[key]
      }));
    };
    const setMode = (key, value) => {
      setState((s) => ({
        ...s,
        [key]: s[key] === value ? getDefault(key) : value
      }));
    };
    const setLevel = (key, level) => {
      setState((s) => ({
        ...s,
        [key]: s[key] === level ? 0 : level
      }));
    };
    return {
      toggle,
      setMode,
      setLevel,
      state
    };
  }
  function getDefault(key) {
    const defaults = {
      contrast: "none",
      font: "normal",
      cursor: "normal",
      align: "default",
      saturation: "normal"
    };
    return defaults[key] || 0;
  }
  function applyClasses(state) {
    const body = document.body;
    body.className = "";
    if (state.links)
      body.classList.add("a11y-links");
    if (state.noanim)
      body.classList.add("a11y-noanim");
    if (state.hideimg)
      body.classList.add("a11y-hideimg");
    if (state.tooltips)
      body.classList.add("a11y-tooltips");
    if (state.contrast !== "none") {
      body.classList.add(
        "a11y-contrast-" + state.contrast
      );
    }
    if (state.textSize > 0) {
      body.classList.add(
        "a11y-text-" + state.textSize
      );
    }
    if (state.spacing > 0) {
      body.classList.add(
        "a11y-spacing-" + state.spacing
      );
    }
    if (state.font !== "normal") {
      body.classList.add(
        "a11y-font-" + state.font
      );
    }
    if (state.cursor !== "normal") {
      body.classList.add(
        "a11y-cursor-" + state.cursor
      );
    }
    if (state.lineHeight > 0) {
      body.classList.add(
        "a11y-line-" + state.lineHeight
      );
    }
    if (state.align !== "default") {
      body.classList.add(
        "a11y-align-" + state.align
      );
    }
    if (state.saturation !== "normal") {
      body.classList.add(
        "a11y-sat-" + state.saturation
      );
    }
  }

  // src/accessibility/ui/AccessibilityWidget.jsx
  function AccessibilityWidget() {
    const {
      state,
      toggle,
      setMode,
      setLevel
    } = useA11yStore();
    const [open, setOpen] = (0, import_react2.useState)(false);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "a11y-float",
        onClick: () => setOpen(!open)
      },
      "\u267F"
    ), open && /* @__PURE__ */ React.createElement("div", { className: "a11y-container" }, /* @__PURE__ */ React.createElement("div", { className: "a11y-header" }, "Accessibility Menu", /* @__PURE__ */ React.createElement(
      "span",
      {
        className: "a11y-close",
        onClick: () => setOpen(false)
      },
      "\u2715"
    )), /* @__PURE__ */ React.createElement("div", { className: "a11y-grid" }, /* @__PURE__ */ React.createElement("div", { className: "a11y-group" }, /* @__PURE__ */ React.createElement("p", null, "Contrast"), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: state.contrast === "invert" ? "active" : "",
        onClick: () => setMode("contrast", "invert")
      },
      "Invert"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: state.contrast === "dark" ? "active" : "",
        onClick: () => setMode("contrast", "dark")
      },
      "Dark"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: state.contrast === "light" ? "active" : "",
        onClick: () => setMode("contrast", "light")
      },
      "Light"
    )), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `a11y-card ${state.links ? "active" : ""}`,
        onClick: () => toggle("links")
      },
      "Highlight Links"
    ), /* @__PURE__ */ React.createElement("div", { className: "a11y-group" }, /* @__PURE__ */ React.createElement("p", null, "Text Size"), [1, 2, 3, 4].map((n) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: n,
        className: state.textSize === n ? "active" : "",
        onClick: () => setLevel("textSize", n)
      },
      "A",
      n
    ))), /* @__PURE__ */ React.createElement("div", { className: "a11y-group" }, /* @__PURE__ */ React.createElement("p", null, "Text Spacing"), [1, 2, 3].map((n) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: n,
        className: state.spacing === n ? "active" : "",
        onClick: () => setLevel("spacing", n)
      },
      n
    ))), /* @__PURE__ */ React.createElement("div", { className: "a11y-group" }, /* @__PURE__ */ React.createElement("p", null, "Line Height"), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: state.line === 1 ? "active" : "",
        onClick: () => setLevel("line", 1)
      },
      "1.5x"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: state.line === 2 ? "active" : "",
        onClick: () => setLevel("line", 2)
      },
      "1.75x"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: state.line === 3 ? "active" : "",
        onClick: () => setLevel("line", 3)
      },
      "2x"
    )), /* @__PURE__ */ React.createElement("div", { className: "a11y-group" }, /* @__PURE__ */ React.createElement("p", null, "Text Align"), ["left", "center", "right", "justify"].map((m) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: m,
        className: state.align === m ? "active" : "",
        onClick: () => setMode("align", m)
      },
      m
    ))), /* @__PURE__ */ React.createElement("div", { className: "a11y-group" }, /* @__PURE__ */ React.createElement("p", null, "Saturation"), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: state.saturation === "low" ? "active" : "",
        onClick: () => setMode("saturation", "low")
      },
      "Low"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: state.saturation === "high" ? "active" : "",
        onClick: () => setMode("saturation", "high")
      },
      "High"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: state.saturation === "desat" ? "active" : "",
        onClick: () => setMode("saturation", "desat")
      },
      "Desat"
    )), /* @__PURE__ */ React.createElement("div", { className: "a11y-group" }, /* @__PURE__ */ React.createElement("p", null, "Cursor"), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: state.cursor === "big" ? "active" : "",
        onClick: () => setMode("cursor", "big")
      },
      "Big"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: state.cursor === "mask" ? "active" : "",
        onClick: () => setMode("cursor", "mask")
      },
      "Mask"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: state.cursor === "guide" ? "active" : "",
        onClick: () => setMode("cursor", "guide")
      },
      "Guide"
    )), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `a11y-card ${state.noanim ? "active" : ""}`,
        onClick: () => toggle("noanim")
      },
      "Pause Animations"
    ), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `a11y-card ${state.hideimg ? "active" : ""}`,
        onClick: () => toggle("hideimg")
      },
      "Hide Images"
    ), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `a11y-card ${state.dyslexia ? "active" : ""}`,
        onClick: () => toggle("dyslexia")
      },
      "Dyslexia Font"
    ))));
  }

  // src/widget.js
  window.renderAccessibilityWidget = (element) => {
    import_react_dom.default.render(
      import_react3.default.createElement(AccessibilityWidget),
      element
    );
  };
})();
