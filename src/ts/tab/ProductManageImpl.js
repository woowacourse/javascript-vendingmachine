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
var index_1 = require("../constants/index");
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
        if (this.isValidProductInfo(productInfo, -1)) {
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
            if (this.isValidProductInfo(productInfo, index)) {
                this.modifyProduct(productInfo, index);
                this.drawProductList();
            }
        }
    };
    ProductManageImpl.prototype.isValidProductInfo = function (_a, index) {
        var name = _a.name, price = _a.price, quantity = _a.quantity;
        if (name.length < index_1.PRODUCT_RULES.MIN_NAME_LENGTH ||
            name.length > index_1.PRODUCT_RULES.MAX_NAME_LENGTH) {
            alert("\uC0C1\uD488\uBA85\uC740 ".concat(index_1.PRODUCT_RULES.MIN_NAME_LENGTH, "\uAE00\uC790\uBD80\uD130 ").concat(index_1.PRODUCT_RULES.MAX_NAME_LENGTH, "\uAE00\uC790\uAE4C\uC9C0\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4."));
            return false;
        }
        if (this.products.some(function (product, productIndex) {
            return productIndex !== index && product.name === name;
        })) {
            alert("\uC0C1\uD488\uBA85\uC740 \uC911\uBCF5\uB418\uC9C0 \uC54A\uC544\uC57C\uD569\uB2C8\uB2E4.");
            return false;
        }
        if (price < index_1.PRODUCT_RULES.MIN_PRICE ||
            price > index_1.PRODUCT_RULES.MAX_PRICE ||
            price % index_1.PRODUCT_RULES.PRICE_MOD_UNIT !== 0) {
            alert("\uC0C1\uD488\uAC00\uACA9\uC740 ".concat(index_1.PRODUCT_RULES.PRICE_MOD_UNIT, "\uC73C\uB85C \uB098\uB204\uC5B4 \uB5A8\uC5B4\uC838\uC57C\uD558\uBA70, ").concat(index_1.PRODUCT_RULES.MIN_PRICE, "~").concat(index_1.PRODUCT_RULES.MAX_PRICE, "\uAE4C\uC9C0\uC758 \uAC12\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4."));
            return false;
        }
        if (quantity < index_1.PRODUCT_RULES.MIN_QUANTITY ||
            quantity > index_1.PRODUCT_RULES.MAX_QUANTITY) {
            alert("\uC0C1\uD488\uC218\uB7C9\uC740 ".concat(index_1.PRODUCT_RULES.MIN_QUANTITY, "~").concat(index_1.PRODUCT_RULES.MAX_QUANTITY, "\uC758 \uAC12\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4."));
            return false;
        }
        return true;
    };
    ProductManageImpl.prototype.drawProductList = function () {
        var template = this.products
            .map(function (_a) {
            var name = _a.name, price = _a.price, quantity = _a.quantity;
            return "<tr class=\"product-info\">\n          <td class=\"product-info__text\">".concat(name, "</td>\n          <td class=\"product-info__text\">").concat(price, "</td>\n          <td class=\"product-info__text\">").concat(quantity, "</td>\n          <td class=\"product-info__input\"><input type=\"text\" class=\"product-info-name\" value=\"").concat(name, "\" /></td>\n          <td class=\"product-info__input\"><input type=\"number\" class=\"product-info-price\" value=\"").concat(price, "\" /></td>\n          <td class=\"product-info__input\"><input type=\"number\" class=\"product-info-quantity\" value=\"").concat(quantity, "\" /></td>\n          <td>\n            <button class=\"modify-button button\">\uC218\uC815</button>\n            <button class=\"delete-button button\">\uC0AD\uC81C</button>\n            <button class=\"confirm-button button\">\uD655\uC778</button>\n          </td>\n        </tr>");
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
        if (this.products.splice(this.getProductIndex(name), 1).length === 0) {
            return false;
        }
        return true;
    };
    ProductManageImpl.prototype.getProductIndex = function (name) {
        return this.products.findIndex(function (product) { return product.name === name; });
    };
    return ProductManageImpl;
}());
exports["default"] = ProductManageImpl;
