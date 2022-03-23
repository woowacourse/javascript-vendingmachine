"use strict";
exports.__esModule = true;
exports.$ = void 0;
var $ = function (selector, parentNode) {
    if (parentNode === void 0) { parentNode = document; }
    return parentNode.querySelector(selector);
};
exports.$ = $;
