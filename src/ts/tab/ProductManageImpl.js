"use strict";
exports.__esModule = true;
var dom_1 = require("../util/dom");
var vendingMachineResource_1 = require("../resource/vendingMachineResource");
var ProductManageImpl = /** @class */ (function () {
    function ProductManageImpl() {
    }
    ProductManageImpl.prototype.addEvent = function () {
        (0, dom_1.$)('#product-list').addEventListener('click', this.handleClickButtons.bind(this));
    };
    ProductManageImpl.prototype.handleClickButtons = function (e) {
        if (e.target.classList.contains('modify-button')) {
        }
        if (e.target.classList.contains('delete-button')) {
            console.log(e.target.closest('tr').children[0].innerText);
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
    ProductManageImpl.prototype.addProduct = function (name, price, quantity) {
        if (this.isValidProductInfo(name, price, quantity)) {
            vendingMachineResource_1["default"].products.push({ name: name, price: price, quantity: quantity });
        }
    };
    ProductManageImpl.prototype.modifyProduct = function (name, price, quantity, index) {
        if (this.isValidProductInfo(name, price, quantity)) {
            vendingMachineResource_1["default"].products[index] = { name: name, price: price, quantity: quantity };
        }
    };
    ProductManageImpl.prototype.deleteProduct = function (index) {
        vendingMachineResource_1["default"].products.splice(index, 1);
    };
    return ProductManageImpl;
}());
exports["default"] = ProductManageImpl;
