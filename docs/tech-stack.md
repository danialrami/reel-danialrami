# Sound Design Reel Website - Technical Specification

This document outlines the technical architecture, design decisions, and implementation approach for the sound design reel showcase website.

---

## 1. Overview

| Aspect | Decision |
|--------|----------|
| **Architecture** | Static website (HTML + CSS + minimal JS) |
| **Hosting** | GitHub Pages, Netlify, or Vercel |
| **Video Delivery** | Self-hosted with responsive streaming or CDN |
| **Responsive Strategy** | CSS Fluid design with aspect-ratio preservation |
| **Design System** | Echo Bridge Manual retro aesthetic |

---

## 2. Tech Stack

### 2.1 Core Technologies

```
Languages:    HTML5, CSS3, Vanilla JavaScript (ES6+)
Video:       HTML5 <video> element with MP4 (H.264)
Fonts:       Google Fonts (Host Grotesk, Public Sans)
No frameworks, no build tools, no dependencies
```

### 2.2 Why Static?

- **Simplicity**: Single-page, no server-side rendering needed
- **Performance**: Instant load, no hydration needed
- **Reliability**: Fewer failure points
- **Portability**: Easy to host anywhere (GitHub Pages, Netlify, Vercel, S3)
- **Maintenance**: No dependency updates, no security patches required

### 2.3 File Structure

```
reel-danialrami/
├── index.html          # Main page
├── styles.css          # All styles (or embedded)
├── script.js          # Minimal JS (sticky header, etc.)
├── Daniel_Ramirez_Reel.mp4
├── docs/
│   ├── styling-guide.md
│   └── tech-stack.md   # This document
└── assets/             # (optional) for images, etc.
```

---

## 3. Video Hosting Strategy

### 3.1 Option A: Self-Hosted (Recommended for This Use Case)

**Pros:**
- No ongoing hosting costs (if using GitHub Pages)
- Full control over video delivery
- Matches the self-contained aesthetic

**Cons:**
- GitHub Pages has soft bandwidth limits (~100GB/month)
- No adaptive bitrate streaming
- Browser must fully download before playback

**Implementation:**
```html
<video controls preload="metadata" playsinline>
    <source src="Daniel_Ramirez_Reel.mp4" type="video/mp4">
</video>
```

### 3.2 Option B: CDN/Cloud Storage

**Providers:**
- Cloudflare Stream
- AWS S3 + CloudFront
- Mux (video API)
- Vimeo (embedded player)

**Pros:**
- Adaptive bitrate streaming (HLS/DASH)
- Global CDN for fast delivery
- Handles large files seamlessly

**Cons:**
- Additional cost
- External dependency
- Requires account setup

### 3.3 Recommendation

For a personal reel website, **Option A (self-hosted)** is sufficient and aligns with the minimal, self-contained approach. The MP4 file (~50-100MB) is manageable.

However, if the reel:
- Exceeds 100MB significantly
- Gets high traffic
- Requires multiple format delivery for varying connection speeds

...then migrate to **Option B**.

---

## 4. Responsive Design Strategy

### 4.1 Core Principle

The video player must maintain its **aspect ratio** across all viewport sizes while fitting within the container.

### 4.2 Implementation Approaches

#### Approach A: CSS aspect-ratio (Modern, Recommended)

```css
.reel-video {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9; /* or actual reel aspect ratio */
}
```

**Pros:**
- Native CSS property
- Browser handles calculations
- Clean and simple

**Cons:**
- Requires knowing exact aspect ratio
- Less control over precise sizing

#### Approach B: max-width + margin auto

```css
.reel-container {
    max-width: 960px;
    width: 100%;
    margin: 0 auto;
}

.reel-video {
    width: 100%;
    height: auto;
    display: block;
}
```

#### Approach C: JavaScript-calculated (Fallback only)

- Calculate dimensions on resize
- Set explicit width/height
- Not recommended unless necessary

### 4.3 Responsive Breakpoints

| Breakpoint | Target Devices | Container Padding | Font Sizes |
|-----------|---------------|-----------------|------------|
| Desktop   | 1200px+       | 32px           | Full       |
| Tablet    | 768px-1199px  | 24px           | -10-15%   |
| Mobile    | 480px-767px   | 16px           | -20%      |
| Small     | <480px        | 12px           | -25%      |

