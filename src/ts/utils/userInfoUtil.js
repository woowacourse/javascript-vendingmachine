"use strict";
exports.__esModule = true;
exports.getUserInfo = exports.getSignUpInfo = exports.getLoginInfo = void 0;
var dom_1 = require("./dom");
var getLoginInfo = function () {
    var email = (0, dom_1.$)('#login-form__email-input').value;
    var password = (0, dom_1.$)('#login-form__password-input').value;
    return { email: email, password: password };
};
exports.getLoginInfo = getLoginInfo;
var getSignUpInfo = function () {
    var email = (0, dom_1.$)('#signup-form__email-input').value;
    var name = (0, dom_1.$)('#signup-form__name-input').value;
    var password = (0, dom_1.$)('#signup-form__password-input').value;
    var passwordConfirm = (0, dom_1.$)('#signup-form__password-check-input').value;
    return { email: email, name: name, password: password, passwordConfirm: passwordConfirm };
};
exports.getSignUpInfo = getSignUpInfo;
var getUserInfo = function () {
    var email = (0, dom_1.$)('#edit-profile-form__email-input').value;
    var name = (0, dom_1.$)('#edit-profile-form__name-input').value;
    var password = (0, dom_1.$)('#edit-profile-form__password-input').value;
    var passwordConfirm = (0, dom_1.$)('#edit-profile-form__password-check-input').value;
    return { email: email, name: name, password: password, passwordConfirm: passwordConfirm };
};
exports.getUserInfo = getUserInfo;
