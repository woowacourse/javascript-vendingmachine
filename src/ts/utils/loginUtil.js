"use strict";
exports.__esModule = true;
exports.logOutedMode = exports.loginnedMode = void 0;
var dom_1 = require("./dom");
var loginnedMode = function () {
    (0, dom_1.$)('.login-button').classList.add('loginned');
    (0, dom_1.$)('.edit-profile-button').classList.add('loginned');
    (0, dom_1.$)('.tab').classList.add('loginned');
    var name = JSON.parse(localStorage.getItem('accessToken')).name;
    (0, dom_1.$)('#name-thumbnail').textContent = name[0];
    (0, dom_1.$)('.edit-profile-button').value = 'name-thumbnail';
    location.href = 'http://localhost:9000/#manage';
};
exports.loginnedMode = loginnedMode;
var logOutedMode = function () {
    (0, dom_1.$)('.login-button').classList.remove('loginned');
    (0, dom_1.$)('.edit-profile-button').classList.remove('loginned');
    (0, dom_1.$)('.tab').classList.remove('loginned');
    location.href = 'http://localhost:9000/#buy';
};
exports.logOutedMode = logOutedMode;
