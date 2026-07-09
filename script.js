// reel.danialrami.com — Daniel Ramirez / Sound Design Reel
// Self-contained, no build step. Uniform custom cursor + slow, subtle
// Canvas2D reactive point-cloud background (muted personal palette).

(function () {
  'use strict';

  // footer year
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* uniform cursor (dot + lagging ring; ring warms to gold on hover) */
  (function () {
    var d = document.querySelector('.cur-dot'), r = document.querySelector('.cur-ring');
    if (!d || !r) return;
    if (('ontouchstart' in window) || navigator.maxTouchPoints > 0) { d.style.display = r.style.display = 'none'; return; }
    var mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      d.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
    }, { passive: true });
    addEventListener('mouseover', function (e) { if (e.target.closest('[data-hover]')) r.style.borderColor = 'rgba(217,162,61,.9)'; });
    addEventListener('mouseout', function (e) { if (e.target.closest('[data-hover]')) r.style.borderColor = 'rgba(232,228,212,.7)'; });
    (function l() {
      rx += (mx - rx) * .18; ry += (my - ry) * .18;
      r.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(l);
    })();
  })();

  /* reactive Canvas2D point cloud — slow + subtle (preview == live, no CDN) */
  (function () {
    var cv = document.getElementById('bg'); if (!cv) return;
    var ctx = cv.getContext('2d'); var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    function size() { cv.width = Math.max(1, innerWidth * DPR); cv.height = Math.max(1, innerHeight * DPR); }
    size(); addEventListener('resize', size); addEventListener('orientationchange', size);
    var MAX = 2600, A = [];
    for (var i = 0; i < MAX; i++) {
      var y = 1 - (i / (MAX - 1)) * 2, rr = Math.sqrt(Math.max(0, 1 - y * y)), t = i * 2.399963;
      A.push([Math.cos(t) * rr * 1.5, y * 1.5, Math.sin(t) * rr * 1.5]);
    }
    var cols = [[217, 162, 61], [159, 193, 208], [140, 138, 107], [200, 101, 74]]; // gold, dusty blue, sage, terracotta
    var ang = 0;
    function frame() {
      ang += reduce ? 0 : 0.00055;                       // slow
      ctx.clearRect(0, 0, cv.width, cv.height);
      var cx = cv.width / 2, cy = cv.height * 0.46, scale = Math.min(cv.width, cv.height) * 0.5, fov = 3.0, count = 1500;
      for (var j = 0; j < count; j++) {                  // stride-sample: count = density, not coverage
        var idx = (j * MAX / count) | 0, p = A[idx];
        var ca = Math.cos(ang), sa = Math.sin(ang);
        var rx = p[0] * ca - p[2] * sa, rz = p[0] * sa + p[2] * ca;
        var pf = fov / (fov + rz);
        var sx = cx + rx * scale * pf, sy = cy + p[1] * scale * pf;
        var c = cols[idx % 4], s = Math.max(0.6, 1.0 * pf * DPR);
        ctx.globalAlpha = Math.min(0.20, 0.12 * pf + 0.05);   // subtle
        ctx.fillStyle = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
        ctx.fillRect(sx, sy, s, s);
      }
      requestAnimationFrame(frame);
    }
    frame();
  })();
})();
