"use strict";
exports.__esModule = true;
var dom_1 = require("../util/dom");
var isValidInputMoney_1 = require("../validation/isValidInputMoney");
var ProductBuyImpl = /** @class */ (function () {
    function ProductBuyImpl(products, coins) {
        var _this = this;
        this.products = products;
        this.coins = coins;
        this.totalMoney = 0;
        this.$buy = (0, dom_1.$)('.buy');
        window.addEventListener('load', function () {
            (0, dom_1.$)('#tab__buy-button').addEventListener('click', _this.drawProductList.bind(_this));
            (0, dom_1.$)('#charge-money-form', _this.$buy).addEventListener('submit', _this.handleChargeMoney.bind(_this));
        });
    }
    ProductBuyImpl.prototype.handleChargeMoney = function (e) {
        e.preventDefault();
        var inputMoney = Number((0, dom_1.$)('#charge-money-input', this.$buy).value);
        if ((0, isValidInputMoney_1.isValidInputMoney)(inputMoney)) {
            this.totalMoney += inputMoney;
            (0, dom_1.$)('.input-money-indicator').textContent = "\uD22C\uC785\uD55C \uAE08\uC561: ".concat(this.totalMoney, "\uC6D0");
        }
    };
    ProductBuyImpl.prototype.chargeMoney = function (coinList) { };
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
    ProductBuyImpl.prototype.drawCoins = function () { };
    return ProductBuyImpl;
}());
exports["default"] = ProductBuyImpl;
