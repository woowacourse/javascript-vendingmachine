"use strict";
exports.__esModule = true;
var dom_1 = require("../utils/dom");
var render_1 = require("../views/render");
var productUtil_1 = require("../utils/productUtil");
var ProductBuyTab = /** @class */ (function () {
    function ProductBuyTab(products, coins, verifyValue) {
        var _this = this;
        this.verifyValue = verifyValue;
        this.products = products;
        this.coins = coins;
        this.totalMoney = 0;
        this.$buy = (0, dom_1.$)('.app__main.buy');
        window.addEventListener('load', function () {
            (0, dom_1.$)('#tab__buy-button').addEventListener('click', _this.updateResources.bind(_this));
            (0, dom_1.$)('#input-money-form', _this.$buy).addEventListener('submit', _this.handleChargeMoney.bind(_this));
            (0, dom_1.$)('#product-list', _this.$buy).addEventListener('click', _this.handleBuyProduct.bind(_this));
            (0, dom_1.$)('.return-button', _this.$buy).addEventListener('click', _this.handleReturnMoney.bind(_this));
        });
    }
    ProductBuyTab.prototype.updateResources = function () {
        render_1.drawProductList.call(this, this.$buy);
        render_1.drawCoins.call(this);
    };
    ProductBuyTab.prototype.handleChargeMoney = function (e) {
        e.preventDefault();
        var inputMoney = Number((0, dom_1.$)('#input-money-input', this.$buy).value);
        if (this.verifyValue.verifyInputMoney(inputMoney)) {
            this.totalMoney += inputMoney;
            render_1.drawTotalMoney.call(this);
        }
    };
    ProductBuyTab.prototype.handleBuyProduct = function (e) {
        if (!e.target.classList.contains('buy-button')) {
            return;
        }
        var productInfo = productUtil_1.getProductInfoModify.call(this, e.target.closest('tr'));
        var index = productUtil_1.getProductIndex.call(this, productInfo.name);
        if (this.verifyValue.canBuyProduct(productInfo, this.totalMoney)) {
            this.saleProduct(productInfo, index);
            render_1.drawProductList.call(this, this.$buy);
        }
    };
    ProductBuyTab.prototype.handleReturnMoney = function () {
        for (var i = this.coins.length - 1; i >= 0; i--) {
            while (this.totalMoney >= this.coins[i].amount && this.coins[i].count >= 1) {
                this.totalMoney -= this.coins[i].amount;
                this.coins[i].count -= 1;
            }
        }
        render_1.drawCoins.call(this);
        render_1.drawTotalMoney.call(this);
    };
    ProductBuyTab.prototype.saleProduct = function (_a, index) {
        var name = _a.name, price = _a.price, quantity = _a.quantity;
        quantity -= 1;
        this.totalMoney -= price;
        this.products[index] = { name: name, price: price, quantity: quantity };
        render_1.drawProductList.call(this, this.$buy);
        render_1.drawTotalMoney.call(this);
    };
    return ProductBuyTab;
}());
exports["default"] = ProductBuyTab;
