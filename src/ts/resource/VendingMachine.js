"use strict";
exports.__esModule = true;
var ProductManageImpl_1 = require("../tab/ProductManageImpl");
var ChargeMoneyImpl_1 = require("../tab/ChargeMoneyImpl");
var VendingMachine = /** @class */ (function () {
    function VendingMachine() {
        this.products = [];
        this.coins = [{ amount: 10, count: 0 }, { amount: 50, count: 0 }, { amount: 100, count: 0 }, { amount: 500, count: 0 }];
        new ProductManageImpl_1["default"](this.products);
        new ChargeMoneyImpl_1["default"](this.coins);
    }
    return VendingMachine;
}());
exports["default"] = VendingMachine;
