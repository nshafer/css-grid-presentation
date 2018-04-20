/* notes.js - Common javascript for the notes */

// Pass keyboard events to the parent so that keyboard shortcuts work even if the iframe has grabbed focus.
window.addEventListener('keyup', function(e) {
    if (window.opener) {
        window.opener.postMessage({key: e.key}, "*");
    } else if (window.parent) {
        window.parent.postMessage({key: e.key}, "*");
    }
});

if (window.opener) {
    document.getElementById('main').classList.add('popup');
}
