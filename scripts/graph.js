const { buildSync } = require("esbuild")
const path = require("path")

buildSync({
  entryPoints: [
    path.resolve(__dirname, "../src/modules/graph/minimum-graph.tsx"),
  ],
  outfile: path.resolve(__dirname, "../export/graph.js"),
  bundle: true,
  define: { "process.env.EXPORT": "true" },
  external: ["react", "react-dom", "styled-jsx", "canvas"],
  target: "es6",
  format: "cjs",
  platform: "node",
})

buildSync({
  entryPoints: [path.resolve(__dirname, "../src/parser/index.ts")],
  outfile: path.resolve(__dirname, "../export/parser.js"),
  bundle: true,
  define: { "process.env.EXPORT": "true" },
  external: ["react", "react-dom", "styled-jsx", "canvas"],
  target: "es6",
  format: "cjs",
  platform: "node",
})
