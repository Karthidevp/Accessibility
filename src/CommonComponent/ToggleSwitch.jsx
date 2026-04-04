const ToggleSwitch = ({ label, checked, onChange }) => {
  return (
    <div className="a11y-switch-container">

      {/* LEFT LABEL */}
      <span className="a11y-switch-text">{label}</span>

      {/* TOGGLE BUTTON */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`a11y-switch ${checked ? "active" : ""}`}
        onClick={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange();
          }
        }}
      >
        <span className="a11y-switch-knob"></span>
      </button>

    </div>
  );
};
export default ToggleSwitch;

// const ToggleSwitch = ({
//   label,
//   icon,
//   active,
//   onClick,
//   activeText = "On",
//   inactiveText = "Off"
// }) => (
//   <div
//     className={`a11y-card ${active ? "active" : ""}`}
//     onClick={onClick}
//   >
//     <div className="a11y-card-icon">{icon}</div>

//     <div className="a11y-card-title">{label}</div>
//     <div className="a11y-card-value">
//       {active ? activeText : inactiveText}
//     </div>
//   </div>
// );
// 

