/* slide.js - Common javascript for the slides */

// Pass keyboard events to the parent so that keyboard shortcuts work even if the iframe has grabbed focus.
window.addEventListener('keyup', function(e) {
    if (window.parent) {
        window.parent.postMessage({key: e.key}, "*");
    }
});

window.addEventListener('message', function(e) {
    if (window.parent) {
        window.parent.postMessage(e.data, "*");
    }
});
