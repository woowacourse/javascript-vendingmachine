"use strict";
exports.__esModule = true;
var ProductManageTab_1 = require("../core/ProductManageTab");
var ChargeMoneyTab_1 = require("../core/ChargeMoneyTab");
var dom_1 = require("../utils/dom");
var index_1 = require("../constants/index");
var ProductBuyTab_1 = require("../core/ProductBuyTab");
var verifyValueValidation_1 = require("../validations/verifyValueValidation");
var LoginTab_1 = require("../core/LoginTab");
var SignUpTab_1 = require("../core/SignUpTab");
var EditProfileTab_1 = require("../core/EditProfileTab");
var loginUtil_1 = require("../utils/loginUtil");
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
        new LoginTab_1["default"](this.verifyValue);
        new SignUpTab_1["default"](this.verifyValue);
        new EditProfileTab_1["default"](this.verifyValue);
        (0, dom_1.$)('#tab').addEventListener('click', this.handleClickTabButtons.bind(this));
        (0, dom_1.$)('.login-button-container').addEventListener('click', this.handleLoginInfoManage.bind(this));
        window.addEventListener('popstate', this.handlePopstate.bind(this));
        this.initWebPage();
    }
    VendingMachine.prototype.initWebPage = function () {
        if (localStorage.getItem('accessToken')) {
            (0, loginUtil_1.loginnedMode)();
        }
        else {
            (0, loginUtil_1.logOutedMode)();
        }
    };
    VendingMachine.prototype.handleLoginInfoManage = function (e) {
        if (e.target.classList.contains('login-button')) {
            history.pushState({}, '', window.location.pathname + "#login");
            this.switchTab('login');
        }
    };
    VendingMachine.prototype.handleClickTabButtons = function (e) {
        if (e.target === e.currentTarget) {
            return;
        }
        var tabName = e.target.dataset.name;
        if (!localStorage.getItem('accessToken') && tabName !== 'buy') {
            return;
        }
        history.pushState({}, '', window.location.pathname + "#".concat(tabName));
        this.switchTab(tabName);
    };
    VendingMachine.prototype.handlePopstate = function () {
        if (!window.location.hash) {
            return;
        }
        var hash = window.location.hash.slice(1);
        if (!localStorage.getItem('accessToken')) {
            if (hash !== 'buy' && hash !== 'login') {
                return;
            }
        }
        if (localStorage.getItem('accessToken') && hash === 'signup') {
            return;
        }
        this.switchTab(hash);
    };
    VendingMachine.prototype.switchTab = function (tabName) {
        (0, dom_1.$)('#app').classList.remove('manage', 'charge', 'buy', 'login', 'signup', 'edit-profile');
        (0, dom_1.$)('#header').classList.remove('manage', 'charge', 'buy', 'login', 'signup', 'edit-profile');
        (0, dom_1.$)('#app').classList.add(tabName);
        (0, dom_1.$)('#header').classList.add(tabName);
    };
    return VendingMachine;
}());
exports["default"] = VendingMachine;
