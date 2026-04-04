// const CycleCard = ({ label, value, options, onChange }) => {
//   const handleClick = () => {
//     const currentIndex = options.indexOf(value);
//     const nextIndex = (currentIndex + 1) % options.length;
//     onChange(options[nextIndex]);
//   };

//   const displayValue = value === "none" ? "Off" : value;

//   return (
//     <div className={`a11y-card ${value !== "none" ? "active" : ""}`} onClick={handleClick}>
//       <div className="a11y-card-title">{label}</div>
//       <div className="a11y-card-value">{displayValue}</div>
//     </div>
//   );
// };

const CycleCard = ({ label, icon, value, options, onChange }) => {
  const handleClick = () => {
    const currentIndex = options.indexOf(value);
    const nextIndex = (currentIndex + 1) % options.length;
    onChange(options[nextIndex]);
  };

  const displayValue =
    value === "none" || value === 0 ? "Off" : String(value);

  return (
    <div
      className={`a11y-card ${displayValue !== "Off" ? "active" : ""}`}
      onClick={handleClick}
    >
      <div className="a11y-card-icon">{icon}</div>

      <div className="a11y-card-title">{label}</div>
      <div className="a11y-card-value">{displayValue}</div>
    </div>
  );
};