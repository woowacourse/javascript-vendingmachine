"use strict";
exports.__esModule = true;
var dom_1 = require("../util/dom");
var ProductManageImpl = /** @class */ (function () {
    function ProductManageImpl(products) {
        this.products = products;
        (0, dom_1.$)('#add-product-form').addEventListener('submit', this.handleAddProduct.bind(this));
        (0, dom_1.$)('#product-list').addEventListener('click', this.handleClickButtons.bind(this));
    }
    ProductManageImpl.prototype.handleAddProduct = function (e) {
        e.preventDefault();
        var name = (0, dom_1.$)('#product-name-input').value;
        var price = Number((0, dom_1.$)('#product-price-input').value);
        var quantity = Number((0, dom_1.$)('#product-quantity-input').value);
        if (this.isValidProductInfo(name, price, quantity)) {
            this.addProduct(name, price, quantity);
            this.drawProductList();
        }
    };
    ProductManageImpl.prototype.handleClickButtons = function (e) {
        if (e.target.classList.contains('modify-button')) {
            e.target.closest('tr').classList.add('modify');
        }
        if (e.target.classList.contains('delete-button') && confirm('정말 삭제하시겠습니까?')) {
            this.deleteProduct(e.target.closest('tr').children[0].innerText);
            this.drawProductList();
        }
        if (e.target.classList.contains('confirm-button')) {
            var name_1 = (0, dom_1.$)('.product-info-name', e.target.closest('tr')).value;
            var price = Number((0, dom_1.$)('.product-info-price', e.target.closest('tr')).value);
            var quantity = Number((0, dom_1.$)('.product-info-quantity', e.target.closest('tr')).value);
            this.modifyProduct(name_1, price, quantity);
            if (this.isValidModifyProductInfo(name_1, price, quantity)) {
                this.products[this.getProductIndex(name_1)] = { name: name_1, price: price, quantity: quantity };
                this.drawProductList();
            }
        }
    };
    ProductManageImpl.prototype.isValidModifyProductInfo = function (name, price, quantity) {
        if (name.length < 1 || name.length > 10) {
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
    ProductManageImpl.prototype.isValidProductInfo = function (name, price, quantity) {
        if (name.length < 1 || name.length > 10) {
            return false;
        }
        if (this.products.some(function (product) { return product.name === name; })) {
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
    ProductManageImpl.prototype.drawProductList = function () {
        var template = this
            .products
            .map(function (_a) {
            var name = _a.name, price = _a.price, quantity = _a.quantity;
            return "<tr class=\"product-info\">\n          <td class=\"product-info__text\">".concat(name, "</td>\n          <td class=\"product-info__text\">").concat(price, "</td>\n          <td class=\"product-info__text\">").concat(quantity, "</td>\n          <td class=\"product-info__input\"><input type=\"text\" class=\"product-info-name\" value=\"").concat(name, "\" /></td>\n          <td class=\"product-info__input\"><input type=\"text\" class=\"product-info-price\" value=\"").concat(price, "\" /></td>\n          <td class=\"product-info__input\"><input type=\"text\" class=\"product-info-quantity\" value=\"").concat(quantity, "\" /></td>\n          <td>\n            <button class=\"modify-button button\">\uC218\uC815</button>\n            <button class=\"delete-button button\">\uC0AD\uC81C</button>\n            <button class=\"confirm-button button\">\uD655\uC778</button>\n          </td>\n        </tr>");
        })
            .join('');
        (0, dom_1.$)('#product-list').replaceChildren();
        (0, dom_1.$)('#product-list').insertAdjacentHTML('beforeend', template);
    };
    ProductManageImpl.prototype.addProduct = function (name, price, quantity) {
        this.products.push({ name: name, price: price, quantity: quantity });
    };
    ProductManageImpl.prototype.modifyProduct = function (name, price, quantity) {
        if (this.isValidProductInfo(name, price, quantity)) {
            this.products[this.getProductIndex(name)] = { name: name, price: price, quantity: quantity };
        }
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
