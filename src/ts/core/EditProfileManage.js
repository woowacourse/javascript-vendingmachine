"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var dom_1 = require("../utils/dom");
var userInfoUtil_1 = require("../utils/userInfoUtil");
var loginUtil_1 = require("../utils/loginUtil");
var snackbar_1 = require("../utils/snackbar");
var constants_1 = require("../constants");
var VendingMachine_1 = require("../controllers/VendingMachine");
var fetchUtil_1 = require("../utils/fetchUtil");
var EditProfileManage = /** @class */ (function () {
    function EditProfileManage(verifyValue) {
        this.verifyValue = verifyValue;
        (0, dom_1.$)('.edit-profile-button').addEventListener('change', this.handleSelect.bind(this));
        (0, dom_1.$)('#edit-profile-confirm-button').addEventListener('click', this.handleEditProfile.bind(this));
    }
    EditProfileManage.prototype.handleSelect = function () {
        if ((0, dom_1.$)('.edit-profile-button').value === 'edit-profile') {
            VendingMachine_1["default"].prototype.handleEditProfile();
            var _a = JSON.parse(localStorage.getItem('accessToken')), email = _a.email, name_1 = _a.name;
            (0, dom_1.$)('#edit-profile-form__name-input').value = name_1;
            (0, dom_1.$)('#edit-profile-form__email-input').value = email;
            (0, dom_1.$)('.edit-profile-button').value = 'name-thumbnail';
        }
        else if ((0, dom_1.$)('.edit-profile-button').value === 'logout') {
            this.handleLogOut();
        }
    };
    EditProfileManage.prototype.handleLogOut = function () {
        (0, loginUtil_1.logOutedMode)();
        localStorage.clear();
    };
    EditProfileManage.prototype.handleEditProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo, name, password, passwordConfirm, accessToken, id, response, name_2, json, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInfo = (0, userInfoUtil_1.getUserInfo)();
                        name = userInfo.name, password = userInfo.password, passwordConfirm = userInfo.passwordConfirm;
                        accessToken = JSON.parse(localStorage.getItem('accessToken'));
                        id = accessToken.id;
                        if (!this.verifyValue.verifySignUpInfo(userInfo)) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, (0, fetchUtil_1.fetchUtil)("".concat(constants_1.editProfileUrl, "/").concat(id), 'PATCH', {
                                name: name,
                                password: password,
                                passwordConfirm: passwordConfirm
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.json()];
                    case 3:
                        name_2 = (_a.sent()).name;
                        accessToken.name = name_2;
                        localStorage.setItem('accessToken', JSON.stringify(accessToken));
                        (0, userInfoUtil_1.resetUserInfo)();
                        (0, loginUtil_1.loginnedMode)();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, response.json()];
                    case 5:
                        json = _a.sent();
                        (0, snackbar_1.showSnackbar)(json);
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        (0, snackbar_1.showSnackbar)(error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return EditProfileManage;
}());
exports["default"] = EditProfileManage;
