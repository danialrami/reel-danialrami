# reel.danialrami.com

Daniel Ramirez's sound-design reel — a single-page static site built in the
**Daniel Ramirez.** personal brand (muted palette, dark-editorial), matching
[daniel-ramirez.io](https://daniel-ramirez.io) and
[resume.daniel-ramirez.io](https://resume.daniel-ramirez.io).

## Overview

A focused, near-full-viewport page: the reel is the hero, framed with corner
brackets over a slow, subtle audio-palette point-cloud background. Top-right
links to the rest of the family (Home / Resume / Blog); a single **View full
portfolio** button points at the LUFS portfolio section; the LUFS + cloud
webring sits, cheekily, bottom-right.

## Design

- **Identity:** Daniel Ramirez. (personal), muted palette — near-black ground
  `#201e1b`, cream `#E8E4D4`, single gold accent `#D9A23D`.
- **Type:** Host Grotesk (display) · Public Sans (body) · Space Mono (labels).
- **Mark/favicon:** the four-color reel/oscilloscope mark, kept as-is — a small
  pop of the LUFS spectrum on the muted ground.
- **Motion:** uniform custom cursor + a slow, subtle Canvas2D point cloud
  (muted palette; honors `prefers-reduced-motion`). Pure Canvas2D, no CDN, so
  what renders in preview is what renders live.

## Tech Stack

- Static HTML5, CSS3, vanilla JavaScript — no frameworks or build tools.
- YouTube-embedded reel.
- Host Grotesk + Public Sans + Space Mono via Google Fonts.

## Quick Start

1. Open `index.html` in a browser, or
2. Serve locally: `npx serve .` or `python -m http.server 8000`

## Deployment

Static — deploy to GitHub Pages, Netlify, Vercel, or Cloudflare Pages.

## Credits

- Design system: LUFS / Daniel Ramirez brand.
- Fonts: Host Grotesk, Public Sans, Space Mono (Google Fonts).
