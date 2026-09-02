// Generates a GitHub contribution graph style banner (dark background, random
// activity grid, title + footer text) using ImageMagick.
//
// Usage:
//   node scripts/gen-banner.js --out public/projects/adventofcode/banner.png \
//     --title "Advent of Code" --footer "2015 · 2022 · 2023 · 2024 · 2025 · Python"
//
// Options:
//   --out      output PNG path (required)
//   --title    big title text (default: "Advent of Code")
//   --footer   small footer line under the grid (default: current AoC years)
//   --seed     integer seed for the random grid pattern (default: 42)
//   --width    canvas width in px (default: 1600)
//   --height   canvas height in px (default: 900)
//
// Requires the `magick` CLI (ImageMagick 7) and a monospace font
// (DejaVu Sans Mono, bundled with the flake's ImageMagick, works out of the box).

import { execSync } from "node:child_process";

function parseArgs() {
  const args = {};
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      const key = argv[i].slice(2);
      const value = argv[i + 1];
      args[key] = value;
      i++;
    }
  }
  return args;
}

const args = parseArgs();

if (!args.out) {
  console.error("Usage: node scripts/gen-banner.js --out <path.png> [--title \"...\"] [--footer \"...\"] [--seed N]");
  process.exit(1);
}

const OUT = args.out;
const TITLE = args.title ?? "Advent of Code";
const FOOTER = args.footer ?? "2015 · 2022 · 2023 · 2024 · 2025 · Python";
const SEED = args.seed ? parseInt(args.seed, 10) : 42;
const W = args.width ? parseInt(args.width, 10) : 1600;
const H = args.height ? parseInt(args.height, 10) : 900;

const cell = 17, gap = 5;
const cols = 52, rows = 7;
const gridW = cols * (cell + gap) - gap;
const gridH = rows * (cell + gap) - gap;
const startX = (W - gridW) / 2;
const startY = (H - gridH) / 2 - 20;

// GitHub's contribution graph greens, darkest (no activity) to brightest.
const shades = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

let seed = SEED;
function rand() {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
}

const draws = [];
for (let c = 0; c < cols; c++) {
  for (let r = 0; r < rows; r++) {
    const x = startX + c * (cell + gap);
    const y = startY + r * (cell + gap);
    const rv = rand();
    let level;
    if (rv < 0.42) level = 0;
    else if (rv < 0.62) level = 1;
    else if (rv < 0.78) level = 2;
    else if (rv < 0.92) level = 3;
    else level = 4;
    draws.push(`fill '${shades[level]}' roundrectangle ${x},${y} ${x + cell},${y + cell} 3,3`);
  }
}
const drawStr = draws.join(" ");

const titleY = startY - 90;
const footerY = startY + gridH + 70;

const cmd = `magick -size ${W}x${H} xc:'#0d1117' -draw "${drawStr}" ` +
  `-font DejaVu-Sans-Mono-Bold -pointsize 54 -fill '#f0f6fc' -gravity North -annotate +0+${titleY} "${TITLE}" ` +
  `-font DejaVu-Sans-Mono -pointsize 24 -fill '#8b949e' -gravity North -annotate +0+${footerY} "${FOOTER}" ` +
  `"${OUT}"`;

execSync(cmd, { stdio: "inherit" });
console.log("Wrote", OUT);