### 4.4 Viewport Meta Tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

This is critical for proper scaling on mobile devices.

---

## 5. Visual Framing System

### 5.1 Design Concept

The video player should have a distinctive **corner-frame** visual treatment that:
- Frames all four corners (not a full border)
- Uses the brand colors (teal, yellow, blue, red)
- Maintains retro/flat aesthetic
- Works at any viewport size

### 5.2 Implementation Options

#### Option A: Pseudo-elements (CSS-only, Recommended)

```css
.reel-frame {
    position: relative;
    border: 3px solid var(--lufs-teal);
}

/* Top gradient bar */
.reel-frame::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
        var(--lufs-teal), 
        var(--lufs-blue), 
        var(--lufs-yellow), 
        var(--lufs-red)
    );
}

/* Corner decorations via pseudo-elements */
.reel-frame .corner {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid var(--lufs-teal);
}

.reel-frame .corner-tl { top: -2px; left: -2px; border-right: none; border-bottom: none; }
.reel-frame .corner-tr { top: -2px; right: -2px; border-left: none; border-bottom: none; }
.reel-frame .corner-bl { bottom: -2px; left: -2px; border-right: none; border-top: none; }
.reel-frame .corner-br { bottom: -2px; right: -2px; border-left: none; border-top: none; }
```

#### Option B: SVG Corner Markers

Use inline SVG for more complex corner shapes:

```html
<div class="reel-frame">
    <svg class="corner-tl" ...>...</svg>
    <svg class="corner-tr" ...>...</svg>
    <svg class="corner-bl" ...>...</svg>
    <svg class="corner-br" ...>...</svg>
    <video>...</video>
</div>
```

#### Option C: Clip-path (Experimental)

```css
.reel-frame {
    clip-path: polygon(
        0% 5%, 5% 0%,    /* top-left */
        95% 0%, 100% 5%,  /* top-right */
        100% 95%, 95% 100%, /* bottom-right */
        5% 100%, 0% 95%   /* bottom-left */
    );
}
```

### 5.3 Recommended Approach

Use **Option A (pseudo-elements)** for the frame because:
- Pure CSS, no additional HTML elements
- Scalable with the container
- Matches the Echo Bridge Manual aesthetic exactly
- Easy to customize colors

---

## 6. CSS Architecture

### 6.1 Structure

All styles in one file (`styles.css`) with clear sections:

```css
/* ============================================
   TABLE OF CONTENTS
   1. CSS Custom Properties (variables)
   2. Reset & Base
   3. Layout (container)
   4. Header (sticky + main)
   5. Video Player + Frame
   6. Footer
   7. Responsive
   8. Animations
   9. Utility
   ============================================ */
```

### 6.2 CSS Custom Properties Pattern

```css
:root {
    /* Colors */
    --lufs-teal: #78BEBA;
    --lufs-red: #D35233;
    --lufs-yellow: #E7B225;
    --lufs-blue: #2069af;
    --lufs-black: #111111;
    --lufs-white: #fbf9e2;

    /* Typography */
    --font-title: 'Host Grotesk', monospace;
    --font-body: 'Public Sans', sans-serif;

    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;

    /* Borders */
    --border-width: 3px;
    --border-color: var(--lufs-teal);

    /* Effects */
    --shadow-flat: 2px 2px 0 var(--retro-border);
}
```

### 6.3 Mobile-First vs Desktop-First

Use **desktop-first** (default styles for desktop, overrides for mobile):

```css
/* Desktop (default) */
.container { max-width: 1200px; }

/* Tablet */
@media (max-width: 768px) {
    .container { max-width: 100%; }
}

/* Mobile */
@media (max-width: 480px) {
    .container { padding: var(--spacing-sm); }
}
```

---

## 7. JavaScript Requirements

### 7.1 Minimal JavaScript

Only essential functionality:

1. **Sticky Header**: Show header on scroll up
2. **Video playback**: (handled by HTML5 video)
3. **Optional**: Animated background shapes

