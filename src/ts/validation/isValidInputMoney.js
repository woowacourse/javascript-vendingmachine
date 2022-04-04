"use strict";
exports.__esModule = true;
exports.isValidInputMoney = void 0;
var constants_1 = require("../constants");
var isValidInputMoney = function (inputMoney) {
    if (inputMoney < constants_1.INPUT_MONEY_RULES.MIN ||
        inputMoney > constants_1.INPUT_MONEY_RULES.MAX) {
        alert(constants_1.ALERT_MESSAGE.INPUT_MONEY_RANGE);
        return false;
    }
    if (inputMoney % constants_1.INPUT_MONEY_RULES.MOD_UNIT !== 0) {
        alert(constants_1.ALERT_MESSAGE.INPUT_MONEY_MOD);
        return false;
    }
    return true;
};
exports.isValidInputMoney = isValidInputMoney;
