# Sound Design Reel Website - Styling Guide

Based on the Echo Bridge Manual design system. This guide documents the core styling patterns for the sound design reel showcase website.

## Overview

The sound design reel website uses the same design system as the Echo Bridge Manual — a retro, flat aesthetic with a dark theme, accent colors, and retro-inspired UI elements.

---

## CSS Custom Properties

### Color Palette

```css
:root {
    /* Primary Colors - Brand Aligned */
    --lufs-teal: #78BEBA;
    --lufs-red: #D35233;
    --lufs-yellow: #E7B225;
    --lufs-blue: #2069af;
    --lufs-black: #111111;
    --lufs-white: #fbf9e2;

    /* Retro Grays */
    --retro-gray: #c0c0c0;
    --retro-dark-gray: #808080;
    --retro-light-gray: #e0e0e0;
    --retro-border: #888888;
}
```

### Typography

```css
:root {
    --font-title: 'Host Grotesk', monospace;
    --font-body: 'Public Sans', sans-serif;
}
```

### Font Face Declarations

The design system uses hosted font files. Include these in your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Host+Grotesk:ital,wght@0,300..800;1,300..800&family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
```

### Spacing Scale

```css
:root {
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
}
```

### Other Properties

```css
:root {
    /* No rounded corners - flat design */
    --radius: 0px;

    /* Flat shadows - retro feel */
    --shadow-flat: 2px 2px 0 var(--retro-border);
    --shadow-inset: inset 1px 1px 0 var(--retro-light-gray);
}
```

---

## Layout Structure

### Container

```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-lg);
}
```

### Responsive Breakpoints

```css
@media (max-width: 768px) {
    .container {
        padding: var(--spacing-md);
    }
}

@media (max-width: 480px) {
    .container {
        padding: var(--spacing-md);
    }
}
```

---

## Core Elements

### Body & Background

```css
body {
    font-family: var(--font-body);
    line-height: 1.6;
    color: var(--lufs-white);
    background-color: var(--lufs-black);
    background-image: 
        repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(120, 190, 186, 0.03) 2px,
            rgba(120, 190, 186, 0.03) 4px
        );
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    position: relative;
    overflow-x: hidden;
}
```

### Animated Background

```css
.animated-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;
}

.floating-shape {
    position: absolute;
    opacity: 0.1;
    animation: floatAround 15s ease-in-out infinite;
}

.floating-shape.square {
    background: var(--lufs-teal);
    border: 1px solid var(--lufs-white);
}

.floating-shape.circle {
    background: var(--lufs-blue);
    border-radius: 50%;
    border: 1px solid var(--lufs-white);
}

/* Floating animations */
@keyframes floatAround {
    0% { 
        transform: translateY(0px) translateX(0px) rotate(0deg);
        opacity: 0.05;
    }
    25% { 
        transform: translateY(-30px) translateX(20px) rotate(90deg);
        opacity: 0.15;
    }
    50% { 
        transform: translateY(-10px) translateX(-15px) rotate(180deg);
        opacity: 0.1;
    }
    75% { 
        transform: translateY(-40px) translateX(10px) rotate(270deg);
        opacity: 0.2;
    }
    100% { 
        transform: translateY(0px) translateX(0px) rotate(360deg);
        opacity: 0.05;
    }
}
```

---

## Header Components

### Sticky Header

```css
.sticky-header {
    position: fixed;
    top: -80px;
    left: 0;
    right: 0;
    z-index: 1000;
    background: var(--lufs-black);
    border-bottom: 2px solid var(--lufs-teal);
    transition: top 0.3s ease;
    padding: var(--spacing-sm) 0;
}

.sticky-header.visible {
    top: 0;
}

