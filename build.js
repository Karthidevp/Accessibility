const esbuild = require("esbuild")

esbuild.build({
  entryPoints: ["src/widget.js"],
  bundle: true,
  outfile: "dist/accessibility-widget.js",

  format: "iife",
  globalName: "AccessibilityWidget",

  loader: {
    ".js": "jsx",
    ".jsx": "jsx",
    ".css": "css"
  },

  external: ["react", "react-dom"],

}).then(() => {
  console.log("Bundle created")
}).catch(() => process.exit(1))