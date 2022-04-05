"use strict";
exports.__esModule = true;
var dom_1 = require("../utils/dom");
var userInfoUtil_1 = require("../utils/userInfoUtil");
var SignUpTab = /** @class */ (function () {
    function SignUpTab(verifyValue) {
        this.verifyValue = verifyValue;
        (0, dom_1.$)('#sign-up-confirm-button').addEventListener('click', this.handleSignUp.bind(this));
    }
    SignUpTab.prototype.handleSignUp = function (e) {
        var signUpInfo = (0, userInfoUtil_1.getSignUpInfo)();
        if (!this.verifyValue.verifySignUpInfo(signUpInfo)) {
            return;
        }
        // 정보 로컬스토리지로
        // route 수정
        // index.js로
    };
    return SignUpTab;
}());
exports["default"] = SignUpTab;
