"use strict";
exports.__esModule = true;
exports.totalAmount = exports.isValidMoney = void 0;
var constants_1 = require("../constants");
var isValidMoney = function (inputMoney, coins) {
    if (inputMoney < constants_1.INPUT_MONEY_RULES.MIN ||
        inputMoney % constants_1.INPUT_MONEY_RULES.MOD_UNIT !== 0) {
        alert(constants_1.ALERT_MESSAGE.INPUT_MONEY);
        return false;
    }
    if ((0, exports.totalAmount)(coins) + inputMoney > constants_1.INPUT_MONEY_RULES.MAX) {
        alert(constants_1.ALERT_MESSAGE.INPUT_MONEY_MAX);
        return false;
    }
    return true;
};
exports.isValidMoney = isValidMoney;
var totalAmount = function (coins) {
    return coins.reduce(function (acc, _a) {
        var amount = _a.amount, count = _a.count;
        return acc + amount * count;
    }, 0);
};
exports.totalAmount = totalAmount;
