"use strict";
exports.__esModule = true;
var dom_1 = require("../utils/dom");
var EditProfileTab = /** @class */ (function () {
    function EditProfileTab() {
        (0, dom_1.$)('#edit-profile-confirm-button').addEventListener('click', this.handleEditProfile);
    }
    EditProfileTab.prototype.handleEditProfile = function (e) {
        e.preventDefault();
        console.log('EditProfile');
        // 값 검증 -> 성공할 시,
        // 정보 로컬스토리지로
        // route 수정
        // index.js로
    };
    return EditProfileTab;
}());
exports["default"] = EditProfileTab;