.sticky-header .header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.sticky-header .logo {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.sticky-header .header-text h1 {
    font-family: var(--font-title);
    font-size: 18px;
    font-weight: 600;
    color: var(--lufs-white);
    text-shadow: 0 0 2px var(--lufs-teal);
}

.sticky-header .header-text p {
    font-size: 12px;
    color: var(--lufs-teal);
    font-weight: 400;
}
```

### Main Header

```css
.main-header {
    background: var(--lufs-black);
    border: 3px solid var(--lufs-teal);
    padding: var(--spacing-xl) 0;
    margin-bottom: var(--spacing-xl);
    position: relative;
}

.main-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--lufs-teal), var(--lufs-blue), var(--lufs-yellow), var(--lufs-red));
}

.header-content {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
}

.logo-section {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
}

.logo-link {
    text-decoration: none;
    transition: transform 0.2s ease;
}

.logo-link:hover {
    transform: scale(1.1);
}

.logo {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid var(--lufs-white);
    box-shadow: var(--shadow-flat);
    cursor: pointer;
    background: var(--lufs-black);
}

.logo svg {
    width: 100%;
    height: 100%;
}

.header-text h1 {
    font-family: var(--font-title);
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: var(--spacing-xs);
    color: var(--lufs-white);
    text-shadow: 0 0 3px var(--lufs-teal);
}

.header-text p {
    font-size: 1.1rem;
    color: var(--lufs-teal);
    font-weight: 400;
}
```

---

## Content Section

### Manual Content

```css
.manual-content {
    background: var(--lufs-black);
    border: 2px solid var(--lufs-teal);
    padding: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
    position: relative;
}

.manual-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--lufs-teal), var(--lufs-blue), var(--lufs-yellow), var(--lufs-red));
}
```

### Typography

```css
.manual-content h1 {
    font-family: var(--font-title);
    color: var(--lufs-teal);
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-sm);
    border-bottom: 3px solid var(--lufs-teal);
    text-shadow: 0 0 2px var(--lufs-teal);
}

.manual-content h2 {
    font-family: var(--font-title);
    color: var(--lufs-yellow);
    font-size: 1.8rem;
    font-weight: 500;
    margin-top: var(--spacing-xl);
    margin-bottom: var(--spacing-md);
    text-shadow: 0 0 2px var(--lufs-yellow);
}

.manual-content h3 {
    font-family: var(--font-title);
    color: var(--lufs-blue);
    font-size: 1.4rem;
    font-weight: 500;
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-sm);
    text-shadow: 0 0 2px var(--lufs-blue);
}

.manual-content h4 {
    font-family: var(--font-title);
    color: var(--lufs-red);
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
    text-shadow: 0 0 2px var(--lufs-red);
}

.manual-content p {
    margin-bottom: var(--spacing-md);
    color: var(--lufs-white);
    font-size: 1rem;
    line-height: 1.7;
}

.manual-content strong {
    color: var(--lufs-yellow);
    font-weight: 600;
}

.manual-content em {
    color: var(--lufs-teal);
    font-style: italic;
}

.manual-content a {
    color: var(--lufs-teal);
    text-decoration: underline;
    transition: color 0.2s ease;
}

.manual-content a:hover {
    color: var(--lufs-yellow);
}
```

---

## Video Player

### Reel Video Container

```css
.reel-container {
    width: 100%;
    max-width: 960px;
    margin: 0 auto var(--spacing-xl);
    border: 3px solid var(--lufs-teal);
    background: var(--lufs-black);
    position: relative;
}

.reel-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--lufs-teal), var(--lufs-blue), var(--lufs-yellow), var(--lufs-red));
}

.reel-video {
    width: 100%;
    display: block;
    image-rendering: crisp-edges;
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
}
```

### HTML Structure

```html
<div class="reel-container">
    <video class="reel-video" controls preload="metadata">
        <source src="Daniel_Ramirez_Reel.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>
```

---

## Footer

```css
.footer {
    text-align: center;
    padding: var(--spacing-xl) 0;
    border-top: 2px solid var(--lufs-teal);
    margin-top: var(--spacing-xl);
}

