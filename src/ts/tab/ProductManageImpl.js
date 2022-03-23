"use strict";
exports.__esModule = true;
var dom_1 = require("../util/dom");
var vendingMachineResource_1 = require("../resource/vendingMachineResource");
var ProductManageImpl = /** @class */ (function () {
    function ProductManageImpl() {
    }
    ProductManageImpl.prototype.addEvent = function () {
        (0, dom_1.$)('#add-product-form').addEventListener('submit', this.handleAddProduct.bind(this));
        (0, dom_1.$)('#product-list').addEventListener('click', this.handleClickButtons.bind(this));
    };
    ProductManageImpl.prototype.handleAddProduct = function (e) {
        e.preventDefault();
        var name = (0, dom_1.$)('#product-name-input').value;
        var price = Number((0, dom_1.$)('#product-price-input').value);
        var quantity = Number((0, dom_1.$)('#product-quantity-input').value);
        if (this.isValidProductInfo(name, price, quantity)) {
            this.addProduct(name, price, quantity);
            this.draw();
        }
    };
    ProductManageImpl.prototype.handleClickButtons = function (e) {
        console.log(e.target);
        if (e.target.classList.contains('modify-button')) {
        }
        if (e.target.classList.contains('delete-button')) {
            console.log(e.target.closest('tr').children[0].innerText);
            this.deleteProduct(e.target.closest('tr').children[0].innerText);
        }
        if (e.target.classList.contains('confirm-button')) {
        }
    };
    ProductManageImpl.prototype.isValidProductInfo = function (name, price, quantity) {
        if (name.length < 1 || name.length > 10) {
            return false;
        }
        if (vendingMachineResource_1["default"].products.some(function (product) { return product.name === name; })) {
            return false;
        }
        if (price < 100 || price > 10000 || price % 10 !== 0) {
            return false;
        }
        if (quantity < 0 || quantity > 20) {
            return false;
        }
        return true;
    };
    ProductManageImpl.prototype.draw = function () {
        var html = vendingMachineResource_1["default"]
            .products
            .map(function (_a) {
            var name = _a.name, price = _a.price, quantity = _a.quantity;
            return "<tr class=\"product-info\">\n          <td class=\"product-info__text\">".concat(name, "</td>\n          <td class=\"product-info__text\">").concat(price, "</td>\n          <td class=\"product-info__text\">").concat(quantity, "</td>\n          <td class=\"product-info__input\"><input type=\"text\" value=\"").concat(name, "\" /></td>\n          <td class=\"product-info__input\"><input type=\"text\" value=\"").concat(price, "\" /></td>\n          <td class=\"product-info__input\"><input type=\"text\" value=\"").concat(quantity, "\" /></td>\n          <td>\n            <button class=\"modify-button button\">\uC218\uC815</button>\n            <button class=\"delete-button button\">\uC0AD\uC81C</button>\n            <button class=\"confirm-button button\">\uD655\uC778</button>\n          </td>\n        </tr>");
        })
            .join('');
        (0, dom_1.$)('#product-list').innerHTML = html;
    };
    ProductManageImpl.prototype.addProduct = function (name, price, quantity) {
        if (this.isValidProductInfo(name, price, quantity)) {
            vendingMachineResource_1["default"].products.push({ name: name, price: price, quantity: quantity });
        }
    };
    ProductManageImpl.prototype.modifyProduct = function (name, price, quantity) {
        if (this.isValidProductInfo(name, price, quantity)) {
            vendingMachineResource_1["default"].products[this.index(name)] = { name: name, price: price, quantity: quantity };
        }
    };
    ProductManageImpl.prototype.deleteProduct = function (name) {
        vendingMachineResource_1["default"].products.splice(this.index(name), 1);
    };
    ProductManageImpl.prototype.index = function (name) {
        return vendingMachineResource_1["default"].products.findIndex(function (product) { return product.name === name; });
    };
    return ProductManageImpl;
}());
exports["default"] = ProductManageImpl;
