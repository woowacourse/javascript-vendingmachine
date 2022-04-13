"use strict";
exports.__esModule = true;
var ProductManageManage_1 = require("../core/ProductManageManage");
var ChargeMoneyManage_1 = require("../core/ChargeMoneyManage");
var ProductBuyManage_1 = require("../core/ProductBuyManage");
var dom_1 = require("../utils/dom");
var index_1 = require("../constants/index");
var verifyValueValidation_1 = require("../validations/verifyValueValidation");
var LoginManage_1 = require("../core/LoginManage");
var SignUpManage_1 = require("../core/SignUpManage");
var EditProfileManage_1 = require("../core/EditProfileManage");
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
        new ProductManageManage_1["default"](this.products, this.verifyValue);
        new ChargeMoneyManage_1["default"](this.coins, this.verifyValue);
        new ProductBuyManage_1["default"](this.products, this.coins, this.verifyValue);
        new LoginManage_1["default"](this.verifyValue);
        new SignUpManage_1["default"](this.verifyValue);
        new EditProfileManage_1["default"](this.verifyValue);
        (0, dom_1.$)('#tab').addEventListener('click', this.handleClickTabButtons.bind(this));
        (0, dom_1.$)('.login-button-container').addEventListener('click', this.handleLoginInfo.bind(this));
        (0, dom_1.$)('#link').addEventListener('click', this.handleSignUp.bind(this));
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
    VendingMachine.prototype.handleSignUp = function () {
        history.pushState({}, '', window.location.pathname + "#signup");
        this.switchTab('signup');
    };
    VendingMachine.prototype.handleLoginInfo = function (e) {
        if (e.target.classList.contains('login-button')) {
            history.pushState({}, '', window.location.pathname + "#login");
            this.switchTab('login');
        }
    };
    VendingMachine.prototype.handleEditProfile = function () {
        history.pushState({}, '', window.location.pathname + "#edit-profile");
        this.switchTab('edit-profile');
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
        var accessToken = localStorage.getItem('accessToken');
        var hash = window.location.hash.slice(1);
        if (!accessToken) {
            if (hash !== 'buy' && hash !== 'login') {
                return;
            }
        }
        if (accessToken && hash === 'signup') {
            return;
        }
        this.switchTab(hash);
    };
    VendingMachine.prototype.switchTab = function (tabName) {
        (0, dom_1.$)('#app').className = 'app';
        (0, dom_1.$)('#header').className = 'app__header';
        (0, dom_1.$)('#app').classList.add(tabName);
        (0, dom_1.$)('#header').classList.add(tabName);
    };
    return VendingMachine;
}());
exports["default"] = VendingMachine;
