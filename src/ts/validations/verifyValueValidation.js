"use strict";
exports.__esModule = true;
var constants_1 = require("../constants");
var snackbar_1 = require("../utils/snackbar");
var VerifyValueValidation = /** @class */ (function () {
    function VerifyValueValidation(products, coins) {
        this.products = products;
        this.coins = coins;
    }
    // 각각의 전체 검증
    VerifyValueValidation.prototype.verifyProductInfo = function (_a, index) {
        var name = _a.name, price = _a.price, quantity = _a.quantity;
        if (!this.isValidProductNameRange(name)) {
            (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.PRODUCT_NAME_LENGTH);
            return false;
        }
        if (this.isOverlapProductName(name, index)) {
            (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.PRODUCT_NAME_UNIQUE);
            return false;
        }
        if (!this.isValidProductPrice(price)) {
            (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.PRODUCT_PRICE);
            return false;
        }
        if (!this.isValidProductQuantity(quantity)) {
            (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.PRODUCT_QUANTITY);
            return false;
        }
        return true;
    };
    VerifyValueValidation.prototype.verifyChargeMoney = function (chargeMoney) {
        if (!this.isValidChargeMoney(chargeMoney)) {
            (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.CHARGE_MONEY);
            return false;
        }
        if (!this.isValidChargeMoneyOver(chargeMoney)) {
            (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.CHARGE_MONEY_MAX);
            return false;
        }
        return true;
    };
    VerifyValueValidation.prototype.verifyInputMoney = function (inputMoney) {
        if (!this.isValidInputMoneyRange(inputMoney)) {
            (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.INPUT_MONEY_RANGE);
            return false;
        }
        if (!this.isValidInputMoneyMod(inputMoney)) {
            (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.INPUT_MONEY_MOD);
            return false;
        }
        return true;
    };
    VerifyValueValidation.prototype.verifyLoginInfo = function (_a) {
        var email = _a.email, password = _a.password;
        if (!this.isValidEmail(email)) {
            (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.USER_EMAIL);
            return false;
        }
        if (!this.isValidPassWord(password)) {
            (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.USER_PASSWORD);
            return false;
        }
        return true;
    };
    VerifyValueValidation.prototype.verifySignUpInfo = function (_a) {
        var email = _a.email, name = _a.name, password = _a.password, passwordConfirm = _a.passwordConfirm;
        if (!this.isValidEmail(email)) {
            (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.USER_EMAIL);
            return false;
        }
        if (!this.isValidName(name)) {
            (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.USER_NAME);
            return false;
        }
        if (!this.isValidPassWord(password)) {
            (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.USER_PASSWORD);
            return false;
        }
        if (!this.isValidPassWordConfirm(password, passwordConfirm)) {
            (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.USER_PASSWORD_CONFIRM);
            return false;
        }
        return true;
    };
    // 상품 정보 검증
    VerifyValueValidation.prototype.isValidProductNameRange = function (name) {
        return (name.length >= constants_1.PRODUCT_RULES.MIN_NAME_LENGTH && name.length <= constants_1.PRODUCT_RULES.MAX_NAME_LENGTH);
    };
    VerifyValueValidation.prototype.isOverlapProductName = function (name, index) {
        return this.products.some(function (product, productIndex) { return productIndex !== index && product.name === name; });
    };
    VerifyValueValidation.prototype.isValidProductPrice = function (price) {
        return (price >= constants_1.PRODUCT_RULES.MIN_PRICE &&
            price <= constants_1.PRODUCT_RULES.MAX_PRICE &&
            price % constants_1.PRODUCT_RULES.PRICE_MOD_UNIT === 0);
    };
    VerifyValueValidation.prototype.isValidProductQuantity = function (quantity) {
        return quantity >= constants_1.PRODUCT_RULES.MIN_QUANTITY && quantity <= constants_1.PRODUCT_RULES.MAX_QUANTITY;
    };
    // 자판기 동전 충전 검증
    VerifyValueValidation.prototype.isValidChargeMoney = function (chargeMoney) {
        return chargeMoney >= constants_1.CHARGE_MONEY_RULES.MIN && chargeMoney % constants_1.CHARGE_MONEY_RULES.MOD_UNIT === 0;
    };
    VerifyValueValidation.prototype.isValidChargeMoneyOver = function (chargeMoney) {
        return this.totalAmount() + chargeMoney <= constants_1.CHARGE_MONEY_RULES.MAX;
    };
    // 상품 구매 금액 충전 검증
    VerifyValueValidation.prototype.isValidInputMoneyRange = function (inputMoney) {
        return inputMoney >= constants_1.INPUT_MONEY_RULES.MIN && inputMoney <= constants_1.INPUT_MONEY_RULES.MAX;
    };
    VerifyValueValidation.prototype.isValidInputMoneyMod = function (inputMoney) {
        return inputMoney % constants_1.INPUT_MONEY_RULES.MOD_UNIT === 0;
    };
    // 유저 정보 검증
    VerifyValueValidation.prototype.isValidName = function (name) {
        var nameReg = /^[가-힣]{2,6}$/;
        return nameReg.test(name);
    };
    VerifyValueValidation.prototype.isValidEmail = function (email) {
        var emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
        return emailReg.test(email);
    };
    VerifyValueValidation.prototype.isValidPassWord = function (password) {
        var passwordReg = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)-_=+]).{8,16}$/;
        return passwordReg.test(password);
    };
    VerifyValueValidation.prototype.isValidPassWordConfirm = function (password, passwordConfirm) {
        return password === passwordConfirm;
    };
    VerifyValueValidation.prototype.canBuyProduct = function (_a, totalMoney) {
        var price = _a.price, quantity = _a.quantity;
        if (quantity < 1) {
            return false;
        }
        if (totalMoney < price) {
            return false;
        }
        return true;
    };
    VerifyValueValidation.prototype.totalAmount = function () {
        return this.coins.reduce(function (acc, _a) {
            var amount = _a.amount, count = _a.count;
            return acc + amount * count;
        }, 0);
    };
    return VerifyValueValidation;
}());
exports["default"] = VerifyValueValidation;
