export function scanAccessibility() {

  const issues = [];

  document
    .querySelectorAll("img")
    .forEach(img => {
      if (!img.alt)
        issues.push("Image missing alt");
    });

  document
    .querySelectorAll("a")
    .forEach(a => {
      if (!a.textContent)
        issues.push("Empty link");
    });

  console.log(issues);

  return issues;
}