.footer p {
    color: var(--lufs-teal);
    font-size: 0.9rem;
    font-family: var(--font-body);
}
```

---

## Retro Buttons (Webring)

```css
.webring-button {
    animation: dr-pulseShadow 2s infinite, dr-float 3s ease-in-out infinite;
    width: 88px;
    height: 31px;
    display: inline-block;
    overflow: hidden;
    cursor: pointer;
    text-decoration: none;
    background: #e0e0e0;
    border: 2px solid #b0b0b0;
    box-shadow:
        0 0 0 4px #f8f8f8,
        0 0 0 6px #888,
        2px 2px 0 0 #b0b0b0;
    margin: 8px;
    padding: 0;
    transition: background 0.1s;
    position: relative;
}

.webring-button:hover {
    animation-play-state: paused;
    box-shadow: none;
    background: #d0d0d0;
}

@keyframes dr-pulseShadow {
    0%, 100% { box-shadow: 2px 2px 0 #b0b0b0; }
    50% { box-shadow: 4px 4px 0 #888; }
}

@keyframes dr-float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-2px); }
}
```

---

## Selection Styling

```css
::selection {
    background-color: var(--lufs-yellow);
    color: var(--lufs-black);
}

::-moz-selection {
    background-color: var(--lufs-yellow);
    color: var(--lufs-black);
}
```

---

## Responsive Adjustments

```css
@media (max-width: 768px) {
    .header-content {
        flex-direction: column;
        text-align: center;
        gap: var(--spacing-lg);
    }

    .manual-content {
        padding: var(--spacing-lg);
    }

    .header-text h1 {
        font-size: 2rem;
    }

    .logo {
        width: 60px;
        height: 60px;
    }
}

@media (max-width: 480px) {
    .header-text h1 {
        font-size: 1.8rem;
    }

    .logo {
        width: 50px;
        height: 50px;
    }

    .sticky-header .logo {
        width: 30px;
        height: 30px;
    }

    .sticky-header .header-text h1 {
        font-size: 14px;
    }
}
```

---

## Logo SVG Reference

The design uses an inline SVG logo with the following structure:

```html
<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="32" height="32" fill="#111111"/>
    
    <!-- Bridge structure -->
    <rect x="4" y="20" width="24" height="3" fill="#78BEBA"/>
    <rect x="6" y="17" width="2" height="6" fill="#78BEBA"/>
    <rect x="24" y="17" width="2" height="6" fill="#78BEBA"/>
    
    <!-- Echo waves -->
    <circle cx="16" cy="12" r="2" fill="none" stroke="#E7B225" stroke-width="1"/>
    <circle cx="16" cy="12" r="4" fill="none" stroke="#2069af" stroke-width="1" opacity="0.7"/>
    <circle cx="16" cy="12" r="6" fill="none" stroke="#D35233" stroke-width="1" opacity="0.5"/>
    
    <!-- Central point -->
    <circle cx="16" cy="12" r="1" fill="#fbf9e2"/>
    
    <!-- Pixelated details -->
    <rect x="8" y="25" width="2" height="2" fill="#78BEBA"/>
    <rect x="12" y="25" width="2" height="2" fill="#78BEBA"/>
    <rect x="18" y="25" width="2" height="2" fill="#78BEBA"/>
    <rect x="22" y="25" width="2" height="2" fill="#78BEBA"/>
</svg>
```

---

## Usage Notes

1. **File Structure**: Place the MP4 file (`Daniel_Ramirez_Reel.mp4`) in the root directory alongside `index.html`.

2. **Image Rendering**: Always use `image-rendering: pixelated` or `crisp-edges` on video elements to maintain the retro aesthetic.

3. **CSS Variables**: All colors and spacing are defined as CSS custom properties — modify `:root` to customize the theme.

4. **Background Animation**: The floating shapes are optional. If used, add them via JavaScript or include the HTML elements.

5. **Accessibility**: Maintain sufficient contrast between `--lufs-white` (text) and `--lufs-black` (background).