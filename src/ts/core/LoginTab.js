"use strict";
exports.__esModule = true;
var dom_1 = require("../utils/dom");
var LoginTab = /** @class */ (function () {
    function LoginTab() {
        this.$login = (0, dom_1.$)('.login');
        (0, dom_1.$)('#link', this.$login).addEventListener('click', this.handleLink);
        (0, dom_1.$)('#login-confirm-button', this.$login).addEventListener('click', this.handleLogin);
    }
    LoginTab.prototype.handleLogin = function (e) {
        e.preventDefault();
        console.log('Login');
        // 값 검증 -> 성공할 시,
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
