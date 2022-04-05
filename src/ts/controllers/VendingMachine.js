"use strict";
exports.__esModule = true;
var ProductManageTab_1 = require("../core/ProductManageTab");
var ChargeMoneyTab_1 = require("../core/ChargeMoneyTab");
var dom_1 = require("../utils/dom");
var index_1 = require("../constants/index");
var ProductBuyTab_1 = require("../core/ProductBuyTab");
var verifyValueValidation_1 = require("../validations/verifyValueValidation");
var VendingMachine = /** @class */ (function () {
    function VendingMachine() {
        this.products = [];
        this.coins = [
            { amount: index_1.COINS.VAULE_10, count: 0 },
            { amount: index_1.COINS.VAULE_50, count: 0 },
            { amount: index_1.COINS.VAULE_100, count: 0 },
            { amount: index_1.COINS.VAULE_500, count: 0 },
        ];
        this.verifyValue = new verifyValueValidation_1["default"](this.products, this.coins);
        new ProductManageTab_1["default"](this.products, this.verifyValue);
        new ChargeMoneyTab_1["default"](this.coins, this.verifyValue);
        new ProductBuyTab_1["default"](this.products, this.coins, this.verifyValue);
        (0, dom_1.$)('#tab').addEventListener('click', this.handleClickTabButtons.bind(this));
        window.addEventListener('popstate', this.handlePopstate.bind(this));
    }
    VendingMachine.prototype.handleClickTabButtons = function (e) {
        if (e.target === e.currentTarget) {
            return;
        }
        var tabName = e.target.dataset.name;
        history.pushState({}, '', window.location.pathname + "#".concat(tabName));
        this.switchTab(tabName);
    };
    VendingMachine.prototype.handlePopstate = function () {
        if (window.location.hash) {
            this.switchTab(window.location.hash.slice(1));
        }
    };
    VendingMachine.prototype.switchTab = function (tabName) {
        (0, dom_1.$)('#app').classList.remove('manage', 'charge', 'buy');
        (0, dom_1.$)('#app').classList.add(tabName);
    };
    return VendingMachine;
}());
exports["default"] = VendingMachine;