### 7.2 Sticky Header Logic

```javascript
const header = document.getElementById('sticky-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('visible');
    } else {
        header.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
});
```

### 7.3 No JavaScript Fallback

The site should be fully functional without JavaScript enabled. Video controls use native HTML5 attributes.

---

## 8. Accessibility

### 8.1 Video Accessibility

```html
<video controls preload="metadata" playsinline>
    <source src="Daniel_Ramirez_Reel.mp4" type="video/mp4">
    <track kind="captions" src="captions.vtt" srclang="en" label="English">
</video>
```

### 8.2 Color Contrast

- `--lufs-white` (#fbf9e2) on `--lufs-black` (#111111) = 14.5:1 ratio
- Passes WCAG AAA (requires 7:1)

### 8.3 Focus States

```css
a:focus, button:focus {
    outline: 2px solid var(--lufs-yellow);
    outline-offset: 2px;
}
```

### 8.4 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

---

## 9. Performance Optimization

### 9.1 Video Loading

```html
<!-- Lazy load video, but preload metadata -->
<video controls preload="metadata" playsinline>
    <source src="Daniel_Ramirez_Reel.mp4" type="video/mp4">
</video>
```

### 9.2 CSS Optimization

- Minify CSS for production
- Use CSS custom properties for reuse
- Avoid expensive properties (box-shadow on large elements)

### 9.3 Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
```

Use `font-display: swap` to prevent FOIT (Flash of Invisible Text).

---

## 10. Deployment

### 10.1 Hosting Options

| Provider | Free Tier | Custom Domain | Notes |
|----------|-----------|---------------|-------|
| GitHub Pages | Yes | Yes | Soft 100GB/month limit |
| Netlify | Yes | Yes | Generous limits |
| Vercel | Yes | Yes | Generous limits |
| Cloudflare Pages | Yes | Yes | Unlimited bandwidth |

### 10.2 Deploy Steps (GitHub Pages)

1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select branch (main)
4. Save → Auto-published at `https://username.github.io/repo-name`

### 10.3 Custom Domain

Point A/CNAME record to host, then configure in hosting provider dashboard.

---

## 11. Implementation Checklist

### Phase 1: Core
- [ ] Create `index.html` with video player and basic structure
- [ ] Copy/replicate `styles.css` from Echo Bridge Manual
- [ ] Add CSS variables and video frame styling
- [ ] Add responsive breakpoints
- [ ] Test on mobile devices

### Phase 2: Polish
- [ ] Add sticky header JavaScript
- [ ] Add corner frame visual treatment
- [ ] Test video playback on various browsers
- [ ] Verify accessibility (contrast, focus states)

### Phase 3: Deploy
- [ ] Add to GitHub Pages
- [ ] Test with custom domain (if applicable)
- [ ] Verify video loads and plays
- [ ] Check performance (Lighthouse score)

---

## 12. Future Considerations

### Video Format Alternatives

If needing multiple quality levels:
```html
<video>
    <source src="reel-1080p.mp4" type="video/mp4" media="(min-width: 1080px)">
    <source src="reel-720p.mp4" type="video/mp4" media="(min-width: 720px)">
    <source src="reel-480p.mp4" type="video/mp4">
</video>
```

### WebM/Fallback Formats

For better browser support:
```html
<source src="reel.webm" type="video/webm">
<source src="reel.mp4" type="video/mp4">
```

### Analytics

Consider adding simple analytics (if needed):
- Plausible Analytics (privacy-friendly)
- Simple hit counter

---

## 13. File Locations

| This Document | Location |
|---------------|----------|
| Styling Guide | `docs/styling-guide.md` |
| Tech Stack    | `docs/tech-stack.md` |

---

## 14. Summary

The website uses a simple, proven tech stack:
- **Static HTML/CSS/JS** — reliable and fast
- **Self-hosted video** — sufficient for personal reel
- **CSS fluid design** — works on all devices
- **Corner-frame styling** — distinctive visual treatment
- **No dependencies** — easy to maintain

This approach prioritizes simplicity and self-reliance over feature complexity, aligning with the DIY aesthetic of the Echo Bridge Manual.