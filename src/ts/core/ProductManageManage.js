"use strict";
exports.__esModule = true;
var dom_1 = require("../utils/dom");
var render_1 = require("../views/render");
var productUtil_1 = require("../utils/productUtil");
var ProductManagemManage = /** @class */ (function () {
    function ProductManagemManage(products, verifyValue) {
        var _this = this;
        this.products = products;
        this.verifyValue = verifyValue;
        window.addEventListener('load', function () {
            (0, dom_1.$)('#tab__manage-button').addEventListener('click', render_1.renderProductList.bind(_this, document));
            (0, dom_1.$)('#add-product-form').addEventListener('submit', _this.handleAddProduct.bind(_this));
            (0, dom_1.$)('#product-list').addEventListener('click', _this.handleClickButtons.bind(_this));
        });
    }
    ProductManagemManage.prototype.handleAddProduct = function (e) {
        e.preventDefault();
        var productInfo = productUtil_1.getProductInfo.call(this);
        if (this.verifyValue.verifyProductInfo(productInfo, -1)) {
            this.addProduct(productInfo);
            render_1.renderProductList.call(this);
        }
    };
    ProductManagemManage.prototype.handleClickButtons = function (e) {
        var productTr = e.target.closest('tr');
        if (e.target.classList.contains('modify-button')) {
            productTr.classList.add('modify');
        }
        if (e.target.classList.contains('delete-button') && confirm('정말 삭제하시겠습니까?')) {
            this.deleteProduct(productTr.children[0].innerText);
            render_1.renderProductList.call(this);
        }
        if (e.target.classList.contains('confirm-button')) {
            var productInfo = productUtil_1.getProductInfoModify.call(this, productTr);
            var index = productUtil_1.getProductRowIndex.call(this, productTr);
            if (this.verifyValue.verifyProductInfo(productInfo, index)) {
                this.modifyProduct(productInfo, index);
                render_1.renderProductList.call(this);
            }
        }
    };
    ProductManagemManage.prototype.addProduct = function (productInfo) {
        this.products.push(productInfo);
    };
    ProductManagemManage.prototype.modifyProduct = function (productInfo, index) {
        this.products[index] = productInfo;
    };
    ProductManagemManage.prototype.deleteProduct = function (name) {
        this.products.splice(productUtil_1.getProductIndex.call(this, name), 1);
    };
    return ProductManagemManage;
}());
exports["default"] = ProductManagemManage;
