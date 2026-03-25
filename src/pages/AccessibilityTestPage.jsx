export default function AccessibilityTestPage() {
  return (
    <div style={{ padding: 20 }}>

      <h1 title="Main heading tooltip">
        Accessibility Test Page
      </h1>

      <p>
        This is a paragraph used to test text size,
        spacing, line height, alignment, dyslexia font,
        and saturation settings.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Nulla facilisi. Sed
        ullamcorper, nisl sit amet commodo
        tincidunt, lorem nisl aliquam nisl,
        eget aliquam nunc nisl sit amet nisl.
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

      <img
        src="https://picsum.photos/200"
        alt="test"
      />

      <img
        src="https://picsum.photos/210"
        alt="test"
      />

      <hr />

      {/* TOOLTIP */}

      <h2>Tooltip Test</h2>

      <button title="Tooltip text here">
        Hover me
      </button>

      <button title="Another tooltip">
        Hover me 2
      </button>

      <hr />

      {/* ANIMATION */}

      <h2>Animation Test</h2>

      <div className="box" />

      <style>
        {`
        .box {
          width:100px;
          height:100px;
          background:red;
          animation: spin 2s infinite linear;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        `}
      </style>

      <hr />

      {/* ALIGN */}

      <h2>Alignment Test</h2>

      <p>
        This text will change alignment when
        using accessibility controls.
      </p>

      <hr />

      {/* LONG TEXT */}

      <h2>Reading Test</h2>

      <p>
        Reading guide and reading mask should
        work on long text content. This paragraph
        is intentionally long so that scrolling,
        cursor guide, and spacing adjustments can
        be tested properly. Users with dyslexia,
        low vision, or cognitive disabilities may
        need different fonts, spacing, and contrast.
      </p>

      <p>
        Accessibility widgets must support WCAG
        guidelines and allow users to control
        contrast, font size, spacing, cursor,
        animations, and layout.
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
        Scroll here to test reading mask /
        guide / cursor / spacing / line height
      </div>

    </div>
  );
}