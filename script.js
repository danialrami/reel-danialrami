// Sound Design Reel — minimal JS for sticky header and optional animated background.
// No build tools required; progressive enhancement approach.

(function () {
    'use strict';

    // --- Sticky header on scroll ---
    var header = document.getElementById('sticky-header');
    if (!header) return;

    var lastScroll = 0;
    var ticking = false;

    function updateHeader() {
        var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > 100) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    // --- Optional animated background shapes ---
    var bg = document.getElementById('animated-background');
    if (!bg) return;

    var shapesConfig = [
        { className: 'square', count: 5, duration: 12, delayRange: [0, 3] },
        { className: 'circle', count: 5, duration: 18, delayRange: [1, 4] },
        { className: 'triangle', count: 4, duration: 20, delayRange: [0.5, 3.5] },
        { className: 'diamond', count: 3, duration: 15, delayRange: [0, 4] }
    ];

    function createShape(shapeType) {
        var el = document.createElement('div');
        el.className = 'floating-shape ' + shapeType;
        // Randomize size between 40px and 120px
        var size = 40 + Math.random() * 80;
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        // Position randomly across viewport
        el.style.left = (Math.random() * 100) + 'vw';
        el.style.top = (Math.random() * 100) + 'vh';
        // Randomize animation delay and duration
        var dur = shapeType === 'triangle' ? 12 + Math.random() * 10 : 12 + Math.random() * 16;
        el.style.animationDuration = dur + 's';
        el.style.animationDelay = (Math.random() * 4) + 's';
        return el;
    }

    function mountShapes() {
        shapesConfig.forEach(function (cfg) {
            for (var i = 0; i < cfg.count; i++) {
                bg.appendChild(createShape(cfg.className));
            }
        });
    }

    // Initialize background once DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountShapes);
    } else {
        mountShapes();
    }

    // --- Lightweight intersection-based video preload hint ---
    var video = document.querySelector('.reel-video');
    if (video) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    video.preload = 'auto';
                    observer.disconnect();
                }
            });
        }, { rootMargin: '200px' });
        observer.observe(video);
    }
})();
