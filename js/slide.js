/* slide.js - Common javascript for the slides */
"use strict";

// Pass keyboard events to the parent so that keyboard shortcuts work even if the iframe has grabbed focus.
window.addEventListener('keyup', function(e) {
    if (window.parent) {
        window.parent.postMessage({key: e.key}, "*");
    }
});

window.addEventListener('message', function(e) {
    if (e.data.fontSize) {
        const body = document.querySelector('body');
        body.style.fontSize = e.data.fontSize;
    } else if (window.parent) {
        window.parent.postMessage(e.data, "*");
    }
});

/* Resize child font size to match the parent slide. */
(function() {
    const page = document.querySelector('.mock-browser__iframe');
    if (page) {
        page.addEventListener('load', function() {
            const body = document.querySelector('body');
            const body_style = window.getComputedStyle(body, null);
            page.contentWindow.postMessage({'fontSize': body_style.fontSize}, "*");
        });
    }
})();
