import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";

// 🔥 shared plugins (order matters)
const plugins = [
  // ✅ FIX: remove process errors in browser
  replace({
    preventAssignment: true,
    "process.env.NODE_ENV": JSON.stringify("production")
  }),

  // ✅ resolve browser modules
  resolve({
    browser: true,
    extensions: [".js", ".jsx"]
  }),

  // ✅ convert commonjs → ES
  commonjs(),

  // ✅ transpile JSX
  babel({
    babelHelpers: "bundled",
    exclude: /node_modules/,
    extensions: [".js", ".jsx"],
    presets: [
      ["@babel/preset-env", { modules: false }],
      ["@babel/preset-react", { runtime: "automatic" }]
    ]
  }),

  // ✅ inject CSS into JS bundle
  postcss({
    inject: true,
    minimize: true
  }),

  // ✅ minify
  terser()
];

export default [
  // =========================
  // 1. NPM MODULE BUILD
  // =========================
  {
    input: "src/index.js",

    // ✅ KEEP React external for npm usage
    external: ["react", "react-dom", "react-dom/client"],

    output: {
      file: "dist/index.js",
      format: "umd",
      name: "AccessibilityWidget",
      exports: "named",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        "react-dom/client": "ReactDOM"
      }
    },

    plugins
  },

  // =========================
  // 2. CDN BUILD (UNIVERSAL)
  // =========================
  {
    input: "src/embed.js",

    // ✅ bundle EVERYTHING (no externals)
    external: [],

    output: {
      file: "dist/embed.js",
      format: "umd",
      name: "AccessibilityWidget"
    },

    plugins
  }
];