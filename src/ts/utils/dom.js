"use strict";
exports.__esModule = true;
exports.addEvent = exports.selectDomAll = exports.selectDom = void 0;
var selectDom = function (selector, element) {
    if (element === void 0) { element = document; }
    return element.querySelector(selector);
};
exports.selectDom = selectDom;
var selectDomAll = function (selector, element) {
    if (element === void 0) { element = document; }
    return Array.from(element.querySelectorAll(selector));
};
exports.selectDomAll = selectDomAll;
var addEvent = function (target, eventName, handler) {
    Array.isArray(target)
        ? target.map(function (v) { return v.addEventListener(eventName, handler); })
        : target.addEventListener(eventName, handler);
};
exports.addEvent = addEvent;
