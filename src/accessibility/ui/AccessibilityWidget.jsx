import { useState } from "react";
import { useA11yStore } from "../core/useA11yStore";

import "../styles/accessibility.css";
import "../styles/widget.css";

export default function AccessibilityWidget() {

  const {
    state,
    toggle,
    setMode,
    setLevel
  } = useA11yStore();

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* FLOAT BUTTON */}

      <button
        className="a11y-float"
        onClick={() => setOpen(!open)}
      >
        ♿
      </button>


      {/* PANEL */}

      {open && (

        <div className="a11y-container">

          {/* HEADER */}

          <div className="a11y-header">

            Accessibility Menu

            <span
              className="a11y-close"
              onClick={() => setOpen(false)}
            >
              ✕
            </span>

          </div>


          {/* BODY */}

          <div className="a11y-grid">



            {/* CONTRAST */}

            <div className="a11y-group">

              <p>Contrast</p>

              <button
                className={state.contrast === "invert" ? "active" : ""}
                onClick={() => setMode("contrast", "invert")}
              >
                Invert
              </button>

              <button
                className={state.contrast === "dark" ? "active" : ""}
                onClick={() => setMode("contrast", "dark")}
              >
                Dark
              </button>

              <button
                className={state.contrast === "light" ? "active" : ""}
                onClick={() => setMode("contrast", "light")}
              >
                Light
              </button>

            </div>



            {/* LINKS */}

            <div
              className={`a11y-card ${state.links ? "active" : ""}`}
              onClick={() => toggle("links")}
            >
              Highlight Links
            </div>



            {/* TEXT SIZE */}

            <div className="a11y-group">

              <p>Text Size</p>

              {[1, 2, 3, 4].map((n) => (

                <button
                  key={n}
                  className={state.textSize === n ? "active" : ""}
                  onClick={() => setLevel("textSize", n)}
                >
                  A{n}
                </button>

              ))}

            </div>



            {/* SPACING */}

            <div className="a11y-group">

              <p>Text Spacing</p>

              {[1, 2, 3].map((n) => (

                <button
                  key={n}
                  className={state.spacing === n ? "active" : ""}
                  onClick={() => setLevel("spacing", n)}
                >
                  {n}
                </button>

              ))}

            </div>



            {/* LINE HEIGHT */}

            <div className="a11y-group">

  <p>Line Height</p>

  {[1, 2, 3].map((n) => (
    <button
      key={n}
      className={state.lineHeight === n ? "active" : ""}
      onClick={() => setLevel("lineHeight", n)}
    >
      {n === 1 ? "1.5x" : n === 2 ? "1.75x" : "2x"}
    </button>
  ))}

</div>


            {/* ALIGN */}

            <div className="a11y-group">

              <p>Text Align</p>

              {["left", "center", "right", "justify"].map((m) => (

                <button
                  key={m}
                  className={state.align === m ? "active" : ""}
                  onClick={() => setMode("align", m)}
                >
                  {m}
                </button>

              ))}

            </div>



            {/* SATURATION */}

            <div className="a11y-group">

              <p>Saturation</p>

              <button
                className={state.saturation === "low" ? "active" : ""}
                onClick={() => setMode("saturation", "low")}
              >
                Low
              </button>

              <button
                className={state.saturation === "high" ? "active" : ""}
                onClick={() => setMode("saturation", "high")}
              >
                High
              </button>

              <button
                className={state.saturation === "desat" ? "active" : ""}
                onClick={() => setMode("saturation", "desat")}
              >
                Desat
              </button>

            </div>



            {/* CURSOR */}

            <div className="a11y-group">

              <p>Cursor</p>

              <button
                className={state.cursor === "big" ? "active" : ""}
                onClick={() => setMode("cursor", "big")}
              >
                Big
              </button>

              <button
                className={state.cursor === "mask" ? "active" : ""}
                onClick={() => setMode("cursor", "mask")}
              >
                Mask
              </button>

              <button
                className={state.cursor === "guide" ? "active" : ""}
                onClick={() => setMode("cursor", "guide")}
              >
                Guide
              </button>

            </div>



            {/* TOGGLES */}

            <div
              className={`a11y-card ${state.noanim ? "active" : ""}`}
              onClick={() => toggle("noanim")}
            >
              Pause Animations
            </div>


            <div
              className={`a11y-card ${state.hideimg ? "active" : ""}`}
              onClick={() => toggle("hideimg")}
            >
              Hide Images
            </div>


            <div
  className={`a11y-card ${state.font === "dyslexia" ? "active" : ""}`}
  onClick={() => setMode("font", "dyslexia")}
>
  Dyslexia Font
</div>


          </div>

        </div>

      )}

    </>
  );

}