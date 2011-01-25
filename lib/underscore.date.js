// Underscore.date
// (c) 2011 Ilia Ablamonov <ilia@flamefork.ru>
// Underscore.date is freely distributable under the terms of the MIT license.
// Documentation: https://github.com/Flamefork/underscore.date
// Some code is borrowed from Underscore.string.

(function(){
    // ------------------------- Baseline setup ---------------------------------

    // Establish the root object, "window" in the browser, or "global" on the server.
    var root = this;

    var _s = {};

    // CommonJS module is defined
    if (typeof window === 'undefined' && typeof module !== 'undefined') {
        // Export module
        module.exports = _s;

    // Integrate with Underscore.js
    } else if (typeof root._ !== 'undefined') {
        root._.mixin(_s);

    // Or define it
    } else {
        root._ = _s;
    }

}());