"use strict";
exports.__esModule = true;
exports.isValidProductInfo = void 0;
var constants_1 = require("../constants");
var isValidProductInfo = function (_a, index, products) {
    var name = _a.name, price = _a.price, quantity = _a.quantity;
    if (name.length < constants_1.PRODUCT_RULES.MIN_NAME_LENGTH ||
        name.length > constants_1.PRODUCT_RULES.MAX_NAME_LENGTH) {
        alert(constants_1.ALERT_MESSAGE.PRODUCT_NAME_LENGTH);
        return false;
    }
    if (products.some(function (product, productIndex) {
        return productIndex !== index && product.name === name;
    })) {
        alert(constants_1.ALERT_MESSAGE.PRODUCT_NAME_UNIQUE);
        return false;
    }
    if (price < constants_1.PRODUCT_RULES.MIN_PRICE ||
        price > constants_1.PRODUCT_RULES.MAX_PRICE ||
        price % constants_1.PRODUCT_RULES.PRICE_MOD_UNIT !== 0) {
        alert(constants_1.ALERT_MESSAGE.PRODUCT_PRICE);
        return false;
    }
    if (quantity < constants_1.PRODUCT_RULES.MIN_QUANTITY ||
        quantity > constants_1.PRODUCT_RULES.MAX_QUANTITY) {
        alert(constants_1.ALERT_MESSAGE.PRODUCT_QUANTITY);
        return false;
    }
    return true;
};
exports.isValidProductInfo = isValidProductInfo;
