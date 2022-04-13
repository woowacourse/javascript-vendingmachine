"use strict";
exports.__esModule = true;
var dom_1 = require("../utils/dom");
var render_1 = require("../views/render");
var productUtil_1 = require("../utils/productUtil");
var ChargeMoneyManage = /** @class */ (function () {
    function ChargeMoneyManage(coins, verifyValue) {
        var _this = this;
        this.verifyValue = verifyValue;
        this.coins = coins;
        window.addEventListener('load', function () {
            (0, dom_1.$)('#tab__charge-button').addEventListener('click', render_1.renderCoins.bind(_this));
            (0, dom_1.$)('#charge-money-form').addEventListener('submit', _this.handleChargeMoney.bind(_this));
        });
    }
    ChargeMoneyManage.prototype.handleChargeMoney = function (e) {
        e.preventDefault();
        var inputMoney = Number((0, dom_1.$)('#charge-money-input').value);
        if (this.verifyValue.verifyChargeMoney(inputMoney)) {
            var coinList = productUtil_1.generateRandomCoins.call(this, inputMoney);
            this.chargeMoney(coinList);
            render_1.renderCoins.call(this);
            (0, dom_1.$)('#charge-money-input').value = '';
        }
    };
    ChargeMoneyManage.prototype.chargeMoney = function (coinList) {
        this.coins.forEach(function (coin, index) { return (coin.count += coinList[index]); });
    };
    return ChargeMoneyManage;
}());
exports["default"] = ChargeMoneyManage;
