import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [portalTarget, setPortalTarget] = useState(null);
  const [dragLeft, setDragLeft] = useState(null);
  const [isDraggingPanel, setIsDraggingPanel] = useState(false);
  const openTimerRef = useRef(null);
  const panelRef = useRef(null);
  const dragStateRef = useRef(null);
  const hasActiveAccessibilitySettings =
    state.contrast !== "none" ||
    state.links ||
    state.textSize > 0 ||
    state.spacing > 0 ||
    state.noanim ||
    state.hideimg ||
    state.font !== "normal" ||
    state.cursor !== "normal" ||
    state.tooltips ||
    state.lineHeight > 0 ||
    state.lowVision ||
    state.align !== "default" ||
    state.saturation !== "normal" ||
    state.screenReader !== "off" ||
    state.colorBlindMode !== "none";

  useEffect(() => {
    let host = document.getElementById("a11y-widget-portal-root");
    let created = false;

    if (!host) {
      host = document.createElement("div");
      host.id = "a11y-widget-portal-root";
      host.className = "a11y-widget-host";
      document.documentElement.appendChild(host);
      created = true;
    }

    setPortalTarget(host);

    return () => {
      if (openTimerRef.current) {
        window.clearTimeout(openTimerRef.current);
      }

      if (created && host?.parentNode) {
        host.parentNode.removeChild(host);
      }
    };
  }, []);

  useEffect(() => {
    if (!isDraggingPanel) {
      return undefined;
    }

    const handlePointerMove = (event) => {
      const dragState = dragStateRef.current;

      if (!dragState) {
        return;
      }

      const nextLeft = event.clientX - dragState.pointerOffset;
      const maxLeft = Math.max(window.innerWidth - dragState.panelWidth - 20, 20);
      const clampedLeft = Math.min(Math.max(nextLeft, 20), maxLeft);
      setDragLeft(clampedLeft);
    };

    const handlePointerUp = (event) => {
      const dragState = dragStateRef.current;

      if (!dragState) {
        setIsDraggingPanel(false);
        setDragLeft(null);
        return;
      }

      const dropOnRight = event.clientX >= window.innerWidth / 2;
      const nextPosition = dropOnRight ? "right" : "left";

      if (nextPosition !== state.widgetPosition) {
        setMode("widgetPosition", nextPosition);
      }

      dragStateRef.current = null;
      setIsDraggingPanel(false);
      setDragLeft(null);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDraggingPanel, setMode, state.widgetPosition]);

  useEffect(() => {
    const handleShortcut = (event) => {
      const target = event.target;
      const tagName = target?.tagName?.toLowerCase();
      const isEditable =
        target?.isContentEditable ||
        tagName === "input" ||
        tagName === "textarea" ||
        tagName === "select";

      if (isEditable) {
        return;
      }

      if (event.ctrlKey && !event.shiftKey && !event.altKey && event.key.toLowerCase() === "u") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

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

  const handleFloatButtonClick = (event) => {
    event.stopPropagation();

    if (open) {
      setOpen(false);
      return;
    }

    if (isLoading) {
      return;
    }

    if (hasLoadedOnce) {
      setOpen(true);
      return;
    }

    setIsLoading(true);
    openTimerRef.current = window.setTimeout(() => {
      setIsLoading(false);
      setHasLoadedOnce(true);
      setOpen(true);
      openTimerRef.current = null;
    }, 900);
  };

  const handlePanelDragStart = (event) => {
    if (event.target.closest(".a11y-close")) {
      return;
    }

    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    const rect = panel.getBoundingClientRect();
    dragStateRef.current = {
      panelWidth: rect.width,
      pointerOffset: event.clientX - rect.left,
    };
    setDragLeft(rect.left);
    setIsDraggingPanel(true);
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

  if (!portalTarget) {
    return null;
  }

  return createPortal(
    <div className="a11y-widget-ui">
      {/* FLOAT BUTTON */}
      <button
        className={`a11y-float ${state.widgetPosition}`}
        onClick={handleFloatButtonClick}
        aria-label={isLoading ? "Loading accessibility menu" : open ? "Close accessibility menu" : "Open accessibility menu"}
        title={isLoading ? "Loading accessibility menu" : open ? "Close accessibility menu" : "Open accessibility menu"}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <span className="a11y-float-loader" aria-hidden="true" />
        ) : (
          <img
            className="a11y-float-icon"
            src="https://cdn.userway.org/widgetapp/images/body_wh.svg"
            alt=""
            role="presentation"
          />
        )}
        {hasActiveAccessibilitySettings && (
          <span
            className="a11y-float-indicator"
            aria-hidden="true"
          >
            ✓
          </span>
        )}
      </button>

      {/* PANEL */}
      {open && (
        <div
          ref={panelRef}
          className={`a11y-container ${state.widgetPosition} ${
            state.widgetSize === "big" ? "big" : ""
          } ${isDraggingPanel ? "dragging" : ""}`}
          style={{
            left: dragLeft !== null ? `${dragLeft}px` : undefined,
            right: dragLeft !== null ? "auto" : undefined,
          }}
        >

          {/* HEADER */}
          <div
            className="a11y-header"
            onPointerDown={handlePanelDragStart}
          >
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
              label="Text Spacing"
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
              label="Text Align"
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
              label="Highlight Links"
              icon={A11Y_ICONS.links}
              active={state.links}
              onClick={() => toggle("links")}
            />

            <ToggleCard
              label="Pause Animations"
              icon={A11Y_ICONS.noanim}
              active={state.noanim && !state.lowVision}
              onClick={() => toggle("noanim")}
              activeText="Paused"
              inactiveText={state.lowVision ? "Playing (Low Vision)" : "Running"}
            />

            <ToggleCard
              label="Hide Images"
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
              Reset All Accessibility Settings
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
    </div>,
    portalTarget
  );
}
