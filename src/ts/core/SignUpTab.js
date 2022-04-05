"use strict";
exports.__esModule = true;
var dom_1 = require("../utils/dom");
var SignUpTab = /** @class */ (function () {
    function SignUpTab() {
        (0, dom_1.$)('#sign-up-confirm-button').addEventListener('click', this.handleSignUp);
    }
    SignUpTab.prototype.handleSignUp = function (e) {
        console.log('SignUp');
        // 값 검증 -> 성공할 시,
        // 정보 로컬스토리지로
        // route 수정
        // index.js로
    };
    return SignUpTab;
}());
exports["default"] = SignUpTab;
