"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var fetchUtil_1 = require("../utils/fetchUtil");
var SignUpManage = /** @class */ (function () {
    function SignUpManage(verifyValue) {
        this.verifyValue = verifyValue;
        (0, dom_1.$)('#signup-confirm-button').addEventListener('click', this.handleSignUp.bind(this));
    }
    SignUpManage.prototype.handleSignUp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var signUpInfo, email, name, password, passwordConfirm, response, _a, accessToken, user, json, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        signUpInfo = (0, userInfoUtil_1.getSignUpInfo)();
                        email = signUpInfo.email, name = signUpInfo.name, password = signUpInfo.password, passwordConfirm = signUpInfo.passwordConfirm;
                        if (!this.verifyValue.verifySignUpInfo(signUpInfo)) {
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, (0, fetchUtil_1.fetchUtil)(constants_1.signUpUrl, 'POST', {
                                email: email,
                                name: name,
                                password: password,
                                passwordConfirm: passwordConfirm
                            })];
                    case 2:
                        response = _b.sent();
                        if (!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.json()];
                    case 3:
                        _a = _b.sent(), accessToken = _a.accessToken, user = _a.user;
                        localStorage.setItem('accessToken', JSON.stringify(__assign(__assign({}, user), { accessToken: accessToken })));
                        (0, userInfoUtil_1.resetSignUpInfo)();
                        (0, loginUtil_1.loginnedMode)();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, response.json()];
                    case 5:
                        json = _b.sent();
                        (0, snackbar_1.showSnackbar)(json);
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _b.sent();
                        (0, snackbar_1.showSnackbar)(error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return SignUpManage;
}());
exports["default"] = SignUpManage;
