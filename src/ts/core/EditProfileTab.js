"use strict";
exports.__esModule = true;
var dom_1 = require("../utils/dom");
var userInfoUtil_1 = require("../utils/userInfoUtil");
var EditProfileTab = /** @class */ (function () {
    function EditProfileTab(verifyValue) {
        this.verifyValue = verifyValue;
        (0, dom_1.$)('#edit-profile-confirm-button').addEventListener('click', this.handleEditProfile.bind(this));
    }
    EditProfileTab.prototype.handleEditProfile = function (e) {
        var userInfo = (0, userInfoUtil_1.getUserInfo)();
        if (!this.verifyValue.verifySignUpInfo(userInfo)) {
            return;
        }
        // 정보 로컬스토리지로
        // route 수정
        // index.js로
    };
    return EditProfileTab;
}());
exports["default"] = EditProfileTab;
