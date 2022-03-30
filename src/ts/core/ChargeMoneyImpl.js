"use strict";
exports.__esModule = true;
var dom_1 = require("../util/dom");
var isValidMoney_1 = require("../validation/isValidMoney");
var ChargeMoneyImpl = /** @class */ (function () {
    function ChargeMoneyImpl(coins) {
        var _this = this;
        this.coins = coins;
        window.addEventListener('load', function () {
            (0, dom_1.$)('#charge-money-form').addEventListener('submit', _this.handleChargeMoney.bind(_this));
        });
    }
    ChargeMoneyImpl.prototype.handleChargeMoney = function (e) {
        e.preventDefault();
        var inputMoney = Number((0, dom_1.$)('#charge-money-input').value);
        if ((0, isValidMoney_1.isValidMoney)(inputMoney, this.coins)) {
            var coinList = this.generateRandomCoins(inputMoney);
            this.chargeMoney(coinList);
            this.drawCoins();
        }
    };
    ChargeMoneyImpl.prototype.chargeMoney = function (coinList) {
        this.coins.forEach(function (coin, index) { return (coin.count += coinList[index]); });
    };
    ChargeMoneyImpl.prototype.generateRandomCoins = function (inputMoney) {
        var coins = this.coins.map(function (_a) {
            var amount = _a.amount;
            return amount;
        });
        var coinList = [0, 0, 0, 0];
        while (inputMoney > 0) {
            var pickLength = coins.filter(function (coin) { return inputMoney >= coin; });
            var coinIndex = Math.floor(Math.random() * pickLength.length);
            coinList[coinIndex] += 1;
            inputMoney -= coins[coinIndex];
        }
        return coinList;
    };
    ChargeMoneyImpl.prototype.drawCoins = function () {
        this.coins.forEach(function (_a) {
            var amount = _a.amount, count = _a.count;
            (0, dom_1.$)("#coin-".concat(amount, "-count")).innerText = "".concat(count, "\uAC1C");
        });
    };
    return ChargeMoneyImpl;
}());
exports["default"] = ChargeMoneyImpl;
