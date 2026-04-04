import { useEffect, useState } from "react";

export default function AccessibilityTestPage() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [readingGuide, setReadingGuide] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("reduce-motion", reduceMotion);
    document.body.classList.toggle("high-contrast", highContrast);
    document.body.classList.toggle("large-text", largeText);
  }, [reduceMotion, highContrast, largeText]);

  return (
    <div style={{ padding: 20 }}>
      {/* CONTROLS */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setReduceMotion(!reduceMotion)}>Reduce Motion</button>
        <button onClick={() => setHighContrast(!highContrast)}>High Contrast</button>
        <button onClick={() => setLargeText(!largeText)}>Large Text</button>
        <button onClick={() => setReadingGuide(!readingGuide)}>Reading Guide</button>
      </div>

      <h1 title="Main heading tooltip">Accessibility Test Page</h1>

      <p>
        This is a paragraph used to test text size, spacing, line height, alignment,
        dyslexia font, and saturation settings.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
        Sed ullamcorper, nisl sit amet commodo tincidunt.
      </p>

      <hr />

      {/* LINKS */}
      <h2>Links Test</h2>
      <a href="#">Normal link</a>
      <br />
      <a href="#">Second link</a>
      <br />
      <a href="#">Third link</a>

      <hr />

      {/* IMAGES */}
      <h2>Images Test</h2>
      <img src="https://picsum.photos/200" alt="Random sample 1" />
      <img src="https://picsum.photos/210" alt="Random sample 2" />

      <hr />

      {/* TOOLTIP */}
      <h2>Tooltip Test</h2>
      <button title="Tooltip text here">Hover me</button>
      <button title="Another tooltip">Hover me 2</button>

      <hr />

      {/* ANIMATION */}
      <h2>Animation Test</h2>
      <div className="box" />

      <hr />

      {/* ALIGN */}
      <h2>Alignment Test</h2>
      <p className="align-text">
        This text will change alignment when using accessibility controls.
      </p>

      <hr />

      {/* LONG TEXT */}
      <h2>Reading Test</h2>
      <p>
        Reading guide and reading mask should work on long text content. This paragraph
        is intentionally long so that scrolling and spacing adjustments can be tested.
      </p>

      <hr />

      {/* BUTTONS */}
      <h2>Buttons</h2>
      <button>Button 1</button>
      <button>Button 2</button>
      <button>Button 3</button>

      <hr />

      {/* INPUTS */}
      <h2>Inputs</h2>
      <input placeholder="Type here" />
      <br />
      <br />
      <textarea placeholder="Textarea" />

      <hr />

      {/* TABLE */}
      <h2>Table Test</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Item 1</td>
            <td>100</td>
          </tr>
          <tr>
            <td>Item 2</td>
            <td>200</td>
          </tr>
        </tbody>
      </table>

      <hr />

      {/* SCROLL TEST */}
      <h2>Scroll Test</h2>
      <div style={{ height: 500 }}>
        Scroll here to test reading features
      </div>

      {/* READING GUIDE */}
      {readingGuide && <div className="reading-guide" />}

      <style>{`
        .box {
          width: 100px;
          height: 100px;
          background: red;
          animation: spin 2s infinite linear;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .reduce-motion * {
          animation: none !important;
          transition: none !important;
        }

        .high-contrast {
          background: black;
          color: white;
        }

        .large-text {
          font-size: 18px;
        }

        .reading-guide {
          position: fixed;
          top: 50%;
          left: 0;
          width: 100%;
          height: 40px;
          background: rgba(255,255,0,0.2);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}