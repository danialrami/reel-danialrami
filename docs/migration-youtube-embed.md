# Migration Plan: Local MP4 to YouTube Embed

## Overview

Replace the local 428MB `Daniel_Ramirez_Reel.mp4` file with a YouTube iframe embed.

**YouTube Video URL:** `https://youtu.be/a35DThhG7u0?si=Ql2saAQ9inpAffij`
**Video ID:** `a35DThhG7u0`

---

## Current State

- **MP4 file:** `Daniel_Ramirez_Reel.mp4` (428MB)
- **Embedding:** HTML5 `<video>` tag in `index.html:81-84`
- **.gitignore:** Minimal, does not include MP4 files

---

## Execution Steps

### 1. Add MP4 to .gitignore

Add `*.mp4` to prevent future tracking of video files.

### 2. Remove MP4 from Git History

Use `git filter-repo` to remove the file from all commits.

**Command:**
```bash
git filter-repo --path Daniel_Ramirez_Reel.mp4 --invert-paths --force
```

**Alternative (if git-filter-repo not installed):**
```bash
git filter-branch --tree-filter 'rm -f Daniel_Ramirez_Reel.mp4' --force --all
```

### 3. Delete Local MP4 File

Remove the local file (keeps local copy as backup before deleting):
```bash
rm Daniel_Ramirez_Reel.mp4
```

### 4. Update index.html

Replace the `<video>` element with a YouTube iframe embed.

**Replace this (lines 81-84):**
```html
<video class="reel-video" controls preload="metadata" playsinline>
    <source src="Daniel_Ramirez_Reel.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>
```

**With this:**
```html
<iframe
    class="reel-video"
    src="https://www.youtube.com/embed/a35DThhG7u0?si=Ql2saAQ9inpAffij"
    title="Daniel Ramirez Sound Reel"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
</iframe>
```

### 5. Update styles.css (if needed)

The iframe may need similar styling to the video element. Check for `.reel-video` styles and ensure iframe displays correctly.

---

## Verification

- [ ] `.gitignore` contains `*.mp4`
- [ ] MP4 removed from git history (`git log --all --oneline -- Daniel_Ramirez_Reel.mp4` should return nothing)
- [ ] Local MP4 file deleted
- [ ] `index.html` uses YouTube iframe embed
- [ ] Website displays video correctly at `https://reel.danialrami.com`

---

## Rollback Plan

If issues arise:

1. **Restore MP4 from backup:** Re-download from original source
2. **Revert index.html:** Use `git checkout HEAD~1 -- index.html`
3. **Remove from .gitignore:** Edit `.gitignore` to remove `*.mp4`

---

## Benefits of This Migration

| Aspect | Before | After |
|--------|--------|-------|
| Repo size | +428MB | Minimal |
| Load time | Downloads full MP4 | Adaptive streaming |
| Bandwidth | High | Reduced |
| Git clones | Slow | Fast |
| Hosting | Self-hosted | YouTube CDN |