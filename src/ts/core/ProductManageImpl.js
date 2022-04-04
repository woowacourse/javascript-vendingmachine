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
var isValidProductInfo_1 = require("../validation/isValidProductInfo");
var ProductManageImpl = /** @class */ (function () {
    function ProductManageImpl(products) {
        var _this = this;
        this.products = products;
        window.addEventListener('load', function () {
            (0, dom_1.$)('#add-product-form').addEventListener('submit', _this.handleAddProduct.bind(_this));
            (0, dom_1.$)('#product-list').addEventListener('click', _this.handleClickButtons.bind(_this));
        });
    }
    ProductManageImpl.prototype.getProductInfo = function () {
        var name = (0, dom_1.$)('#product-name-input').value;
        var price = Number((0, dom_1.$)('#product-price-input').value);
        var quantity = Number((0, dom_1.$)('#product-quantity-input').value);
        return { name: name, price: price, quantity: quantity };
    };
    ProductManageImpl.prototype.getProductInfoModify = function (productNode) {
        var name = (0, dom_1.$)('.product-info-name', productNode).value;
        var price = Number((0, dom_1.$)('.product-info-price', productNode).value);
        var quantity = Number((0, dom_1.$)('.product-info-quantity', productNode).value);
        return { name: name, price: price, quantity: quantity };
    };
    ProductManageImpl.prototype.handleAddProduct = function (e) {
        e.preventDefault();
        var productInfo = this.getProductInfo();
        if ((0, isValidProductInfo_1.isValidProductInfo)(productInfo, -1, this.products)) {
            this.addProduct(productInfo);
            this.drawProductList();
        }
    };
    ProductManageImpl.prototype.getProductRowIndex = function (productRow) {
        return __spreadArray([], (0, dom_1.$)('#product-list').childNodes, true).findIndex(function (row) { return row === productRow; });
    };
    ProductManageImpl.prototype.handleClickButtons = function (e) {
        if (e.target.classList.contains('modify-button')) {
            e.target.closest('tr').classList.add('modify');
        }
        if (e.target.classList.contains('delete-button') &&
            confirm('정말 삭제하시겠습니까?')) {
            this.deleteProduct(e.target.closest('tr').children[0].innerText);
            this.drawProductList();
        }
        if (e.target.classList.contains('confirm-button')) {
            var productInfo = this.getProductInfoModify(e.target.closest('tr'));
            var index = this.getProductRowIndex(e.target.closest('tr'));
            if ((0, isValidProductInfo_1.isValidProductInfo)(productInfo, index, this.products)) {
                this.modifyProduct(productInfo, index);
                this.drawProductList();
            }
        }
    };
    ProductManageImpl.prototype.drawProductList = function () {
        var template = this.products
            .map(function (_a) {
            var name = _a.name, price = _a.price, quantity = _a.quantity;
            return "<tr class=\"product-info\">\n          <td class=\"product-info__text\">".concat(name, "</td>\n          <td class=\"product-info__text\">").concat(price, "</td>\n          <td class=\"product-info__text\">").concat(quantity, "</td>\n          <td class=\"product-info__input\"><input type=\"text\" minlength=\"1\" maxlength=\"10\" required=\"required\" class=\"product-info-name\" value=\"").concat(name, "\" /></td>\n          <td class=\"product-info__input\"><input type=\"number\" max=\"10000\" min=\"100\" required=\"required\" class=\"product-info-price\" value=\"").concat(price, "\" /></td>\n          <td class=\"product-info__input\"><input type=\"number\" max=\"20\" min=\"1\" required=\"required\" class=\"product-info-quantity\" value=\"").concat(quantity, "\" /></td>\n          <td>\n            <button class=\"modify-button button\">\uC218\uC815</button>\n            <button class=\"delete-button button\">\uC0AD\uC81C</button>\n            <button class=\"confirm-button button\">\uD655\uC778</button>\n          </td>\n        </tr>");
        })
            .join('');
        (0, dom_1.$)('#product-list').replaceChildren();
        (0, dom_1.$)('#product-list').insertAdjacentHTML('beforeend', template);
    };
    ProductManageImpl.prototype.addProduct = function (productInfo) {
        this.products.push(productInfo);
    };
    ProductManageImpl.prototype.modifyProduct = function (productInfo, index) {
        this.products[index] = productInfo;
    };
    ProductManageImpl.prototype.deleteProduct = function (name) {
        this.products.splice(this.getProductIndex(name), 1);
    };
    ProductManageImpl.prototype.getProductIndex = function (name) {
        return this.products.findIndex(function (product) { return product.name === name; });
    };
    return ProductManageImpl;
}());
exports["default"] = ProductManageImpl;
