export function runAriaFixer() {

  document
    .querySelectorAll("img:not([alt])")
    .forEach(img => {
      img.setAttribute("alt", "image");
    });

  document
    .querySelectorAll("button:not([aria-label])")
    .forEach((btn, i) => {
      btn.setAttribute(
        "aria-label",
        "button-" + i
      );
    });

}