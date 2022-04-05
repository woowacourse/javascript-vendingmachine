"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.generateRandomCoins = exports.getProductIndex = exports.getProductRowIndex = exports.getProductInfoModify = exports.getProductInfo = void 0;
var dom_1 = require("./dom");
var getProductInfo = function () {
    var name = (0, dom_1.$)('#product-name-input').value;
    var price = Number((0, dom_1.$)('#product-price-input').value);
    var quantity = Number((0, dom_1.$)('#product-quantity-input').value);
    return { name: name, price: price, quantity: quantity };
};
exports.getProductInfo = getProductInfo;
var getProductInfoModify = function (productNode) {
    var name = (0, dom_1.$)('.product-info-name', productNode).value;
    var price = Number((0, dom_1.$)('.product-info-price', productNode).value);
    var quantity = Number((0, dom_1.$)('.product-info-quantity', productNode).value);
    return { name: name, price: price, quantity: quantity };
};
exports.getProductInfoModify = getProductInfoModify;
var getProductRowIndex = function (productRow) {
    return __spreadArray([], (0, dom_1.$)('#product-list').childNodes, true).findIndex(function (row) { return row === productRow; });
};
exports.getProductRowIndex = getProductRowIndex;
var getProductIndex = function (name) {
    return this.products.findIndex(function (product) { return product.name === name; });
};
exports.getProductIndex = getProductIndex;
var generateRandomCoins = function (inputMoney) {
    var coins = this.coins.map(function (_a) {
        var amount = _a.amount;
        return amount;
    });
    var coinList = [0, 0, 0, 0];
    while (inputMoney > 0) {
        var pickLength = coins.filter(function (coin) { return inputMoney >= coin; });
        var coinIndex = Math.floor(Math.random() * pickLength.length);
        coinList[coinIndex] += 1;
        inputMoney -= coins[coinIndex];
    }
    return coinList;
};
exports.generateRandomCoins = generateRandomCoins;
