"use strict";
exports.__esModule = true;
exports.showSnackbar = void 0;
var dom_1 = require("./dom");
var showSnackbar = function (message) {
    if (message === void 0) { message = '이곳에 메시지를 입력해주세요'; }
    var $snackbar = (0, dom_1.$)('#snackbar');
    $snackbar.textContent = message;
    $snackbar.classList.toggle('show');
    setTimeout(function () {
        $snackbar.classList.toggle('show');
    }, 3000);
};
exports.showSnackbar = showSnackbar;
