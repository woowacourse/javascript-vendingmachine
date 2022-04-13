"use strict";
exports.__esModule = true;
var constants_1 = require("../constants");
var snackbar_1 = require("../utils/snackbar");
var VerifyValueValidation = /** @class */ (function () {
    function VerifyValueValidation(products, coins) {
        if (products === void 0) { products = []; }
        if (coins === void 0) { coins = []; }
        this.validator = function (conditions) {
            var isValid = true;
            conditions.forEach(function (_a) {
                var checker = _a.checker, errorMessage = _a.errorMessage;
                if (!checker()) {
                    (0, snackbar_1.showSnackbar)(errorMessage);
                    isValid = false;
                }
            });
            return isValid;
        };
        this.products = products;
        this.coins = coins;
    }
    // 각각의 전체 검증
    VerifyValueValidation.prototype.verifyProductInfo = function (_a, index) {
        var _this = this;
        var name = _a.name, price = _a.price, quantity = _a.quantity;
        return this.validator([
            {
                checker: function () { return _this.isValidProductNameRange(name); },
                errorMessage: constants_1.ALERT_MESSAGE.PRODUCT_NAME_LENGTH
            },
            {
                checker: function () { return _this.isUniqueProductName(name, index); },
                errorMessage: constants_1.ALERT_MESSAGE.PRODUCT_NAME_UNIQUE
            },
            {
                checker: function () { return _this.isValidProductPrice(price); },
                errorMessage: constants_1.ALERT_MESSAGE.PRODUCT_PRICE
            },
            {
                checker: function () { return _this.isValidProductQuantity(quantity); },
                errorMessage: constants_1.ALERT_MESSAGE.PRODUCT_QUANTITY
            },
        ]);
    };
    VerifyValueValidation.prototype.verifyChargeMoney = function (chargeMoney) {
        var _this = this;
        return this.validator([
            {
                checker: function () { return _this.isValidChargeMoney(chargeMoney); },
                errorMessage: constants_1.ALERT_MESSAGE.CHARGE_MONEY
            },
            {
                checker: function () { return _this.isValidChargeMoneyOver(chargeMoney); },
                errorMessage: constants_1.ALERT_MESSAGE.CHARGE_MONEY_MAX
            },
        ]);
    };
    VerifyValueValidation.prototype.verifyInputMoney = function (inputMoney) {
        var _this = this;
        return this.validator([
            {
                checker: function () { return _this.isValidInputMoneyRange(inputMoney); },
                errorMessage: constants_1.ALERT_MESSAGE.INPUT_MONEY_RANGE
            },
            {
                checker: function () { return _this.isValidInputMoneyMod(inputMoney); },
                errorMessage: constants_1.ALERT_MESSAGE.INPUT_MONEY_MOD
            },
        ]);
    };
    VerifyValueValidation.prototype.verifyLoginInfo = function (_a) {
        var _this = this;
        var email = _a.email, password = _a.password;
        return this.validator([
            {
                checker: function () { return _this.isValidEmail(email); },
                errorMessage: constants_1.ALERT_MESSAGE.LOGIN
            },
            {
                checker: function () { return _this.isValidPassWord(password); },
                errorMessage: constants_1.ALERT_MESSAGE.LOGIN
            },
        ]);
    };
    VerifyValueValidation.prototype.verifySignUpInfo = function (_a) {
        var _this = this;
        var email = _a.email, name = _a.name, password = _a.password, passwordConfirm = _a.passwordConfirm;
        return this.validator([
            {
                checker: function () { return _this.isValidEmail(email); },
                errorMessage: constants_1.ALERT_MESSAGE.USER_EMAIL
            },
            {
                checker: function () { return _this.isValidName(name); },
                errorMessage: constants_1.ALERT_MESSAGE.USER_NAME
            },
            {
                checker: function () { return _this.isValidPassWord(password); },
                errorMessage: constants_1.ALERT_MESSAGE.USER_PASSWORD
            },
            {
                checker: function () { return _this.isValidPassWordConfirm(password, passwordConfirm); },
                errorMessage: constants_1.ALERT_MESSAGE.USER_PASSWORD_CONFIRM
            },
        ]);
    };
    // 상품 정보 검증
    VerifyValueValidation.prototype.isValidProductNameRange = function (name) {
        return (name.length >= constants_1.PRODUCT_RULES.MIN_NAME_LENGTH && name.length <= constants_1.PRODUCT_RULES.MAX_NAME_LENGTH);
    };
    VerifyValueValidation.prototype.isUniqueProductName = function (name, index) {
        return !this.products.some(function (product, productIndex) { return productIndex !== index && product.name === name; });
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
