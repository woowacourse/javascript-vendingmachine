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
var dom_1 = require("../util/dom");
var isValidInputMoney_1 = require("../validation/isValidInputMoney");
var isValidProductInfo_1 = require("../validation/isValidProductInfo");
var ProductBuyImpl = /** @class */ (function () {
    function ProductBuyImpl(products, coins) {
        var _this = this;
        this.products = products;
        this.coins = coins;
        this.totalMoney = 0;
        this.$buy = (0, dom_1.$)('.buy');
        window.addEventListener('load', function () {
            (0, dom_1.$)('#tab__buy-button').addEventListener('click', _this.updateResources.bind(_this));
            (0, dom_1.$)('#charge-money-form', _this.$buy).addEventListener('submit', _this.handleChargeMoney.bind(_this));
            (0, dom_1.$)('#product-list', _this.$buy).addEventListener('click', _this.handleBuyProduct.bind(_this));
            (0, dom_1.$)('.return-button', _this.$buy).addEventListener('click', _this.returnMoney.bind(_this));
        });
    }
    ProductBuyImpl.prototype.updateResources = function () {
        console.log('click');
        this.drawProductList();
        this.drawCoins();
    };
    ProductBuyImpl.prototype.handleChargeMoney = function (e) {
        e.preventDefault();
        var inputMoney = Number((0, dom_1.$)('#charge-money-input', this.$buy).value);
        if ((0, isValidInputMoney_1.isValidInputMoney)(inputMoney)) {
            this.totalMoney += inputMoney;
            this.drawTotoalMoney();
        }
    };
    ProductBuyImpl.prototype.handleBuyProduct = function (e) {
        if (!e.target.classList.contains('buy-button')) {
            return;
        }
        var productInfo = this.getProductInfoModify(e.target.closest('tr'));
        var index = this.getProductIndex(productInfo.name);
        if ((0, isValidProductInfo_1.canBuyProduct)(productInfo, this.totalMoney)) {
            this.modifyProduct(productInfo, index);
            this.drawProductList();
        }
    };
    ProductBuyImpl.prototype.returnMoney = function () {
        for (var i = this.coins.length - 1; i > 0; i--) {
            while (this.totalMoney >= this.coins[i].amount &&
                this.coins[i].count >= 1) {
                this.totalMoney -= this.coins[i].amount;
                this.coins[i].count -= 1;
            }
        }
        this.drawCoins();
        this.drawTotoalMoney();
    };
    ProductBuyImpl.prototype.drawProductList = function () {
        console.log(this.products);
        var template = this.products
            .map(function (_a) {
            var name = _a.name, price = _a.price, quantity = _a.quantity;
            return "<tr class=\"product-info\">\n          <td class=\"product-info__text\">".concat(name, "</td>\n          <td class=\"product-info__text\">").concat(price, "</td>\n          <td class=\"product-info__text\">").concat(quantity, "</td>\n          <td class=\"product-info__input\"><input type=\"text\" minlength=\"1\" maxlength=\"10\" required=\"required\" class=\"product-info-name\" value=\"").concat(name, "\" /></td>\n          <td class=\"product-info__input\"><input type=\"number\" max=\"10000\" min=\"100\" required=\"required\" class=\"product-info-price\" value=\"").concat(price, "\" /></td>\n          <td class=\"product-info__input\"><input type=\"number\" max=\"20\" min=\"1\" required=\"required\" class=\"product-info-quantity\" value=\"").concat(quantity, "\" /></td>\n          <td>\n            <button class=\"buy-button button\">\uAD6C\uB9E4</button>\n          </td>\n        </tr>");
        })
            .join('');
        (0, dom_1.$)('#product-list', this.$buy).replaceChildren();
        (0, dom_1.$)('#product-list', this.$buy).insertAdjacentHTML('beforeend', template);
    };
    ProductBuyImpl.prototype.drawCoins = function () {
        var _this = this;
        console.log(this.coins);
        this.coins.forEach(function (_a) {
            var amount = _a.amount, count = _a.count;
            (0, dom_1.$)("#coin-".concat(amount, "-count"), _this.$buy).innerText = "".concat(count, "\uAC1C");
        });
    };
    ProductBuyImpl.prototype.drawTotoalMoney = function () {
        (0, dom_1.$)('.input-money-indicator').textContent = "\uD22C\uC785\uD55C \uAE08\uC561: ".concat(this.totalMoney, "\uC6D0");
    };
    ProductBuyImpl.prototype.getProductInfoModify = function (productNode) {
        var name = (0, dom_1.$)('.product-info-name', productNode).value;
        var price = Number((0, dom_1.$)('.product-info-price', productNode).value);
        var quantity = Number((0, dom_1.$)('.product-info-quantity', productNode).value);
        return { name: name, price: price, quantity: quantity };
    };
    ProductBuyImpl.prototype.getProductRowIndex = function (productRow) {
        return __spreadArray([], (0, dom_1.$)('#product-list').childNodes, true).findIndex(function (row) { return row === productRow; });
    };
    ProductBuyImpl.prototype.getProductIndex = function (name) {
        return this.products.findIndex(function (product) { return product.name === name; });
    };
    ProductBuyImpl.prototype.modifyProduct = function (_a, index) {
        var price = _a.price, quantity = _a.quantity;
        quantity -= 1;
        this.totalMoney -= price;
        this.drawTotoalMoney();
    };
    return ProductBuyImpl;
}());
exports["default"] = ProductBuyImpl;
