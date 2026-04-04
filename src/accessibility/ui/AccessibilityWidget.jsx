import { useState } from "react";
import { useA11yStore } from "../core/useA11yStore";

import "../styles/accessibility.css";
import "../styles/widget.css";

import { A11Y_ICONS } from "../core/a11yIcons";
import ToggleSwitch from "../../CommonComponent/ToggleSwitch";

export default function AccessibilityWidget() {
  const {
    state,
    toggle,
    setMode,
    setLevel,
    reset
  } = useA11yStore();

  const [open, setOpen] = useState(false);

  const speakWidgetText = (text) => {
    if (state.screenReader === "off" || !text) return;

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

  /* =========================
     CYCLE CARD
  ========================= */
  const CycleCard = ({
    label,
    icon,
    value,
    options,
    onChange,
    inactiveValues = ["none", 0, "default", "off"]
  }) => {
    const getDisplayValue = (cardValue) =>
      inactiveValues.includes(cardValue) ? "Off" : String(cardValue);

    const handleClick = (event) => {
      event?.stopPropagation();
      const currentIndex = options.indexOf(value);
      const nextIndex = (currentIndex + 1) % options.length;
      const nextValue = options[nextIndex];
      speakWidgetText(
        `${label}. ${getDisplayValue(nextValue)} selected.`
      );
      onChange(nextValue);
    };

    const isOff = inactiveValues.includes(value);
    const displayValue = getDisplayValue(value);
    const announceText = `${label}. Current value ${displayValue}. Activate to change setting.`;

    return (
      <div
        className={`a11y-card ${!isOff ? "active" : ""}`}
        onClick={handleClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            event.stopPropagation();
            handleClick();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={announceText}
        title={announceText}
      >
        {icon && <div className="a11y-card-icon">{icon}</div>}
        <div className="a11y-card-title">{label}</div>
        <div className="a11y-card-value">{displayValue}</div>
      </div>
    );
  };

  /* =========================
     TOGGLE CARD
  ========================= */
  const ToggleCard = ({
    label,
    icon,
    active,
    onClick,
    className = "",
    activeText = "On",
    inactiveText = "Off"
  }) => {
    const statusText = active ? activeText : inactiveText;
    const announceText = `${label}. Status ${statusText}. Activate to toggle setting.`;
    const nextStatusText = active ? inactiveText : activeText;

    return (
      <div
        className={`a11y-card ${active ? "active" : ""} ${className}`}
        onClick={(event) => {
          event.stopPropagation();
          speakWidgetText(`${label}. ${nextStatusText}.`);
          onClick();
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            event.stopPropagation();
            speakWidgetText(`${label}. ${nextStatusText}.`);
            onClick();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={announceText}
        title={announceText}
      >
        {icon && <div className="a11y-card-icon">{icon}</div>}
        <div className="a11y-card-title">{label}</div>
        <div className="a11y-card-value">
          {statusText}
        </div>
      </div>
    );
  };


  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        className={`a11y-float ${state.widgetPosition}`}
        onClick={(event) => {
          event.stopPropagation();
          setOpen(!open);
        }}
        aria-label={open ? "Close accessibility menu" : "Open accessibility menu"}
        title={open ? "Close accessibility menu" : "Open accessibility menu"}
      >
        ♿
      </button>

      {/* PANEL */}
      {open && (
        <div className={`a11y-container ${state.widgetPosition}`}>

          {/* HEADER */}
          <div className="a11y-header">
            Accessibility Menu
            <span
              className="a11y-close"
              onClick={(event) => {
                event.stopPropagation();
                setOpen(false);
              }}
              role="button"
              tabIndex={0}
              aria-label="Close accessibility menu"
              title="Close accessibility menu"
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setOpen(false);
                }
              }}
            >
              ✕
            </span>
          </div>

          {/* TOP CONTROL BAR */}
          <div className="a11y-top-controls">
            {/* <span className="a11y-top-label">
              Display Settings
            </span> */}

            <ToggleSwitch
              label="Oversized Widget"
              checked={state.widgetSize === "big"}
              onChange={() =>
                setMode(
                  "widgetSize",
                  state.widgetSize === "big"
                    ? "normal"
                    : "big"
                )
              }
            />
          </div>

          {/* GRID */}
          <div className="a11y-grid">
            <ToggleCard
            
              label="Color Blind Mode"
             
              active={state.colorBlindMode !== "none"}
              onClick={() => {
                setMode(
                  "colorBlindMode",
                  state.colorBlindMode === "none"
                    ? "protanopia"
                    : "none"
                );
              }}
              activeText="Enabled"
              inactiveText="Disabled"
            />
            <ToggleCard
            
              label="Cognitive & Learning"
             
              active={state.cursor !== "normal"}
              onClick={() => {
                setMode(
                  "cursor",
                  state.cursor === "normal"
                    ? "guide"
                    : "normal"
                );
              }}
              activeText="Enabled"
              inactiveText="Disabled"
            />

            <CycleCard
  label="Contrast"
  icon={A11Y_ICONS.contrast}
  value={state.contrast}
  options={["none", "dark", "light", "invert"]}
  onChange={(val) => setMode("contrast", val)}
/>

            <CycleCard
              label="Text Size"
              icon={A11Y_ICONS.textSize}
              value={state.textSize}
              options={[0, 1, 2, 3, 4]}
              onChange={(val) => setLevel("textSize", val)}
            />

            <CycleCard
              label="Spacing"
              icon={A11Y_ICONS.spacing}
              value={state.spacing}
              options={[0, 1, 2, 3]}
              onChange={(val) => setLevel("spacing", val)}
            />

            <CycleCard
              label="Saturation"
              icon={A11Y_ICONS.saturation}
              value={state.saturation}
              options={["normal", "low", "high", "desat"]}
              inactiveValues={["normal"]}
              onChange={(val) => setMode("saturation", val)}
            />

            <CycleCard
              label="Line Height"
              icon={A11Y_ICONS.lineHeight}
              value={state.lineHeight}
              options={[0, 1, 2, 3]}
              onChange={(val) => setLevel("lineHeight", val)}
            />

            <CycleCard
              label="Align"
              icon={A11Y_ICONS.align}
              value={state.align}
              options={["default", "left", "center", "right", "justify"]}
              onChange={(val) => setMode("align", val)}
            />

            <CycleCard
              label="Cursor"
              icon={A11Y_ICONS.cursor}
              value={state.cursor}
              options={["normal", "big", "guide", "mask"]}
              inactiveValues={["normal"]}
              onChange={(val) => setMode("cursor", val)}
            />

            <CycleCard
              label="Reader"
              icon={A11Y_ICONS.screenReader}
              value={state.screenReader}
              options={["off", "normal", "slow", "fast"]}
              onChange={(val) => setMode("screenReader", val)}
            />

            

            <CycleCard
              label="Smart Contrast"
              icon={A11Y_ICONS.colorBlind}
              value={state.colorBlindMode}
              options={["none", "protanopia", "deuteranopia", "tritanopia"]}
              onChange={(val) => setMode("colorBlindMode", val)}
            />

            <ToggleCard
              label="Low Vision"
              icon={A11Y_ICONS.lowVision}
              active={state.lowVision}
              onClick={() => toggle("lowVision")}
              className="low-vision"
              activeText="Enabled"
              inactiveText="Disabled"
            />

            <ToggleCard
              label="Links"
              icon={A11Y_ICONS.links}
              active={state.links}
              onClick={() => toggle("links")}
            />

            <ToggleCard
              label="Animations"
              icon={A11Y_ICONS.noanim}
              active={state.noanim && !state.lowVision}
              onClick={() => toggle("noanim")}
              activeText="Paused"
              inactiveText={state.lowVision ? "Playing (Low Vision)" : "Running"}
            />

            <ToggleCard
              label="Images"
              icon={A11Y_ICONS.hideimg}
              active={state.hideimg}
              onClick={() => toggle("hideimg")}
              activeText="Hidden"
              inactiveText="Visible"
            />

            <ToggleCard
              label="Dyslexia Font"
              icon={A11Y_ICONS.font}
              active={state.font === "dyslexia"}
              onClick={() =>
                setMode(
                  "font",
                  state.font === "dyslexia"
                    ? "normal"
                    : "dyslexia"
                )
              }
            />
          </div>

          {/* FOOTER */}
          <div className="a11y-footer">

            <button
              className="a11y-reset-btn"
              onClick={reset}
            >
              <span className="a11y-card-icon">{A11Y_ICONS.reset}</span>
              {'    '}
              Reset All Settings
            </button>

            <div className="a11y-footer-controls">

              <button
                className="a11y-control-btn"
                onClick={() =>
                  setMode(
                    "widgetPosition",
                    state.widgetPosition === "right"
                      ? "left"
                      : "right"
                  )
                }
              >
                {state.widgetPosition === "right"
                  ? "Move Widget Left ←"
                  : "Move Widget Right →"}
                  {A11Y_ICONS.move}
              </button>

            </div>
          </div>

        </div>
      )}
    </>
  );
}
