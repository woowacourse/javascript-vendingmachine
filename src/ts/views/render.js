"use strict";
exports.__esModule = true;
exports.drawTotalMoney = exports.drawCoins = exports.switchButtons = exports.drawProductList = void 0;
var dom_1 = require("../utils/dom");
var drawProductList = function (parentNode) {
    if (parentNode === void 0) { parentNode = document; }
    var template = this.products
        .map(function (_a) {
        var name = _a.name, price = _a.price, quantity = _a.quantity;
        return "<tr class=\"product-info\">\n          <td class=\"product-info__text\">".concat(name, "</td>\n          <td class=\"product-info__text\">").concat(price, "</td>\n          <td class=\"product-info__text\">").concat(quantity, "</td>\n          <td class=\"product-info__input\"><input type=\"text\" minlength=\"1\" maxlength=\"10\" required=\"required\" class=\"product-info-name\" value=\"").concat(name, "\" /></td>\n          <td class=\"product-info__input\"><input type=\"number\" max=\"10000\" min=\"100\" required=\"required\" class=\"product-info-price\" value=\"").concat(price, "\" /></td>\n          <td class=\"product-info__input\"><input type=\"number\" max=\"20\" min=\"1\" required=\"required\" class=\"product-info-quantity\" value=\"").concat(quantity, "\" /></td>\n          <td>\n            ").concat((0, exports.switchButtons)(parentNode), "\n          </td>\n        </tr>");
    })
        .join('');
    (0, dom_1.$)('#product-list', parentNode).replaceChildren();
    (0, dom_1.$)('#product-list', parentNode).insertAdjacentHTML('beforeend', template);
};
exports.drawProductList = drawProductList;
var switchButtons = function (parentNode) {
    if (parentNode === document) {
        return "\n      <button class=\"modify-button button\">\uC218\uC815</button>\n      <button class=\"delete-button button\">\uC0AD\uC81C</button>\n      <button class=\"confirm-button button\">\uD655\uC778</button>\n    ";
    }
    return "<button class=\"buy-button button\">\uAD6C\uB9E4</button>";
};
exports.switchButtons = switchButtons;
var drawCoins = function () {
    var _this = this;
    this.coins.forEach(function (_a) {
        var amount = _a.amount, count = _a.count;
        (0, dom_1.$)("#coin-".concat(amount, "-count"), _this.$buy).innerText = "".concat(count, "\uAC1C");
    });
};
exports.drawCoins = drawCoins;
var drawTotalMoney = function () {
    (0, dom_1.$)('.input-money-indicator').textContent = "\uD22C\uC785\uD55C \uAE08\uC561: ".concat(this.totalMoney, "\uC6D0");
};
exports.drawTotalMoney = drawTotalMoney;
