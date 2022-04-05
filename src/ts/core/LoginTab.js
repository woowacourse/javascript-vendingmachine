"use strict";
exports.__esModule = true;
var dom_1 = require("../utils/dom");
var userInfoUtil_1 = require("../utils/userInfoUtil");
var LoginTab = /** @class */ (function () {
    function LoginTab(verifyValue) {
        this.verifyValue = verifyValue;
        this.$login = (0, dom_1.$)('.login');
        (0, dom_1.$)('#link', this.$login).addEventListener('click', this.handleLink);
        (0, dom_1.$)('#login-confirm-button', this.$login).addEventListener('click', this.handleLogin.bind(this));
    }
    LoginTab.prototype.handleLogin = function (e) {
        var loginInfo = (0, userInfoUtil_1.getLoginInfo)();
        if (!this.verifyValue.verifyLoginInfo(loginInfo)) {
            return;
        }
        // 정보 로컬스토리지로
        // login된 걸로 상태변경
        // route 수정
        // index.js로
    };
    LoginTab.prototype.handleLink = function () {
        history.pushState({}, '', window.location.pathname + "#sign-up");
        (0, dom_1.$)('#app').classList.remove('manage', 'charge', 'buy', 'login', 'sign-up', 'edit-profile');
        (0, dom_1.$)('#header').classList.remove('manage', 'charge', 'buy', 'login', 'sign-up', 'edit-profile');
        (0, dom_1.$)('#app').classList.add('sign-up');
        (0, dom_1.$)('#header').classList.add('sign-up');
    };
    return LoginTab;
}());
exports["default"] = LoginTab;
