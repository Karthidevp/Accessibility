export function applyFilter(type) {

  const map = {
    none: "",
    grayscale: "grayscale(100%)",
    blur: "blur(1px)",
  };

  document.body.style.filter = 
    map[type] || "";

}