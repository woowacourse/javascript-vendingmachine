/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/constants/index.js":
/*!***********************************!*\
  !*** ./src/ts/constants/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {



exports.__esModule = true;
exports.baseUrl = exports.ALERT_MESSAGE = exports.COINS = exports.INPUT_MONEY_RULES = exports.CHARGE_MONEY_RULES = exports.PRODUCT_RULES = void 0;
exports.PRODUCT_RULES = {
  MAX_NAME_LENGTH: 10,
  MIN_NAME_LENGTH: 1,
  MAX_PRICE: 10000,
  MIN_PRICE: 100,
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 20,
  PRICE_MOD_UNIT: 10
};
exports.CHARGE_MONEY_RULES = {
  MIN: 1000,
  MAX: 100000,
  MOD_UNIT: 10
};
exports.INPUT_MONEY_RULES = {
  MIN: 1000,
  MAX: 10000,
  MOD_UNIT: 10
};
exports.COINS = {
  VAULE_10: 10,
  VAULE_50: 50,
  VAULE_100: 100,
  VAULE_500: 500
};
exports.ALERT_MESSAGE = {
  PRODUCT_NAME_LENGTH: "\uC0C1\uD488\uBA85\uC740 ".concat(exports.PRODUCT_RULES.MIN_NAME_LENGTH, "\uAE00\uC790\uBD80\uD130 ").concat(exports.PRODUCT_RULES.MAX_NAME_LENGTH, "\uAE00\uC790\uAE4C\uC9C0\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4."),
  PRODUCT_NAME_UNIQUE: "\uC0C1\uD488\uBA85\uC740 \uC911\uBCF5\uB418\uC9C0 \uC54A\uC544\uC57C\uD569\uB2C8\uB2E4.",
  PRODUCT_PRICE: "\uC0C1\uD488\uAC00\uACA9\uC740 ".concat(exports.PRODUCT_RULES.PRICE_MOD_UNIT, "\uC73C\uB85C \uB098\uB204\uC5B4 \uB5A8\uC5B4\uC838\uC57C\uD558\uBA70, ").concat(exports.PRODUCT_RULES.MIN_PRICE, "~").concat(exports.PRODUCT_RULES.MAX_PRICE, "\uAE4C\uC9C0\uC758 \uAC12\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4."),
  PRODUCT_QUANTITY: "\uC0C1\uD488\uC218\uB7C9\uC740 ".concat(exports.PRODUCT_RULES.MIN_QUANTITY, "~").concat(exports.PRODUCT_RULES.MAX_QUANTITY, "\uC758 \uAC12\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4."),
  CHARGE_MONEY: "\uD22C\uC785\uAE08\uC561\uC740 ".concat(exports.CHARGE_MONEY_RULES.MOD_UNIT, "\uC73C\uB85C \uB098\uB204\uC5B4 \uB5A8\uC5B4\uC838\uC57C\uD558\uBA70, \uCD5C\uC18C ").concat(exports.CHARGE_MONEY_RULES.MIN, " \uAC12 \uC774\uC0C1\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4."),
  CHARGE_MONEY_MAX: "\uD22C\uC785\uAE08\uC561\uACFC \uC790\uD310\uAE30 \uBCF4\uC720\uAE08\uC561\uC758 \uD569\uC774 ".concat(exports.CHARGE_MONEY_RULES.MAX, "\uB97C \uCD08\uACFC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."),
  INPUT_MONEY_RANGE: "\uD22C\uC785\uAE08\uC561\uC740 ".concat(exports.INPUT_MONEY_RULES.MIN, "~").concat(exports.INPUT_MONEY_RULES.MAX, " \uBC94\uC704\uC5EC\uC57C \uD569\uB2C8\uB2E4."),
  INPUT_MONEY_MOD: "\uD22C\uC785\uAE08\uC561\uC740 ".concat(exports.INPUT_MONEY_RULES.MOD_UNIT, "\uC73C\uB85C \uB098\uB220\uC838\uC57C \uD569\uB2C8\uB2E4."),
  USER_NAME: "\uC774\uB984\uC740 2~6\uAE00\uC790 \uD55C\uAE00\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4.",
  USER_EMAIL: "\uC774\uBA54\uC77C\uC740 woowa123@woowa.com \uD615\uC2DD\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4.",
  USER_PASSWORD: "\uBE44\uBC00\uBC88\uD638\uB294 8~16\uAE00\uC790 \uC601\uB300\uBB38\uC790\uB098 \uC18C\uBB38\uC790, \uD2B9\uC218\uBB38\uC790, \uC22B\uC790\uB97C \uD3EC\uD568\uD574\uC57C\uD569\uB2C8\uB2E4.",
  USER_PASSWORD_CONFIRM: "\uBE44\uBC00\uBC88\uD638\uAC00 \uB3D9\uC77C\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."
};
exports.baseUrl = 'https://e217-175-123-111-78.ngrok.io';

/***/ }),

/***/ "./src/ts/controllers/VendingMachine.js":
/*!**********************************************!*\
  !*** ./src/ts/controllers/VendingMachine.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;

var ProductManageTab_1 = __webpack_require__(/*! ../core/ProductManageTab */ "./src/ts/core/ProductManageTab.js");

var ChargeMoneyTab_1 = __webpack_require__(/*! ../core/ChargeMoneyTab */ "./src/ts/core/ChargeMoneyTab.js");

var dom_1 = __webpack_require__(/*! ../utils/dom */ "./src/ts/utils/dom.js");

var index_1 = __webpack_require__(/*! ../constants/index */ "./src/ts/constants/index.js");

var ProductBuyTab_1 = __webpack_require__(/*! ../core/ProductBuyTab */ "./src/ts/core/ProductBuyTab.js");

var verifyValueValidation_1 = __webpack_require__(/*! ../validations/verifyValueValidation */ "./src/ts/validations/verifyValueValidation.js");

var LoginTab_1 = __webpack_require__(/*! ../core/LoginTab */ "./src/ts/core/LoginTab.js");

var SignUpTab_1 = __webpack_require__(/*! ../core/SignUpTab */ "./src/ts/core/SignUpTab.js");

var EditProfileTab_1 = __webpack_require__(/*! ../core/EditProfileTab */ "./src/ts/core/EditProfileTab.js");

var loginUtil_1 = __webpack_require__(/*! ../utils/loginUtil */ "./src/ts/utils/loginUtil.js");

var VendingMachine =
/** @class */
function () {
  function VendingMachine() {
    this.products = [];
    this.coins = [{
      amount: index_1.COINS.VAULE_10,
      count: 0
    }, {
      amount: index_1.COINS.VAULE_50,
      count: 0
    }, {
      amount: index_1.COINS.VAULE_100,
      count: 0
    }, {
      amount: index_1.COINS.VAULE_500,
      count: 0
    }];
    this.verifyValue = new verifyValueValidation_1["default"](this.products, this.coins);
    new ProductManageTab_1["default"](this.products, this.verifyValue);
    new ChargeMoneyTab_1["default"](this.coins, this.verifyValue);
    new ProductBuyTab_1["default"](this.products, this.coins, this.verifyValue);
    new LoginTab_1["default"](this.verifyValue);
    new SignUpTab_1["default"](this.verifyValue);
    new EditProfileTab_1["default"](this.verifyValue);
    (0, dom_1.$)('#tab').addEventListener('click', this.handleClickTabButtons.bind(this));
    (0, dom_1.$)('.login-button-container').addEventListener('click', this.handleLoginInfoManage.bind(this));
    window.addEventListener('popstate', this.handlePopstate.bind(this));
    this.initWebPage();
  }

  VendingMachine.prototype.initWebPage = function () {
    if (localStorage.getItem('accessToken')) {
      (0, loginUtil_1.loginnedMode)();
    } else {
      (0, loginUtil_1.logOutedMode)();
    }
  };

  VendingMachine.prototype.handleLoginInfoManage = function (e) {
    if (e.target.classList.contains('login-button')) {
      history.pushState({}, '', window.location.pathname + "#login");
      this.switchTab('login');
    }
  };

  VendingMachine.prototype.handleClickTabButtons = function (e) {
    if (e.target === e.currentTarget) {
      return;
    }

    var tabName = e.target.dataset.name;

    if (!localStorage.getItem('accessToken') && tabName !== 'buy') {
      return;
    }

    history.pushState({}, '', window.location.pathname + "#".concat(tabName));
    this.switchTab(tabName);
  };

  VendingMachine.prototype.handlePopstate = function () {
    if (!window.location.hash) {
      return;
    }

    var hash = window.location.hash.slice(1);

    if (!localStorage.getItem('accessToken')) {
      if (hash !== 'buy' && hash !== 'login') {
        return;
      }
    }

    if (localStorage.getItem('accessToken') && hash === 'signup') {
      return;
    }

    this.switchTab(hash);
  };

  VendingMachine.prototype.switchTab = function (tabName) {
    (0, dom_1.$)('#app').classList.remove('manage', 'charge', 'buy', 'login', 'signup', 'edit-profile');
    (0, dom_1.$)('#header').classList.remove('manage', 'charge', 'buy', 'login', 'signup', 'edit-profile');
    (0, dom_1.$)('#app').classList.add(tabName);
    (0, dom_1.$)('#header').classList.add(tabName);
  };

  return VendingMachine;
}();

exports["default"] = VendingMachine;

/***/ }),

/***/ "./src/ts/core/ChargeMoneyTab.js":
/*!***************************************!*\
  !*** ./src/ts/core/ChargeMoneyTab.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;

var dom_1 = __webpack_require__(/*! ../utils/dom */ "./src/ts/utils/dom.js");

var render_1 = __webpack_require__(/*! ../views/render */ "./src/ts/views/render.js");

var productUtil_1 = __webpack_require__(/*! ../utils/productUtil */ "./src/ts/utils/productUtil.js");

var ChargeMoneyTab =
/** @class */
function () {
  function ChargeMoneyTab(coins, verifyValue) {
    var _this = this;

    this.verifyValue = verifyValue;
    this.coins = coins;
    window.addEventListener('load', function () {
      (0, dom_1.$)('#tab__charge-button').addEventListener('click', render_1.drawCoins.bind(_this));
      (0, dom_1.$)('#charge-money-form').addEventListener('submit', _this.handleChargeMoney.bind(_this));
    });
  }

  ChargeMoneyTab.prototype.handleChargeMoney = function (e) {
    e.preventDefault();
    var inputMoney = Number((0, dom_1.$)('#charge-money-input').value);

    if (this.verifyValue.verifyChargeMoney(inputMoney)) {
      var coinList = productUtil_1.generateRandomCoins.call(this, inputMoney);
      this.chargeMoney(coinList);
      render_1.drawCoins.call(this);
    }
  };

  ChargeMoneyTab.prototype.chargeMoney = function (coinList) {
    this.coins.forEach(function (coin, index) {
      return coin.count += coinList[index];
    });
  };

  return ChargeMoneyTab;
}();

exports["default"] = ChargeMoneyTab;

/***/ }),

/***/ "./src/ts/core/EditProfileTab.js":
/*!***************************************!*\
  !*** ./src/ts/core/EditProfileTab.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;

var dom_1 = __webpack_require__(/*! ../utils/dom */ "./src/ts/utils/dom.js");

var userInfoUtil_1 = __webpack_require__(/*! ../utils/userInfoUtil */ "./src/ts/utils/userInfoUtil.js");

var loginUtil_1 = __webpack_require__(/*! ../utils/loginUtil */ "./src/ts/utils/loginUtil.js");

var snackbar_1 = __webpack_require__(/*! ../utils/snackbar */ "./src/ts/utils/snackbar.js");

var constants_1 = __webpack_require__(/*! ../constants */ "./src/ts/constants/index.js");

var EditProfileTab =
/** @class */
function () {
  function EditProfileTab(verifyValue) {
    this.verifyValue = verifyValue;
    (0, dom_1.$)('.edit-profile-button').addEventListener('change', this.handleSelect.bind(this));
    (0, dom_1.$)('#edit-profile-confirm-button').addEventListener('click', this.handleEditProfile.bind(this));
  }

  EditProfileTab.prototype.handleSelect = function () {
    if ((0, dom_1.$)('.edit-profile-button').value === 'edit-profile') {
      this.handleClickEditButton();

      var _a = JSON.parse(localStorage.getItem('accessToken')),
          email = _a.email,
          name_1 = _a.name;

      (0, dom_1.$)('#edit-profile-form__name-input').value = name_1;
      (0, dom_1.$)('#edit-profile-form__email-input').value = email;
      (0, dom_1.$)('.edit-profile-button').value = 'name-thumbnail';
    } else if ((0, dom_1.$)('.edit-profile-button').value === 'logout') {
      this.handleLogOut();
    }
  };

  EditProfileTab.prototype.handleClickEditButton = function () {
    history.pushState({}, '', window.location.pathname + "#edit-profile");
    (0, dom_1.$)('#app').classList.remove('manage', 'charge', 'buy', 'login', 'signup', 'edit-profile');
    (0, dom_1.$)('#header').classList.remove('manage', 'charge', 'buy', 'login', 'signup', 'edit-profile');
    (0, dom_1.$)('#app').classList.add('edit-profile');
    (0, dom_1.$)('#header').classList.add('edit-profile');
  };

  EditProfileTab.prototype.handleLogOut = function () {
    (0, loginUtil_1.logOutedMode)();
    localStorage.clear();
  };

  EditProfileTab.prototype.handleEditProfile = function () {
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
              return [2
              /*return*/
              ];
            }

            _a.label = 1;

          case 1:
            _a.trys.push([1, 7,, 8]);

            return [4
            /*yield*/
            , fetch("".concat(constants_1.baseUrl, "/users/").concat(id), {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: name,
                password: password,
                passwordConfirm: passwordConfirm
              })
            })];

          case 2:
            response = _a.sent();
            if (!response.ok) return [3
            /*break*/
            , 4];
            return [4
            /*yield*/
            , response.json()];

          case 3:
            name_2 = _a.sent().name;
            accessToken.name = name_2;
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
            (0, loginUtil_1.loginnedMode)();
            return [3
            /*break*/
            , 6];

          case 4:
            return [4
            /*yield*/
            , response.json()];

          case 5:
            json = _a.sent();
            (0, snackbar_1.displaySnackbar)(json);
            _a.label = 6;

          case 6:
            return [3
            /*break*/
            , 8];

          case 7:
            error_1 = _a.sent();
            (0, snackbar_1.displaySnackbar)(error_1);
            return [3
            /*break*/
            , 8];

          case 8:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  return EditProfileTab;
}();

exports["default"] = EditProfileTab;

/***/ }),

/***/ "./src/ts/core/LoginTab.js":
/*!*********************************!*\
  !*** ./src/ts/core/LoginTab.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;

var dom_1 = __webpack_require__(/*! ../utils/dom */ "./src/ts/utils/dom.js");

var userInfoUtil_1 = __webpack_require__(/*! ../utils/userInfoUtil */ "./src/ts/utils/userInfoUtil.js");

var loginUtil_1 = __webpack_require__(/*! ../utils/loginUtil */ "./src/ts/utils/loginUtil.js");

var snackbar_1 = __webpack_require__(/*! ../utils/snackbar */ "./src/ts/utils/snackbar.js");

var constants_1 = __webpack_require__(/*! ../constants */ "./src/ts/constants/index.js");

var LoginTab =
/** @class */
function () {
  function LoginTab(verifyValue) {
    this.verifyValue = verifyValue;
    this.$login = (0, dom_1.$)('.login');
    (0, dom_1.$)('#link', this.$login).addEventListener('click', this.handleLink);
    (0, dom_1.$)('#login-confirm-button', this.$login).addEventListener('click', this.handleLogin.bind(this));
  }

  LoginTab.prototype.handleLogin = function () {
    return __awaiter(this, void 0, void 0, function () {
      var loginInfo, email, password, response, json, accessToken, user, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            loginInfo = (0, userInfoUtil_1.getLoginInfo)();
            email = loginInfo.email, password = loginInfo.password;

            if (!this.verifyValue.verifyLoginInfo(loginInfo)) {
              return [2
              /*return*/
              ];
            }

            _a.label = 1;

          case 1:
            _a.trys.push([1, 4,, 5]);

            return [4
            /*yield*/
            , fetch("".concat(constants_1.baseUrl, "/login"), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: email,
                password: password
              })
            })];

          case 2:
            response = _a.sent();
            return [4
            /*yield*/
            , response.json()];

          case 3:
            json = _a.sent();
            accessToken = json.accessToken, user = json.user;

            if (response.ok) {
              localStorage.setItem('accessToken', JSON.stringify(__assign(__assign({}, user), {
                accessToken: accessToken
              })));
              (0, loginUtil_1.loginnedMode)();
            } else {
              (0, snackbar_1.displaySnackbar)(json);
            }

            return [3
            /*break*/
            , 5];

          case 4:
            error_1 = _a.sent();
            (0, snackbar_1.displaySnackbar)(error_1);
            return [3
            /*break*/
            , 5];

          case 5:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  LoginTab.prototype.handleLink = function () {
    history.pushState({}, '', window.location.pathname + "#signup");
    (0, dom_1.$)('#app').classList.remove('manage', 'charge', 'buy', 'login', 'signup', 'edit-profile');
    (0, dom_1.$)('#header').classList.remove('manage', 'charge', 'buy', 'login', 'signup', 'edit-profile');
    (0, dom_1.$)('#app').classList.add('signup');
    (0, dom_1.$)('#header').classList.add('signup');
  };

  return LoginTab;
}();

exports["default"] = LoginTab;

/***/ }),

/***/ "./src/ts/core/ProductBuyTab.js":
/*!**************************************!*\
  !*** ./src/ts/core/ProductBuyTab.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;

var dom_1 = __webpack_require__(/*! ../utils/dom */ "./src/ts/utils/dom.js");

var render_1 = __webpack_require__(/*! ../views/render */ "./src/ts/views/render.js");

var productUtil_1 = __webpack_require__(/*! ../utils/productUtil */ "./src/ts/utils/productUtil.js");

var ProductBuyTab =
/** @class */
function () {
  function ProductBuyTab(products, coins, verifyValue) {
    var _this = this;

    this.verifyValue = verifyValue;
    this.products = products;
    this.coins = coins;
    this.totalMoney = 0;
    this.$buy = (0, dom_1.$)('.app__main.buy');
    window.addEventListener('load', function () {
      (0, dom_1.$)('#tab__buy-button').addEventListener('click', _this.updateResources.bind(_this));
      (0, dom_1.$)('#input-money-form', _this.$buy).addEventListener('submit', _this.handleChargeMoney.bind(_this));
      (0, dom_1.$)('#product-list', _this.$buy).addEventListener('click', _this.handleBuyProduct.bind(_this));
      (0, dom_1.$)('.return-button', _this.$buy).addEventListener('click', _this.handleReturnMoney.bind(_this));
    });
  }

  ProductBuyTab.prototype.updateResources = function () {
    render_1.drawProductList.call(this, this.$buy);
    render_1.drawCoins.call(this);
  };

  ProductBuyTab.prototype.handleChargeMoney = function (e) {
    e.preventDefault();
    var inputMoney = Number((0, dom_1.$)('#input-money-input', this.$buy).value);

    if (this.verifyValue.verifyInputMoney(inputMoney)) {
      this.totalMoney += inputMoney;
      render_1.drawTotalMoney.call(this);
    }
  };

  ProductBuyTab.prototype.handleBuyProduct = function (e) {
    if (!e.target.classList.contains('buy-button')) {
      return;
    }

    var productInfo = productUtil_1.getProductInfoModify.call(this, e.target.closest('tr'));
    var index = productUtil_1.getProductIndex.call(this, productInfo.name);

    if (this.verifyValue.canBuyProduct(productInfo, this.totalMoney)) {
      this.saleProduct(productInfo, index);
      render_1.drawProductList.call(this, this.$buy);
    }
  };

  ProductBuyTab.prototype.handleReturnMoney = function () {
    for (var i = this.coins.length - 1; i >= 0; i--) {
      while (this.totalMoney >= this.coins[i].amount && this.coins[i].count >= 1) {
        this.totalMoney -= this.coins[i].amount;
        this.coins[i].count -= 1;
      }
    }

    render_1.drawCoins.call(this);
    render_1.drawTotalMoney.call(this);
  };

  ProductBuyTab.prototype.saleProduct = function (_a, index) {
    var name = _a.name,
        price = _a.price,
        quantity = _a.quantity;
    quantity -= 1;
    this.totalMoney -= price;
    this.products[index] = {
      name: name,
      price: price,
      quantity: quantity
    };
    render_1.drawProductList.call(this, this.$buy);
    render_1.drawTotalMoney.call(this);
  };

  return ProductBuyTab;
}();

exports["default"] = ProductBuyTab;

/***/ }),

/***/ "./src/ts/core/ProductManageTab.js":
/*!*****************************************!*\
  !*** ./src/ts/core/ProductManageTab.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;

var dom_1 = __webpack_require__(/*! ../utils/dom */ "./src/ts/utils/dom.js");

var render_1 = __webpack_require__(/*! ../views/render */ "./src/ts/views/render.js");

var productUtil_1 = __webpack_require__(/*! ../utils/productUtil */ "./src/ts/utils/productUtil.js");

var ProductManageTab =
/** @class */
function () {
  function ProductManageTab(products, verifyValue) {
    var _this = this;

    this.products = products;
    this.verifyValue = verifyValue;
    window.addEventListener('load', function () {
      (0, dom_1.$)('#tab__manage-button').addEventListener('click', render_1.drawProductList.bind(_this, document));
      (0, dom_1.$)('#add-product-form').addEventListener('submit', _this.handleAddProduct.bind(_this));
      (0, dom_1.$)('#product-list').addEventListener('click', _this.handleClickButtons.bind(_this));
    });
  }

  ProductManageTab.prototype.handleAddProduct = function (e) {
    e.preventDefault();
    var productInfo = productUtil_1.getProductInfo.call(this);

    if (this.verifyValue.verifyProductInfo(productInfo, -1)) {
      this.addProduct(productInfo);
      render_1.drawProductList.call(this);
    }
  };

  ProductManageTab.prototype.handleClickButtons = function (e) {
    if (e.target.classList.contains('modify-button')) {
      e.target.closest('tr').classList.add('modify');
    }

    if (e.target.classList.contains('delete-button') && confirm('정말 삭제하시겠습니까?')) {
      this.deleteProduct(e.target.closest('tr').children[0].innerText);
      render_1.drawProductList.call(this);
    }

    if (e.target.classList.contains('confirm-button')) {
      var productInfo = productUtil_1.getProductInfoModify.call(this, e.target.closest('tr'));
      var index = productUtil_1.getProductRowIndex.call(this, e.target.closest('tr'));

      if (this.verifyValue.verifyProductInfo(productInfo, index)) {
        this.modifyProduct(productInfo, index);
        render_1.drawProductList.call(this);
      }
    }
  };

  ProductManageTab.prototype.addProduct = function (productInfo) {
    this.products.push(productInfo);
  };

  ProductManageTab.prototype.modifyProduct = function (productInfo, index) {
    this.products[index] = productInfo;
  };

  ProductManageTab.prototype.deleteProduct = function (name) {
    this.products.splice(productUtil_1.getProductIndex.call(this, name), 1);
  };

  return ProductManageTab;
}();

exports["default"] = ProductManageTab;

/***/ }),

/***/ "./src/ts/core/SignUpTab.js":
/*!**********************************!*\
  !*** ./src/ts/core/SignUpTab.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;

var dom_1 = __webpack_require__(/*! ../utils/dom */ "./src/ts/utils/dom.js");

var userInfoUtil_1 = __webpack_require__(/*! ../utils/userInfoUtil */ "./src/ts/utils/userInfoUtil.js");

var loginUtil_1 = __webpack_require__(/*! ../utils/loginUtil */ "./src/ts/utils/loginUtil.js");

var snackbar_1 = __webpack_require__(/*! ../utils/snackbar */ "./src/ts/utils/snackbar.js");

var constants_1 = __webpack_require__(/*! ../constants */ "./src/ts/constants/index.js");

var SignUpTab =
/** @class */
function () {
  function SignUpTab(verifyValue) {
    this.verifyValue = verifyValue;
    (0, dom_1.$)('#signup-confirm-button').addEventListener('click', this.handleSignUp.bind(this));
  }

  SignUpTab.prototype.handleSignUp = function () {
    return __awaiter(this, void 0, void 0, function () {
      var signUpInfo, email, name, password, passwordConfirm, response, _a, accessToken, user, json, error_1;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            signUpInfo = (0, userInfoUtil_1.getSignUpInfo)();
            email = signUpInfo.email, name = signUpInfo.name, password = signUpInfo.password, passwordConfirm = signUpInfo.passwordConfirm;

            if (!this.verifyValue.verifySignUpInfo(signUpInfo)) {
              return [2
              /*return*/
              ];
            }

            _b.label = 1;

          case 1:
            _b.trys.push([1, 7,, 8]);

            return [4
            /*yield*/
            , fetch("".concat(constants_1.baseUrl, "/signup"), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: email,
                name: name,
                password: password,
                passwordConfirm: passwordConfirm
              })
            })];

          case 2:
            response = _b.sent();
            if (!response.ok) return [3
            /*break*/
            , 4];
            return [4
            /*yield*/
            , response.json()];

          case 3:
            _a = _b.sent(), accessToken = _a.accessToken, user = _a.user;
            localStorage.setItem('accessToken', JSON.stringify(__assign(__assign({}, user), {
              accessToken: accessToken
            })));
            (0, loginUtil_1.loginnedMode)();
            return [3
            /*break*/
            , 6];

          case 4:
            return [4
            /*yield*/
            , response.json()];

          case 5:
            json = _b.sent();
            (0, snackbar_1.displaySnackbar)(json);
            _b.label = 6;

          case 6:
            return [3
            /*break*/
            , 8];

          case 7:
            error_1 = _b.sent();
            (0, snackbar_1.displaySnackbar)(error_1);
            return [3
            /*break*/
            , 8];

          case 8:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  return SignUpTab;
}();

exports["default"] = SignUpTab;

/***/ }),

/***/ "./src/ts/utils/dom.js":
/*!*****************************!*\
  !*** ./src/ts/utils/dom.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {



exports.__esModule = true;
exports.$ = void 0;

var $ = function $(selector, parentNode) {
  if (parentNode === void 0) {
    parentNode = document;
  }

  return parentNode.querySelector(selector);
};

exports.$ = $;

/***/ }),

/***/ "./src/ts/utils/loginUtil.js":
/*!***********************************!*\
  !*** ./src/ts/utils/loginUtil.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;
exports.logOutedMode = exports.loginnedMode = void 0;

var dom_1 = __webpack_require__(/*! ./dom */ "./src/ts/utils/dom.js");

var loginnedMode = function loginnedMode() {
  (0, dom_1.$)('.login-button').classList.add('loginned');
  (0, dom_1.$)('.edit-profile-button').classList.add('loginned');
  (0, dom_1.$)('.tab').classList.add('loginned');
  var name = JSON.parse(localStorage.getItem('accessToken')).name;
  (0, dom_1.$)('#name-thumbnail').textContent = name[0];
  (0, dom_1.$)('.edit-profile-button').value = 'name-thumbnail';
  location.href = "".concat(window.location.pathname, "#manage");
};

exports.loginnedMode = loginnedMode;

var logOutedMode = function logOutedMode() {
  (0, dom_1.$)('.login-button').classList.remove('loginned');
  (0, dom_1.$)('.edit-profile-button').classList.remove('loginned');
  (0, dom_1.$)('.tab').classList.remove('loginned');
  location.href = "".concat(window.location.pathname, "#buy");
};

exports.logOutedMode = logOutedMode;

/***/ }),

/***/ "./src/ts/utils/productUtil.js":
/*!*************************************!*\
  !*** ./src/ts/utils/productUtil.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

exports.__esModule = true;
exports.generateRandomCoins = exports.getProductIndex = exports.getProductRowIndex = exports.getProductInfoModify = exports.getProductInfo = void 0;

var dom_1 = __webpack_require__(/*! ./dom */ "./src/ts/utils/dom.js");

var getProductInfo = function getProductInfo() {
  var name = (0, dom_1.$)('#product-name-input').value;
  var price = Number((0, dom_1.$)('#product-price-input').value);
  var quantity = Number((0, dom_1.$)('#product-quantity-input').value);
  return {
    name: name,
    price: price,
    quantity: quantity
  };
};

exports.getProductInfo = getProductInfo;

var getProductInfoModify = function getProductInfoModify(productNode) {
  var name = (0, dom_1.$)('.product-info-name', productNode).value;
  var price = Number((0, dom_1.$)('.product-info-price', productNode).value);
  var quantity = Number((0, dom_1.$)('.product-info-quantity', productNode).value);
  return {
    name: name,
    price: price,
    quantity: quantity
  };
};

exports.getProductInfoModify = getProductInfoModify;

var getProductRowIndex = function getProductRowIndex(productRow) {
  return __spreadArray([], (0, dom_1.$)('#product-list').childNodes, true).findIndex(function (row) {
    return row === productRow;
  });
};

exports.getProductRowIndex = getProductRowIndex;

var getProductIndex = function getProductIndex(name) {
  return this.products.findIndex(function (product) {
    return product.name === name;
  });
};

exports.getProductIndex = getProductIndex;

var generateRandomCoins = function generateRandomCoins(inputMoney) {
  var coins = this.coins.map(function (_a) {
    var amount = _a.amount;
    return amount;
  });
  var coinList = [0, 0, 0, 0];

  while (inputMoney > 0) {
    var pickLength = coins.filter(function (coin) {
      return inputMoney >= coin;
    });
    var coinIndex = Math.floor(Math.random() * pickLength.length);
    coinList[coinIndex] += 1;
    inputMoney -= coins[coinIndex];
  }

  return coinList;
};

exports.generateRandomCoins = generateRandomCoins;

/***/ }),

/***/ "./src/ts/utils/snackbar.js":
/*!**********************************!*\
  !*** ./src/ts/utils/snackbar.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;
exports.displaySnackbar = void 0;

var dom_1 = __webpack_require__(/*! ./dom */ "./src/ts/utils/dom.js");

var displaySnackbar = function displaySnackbar(message) {
  if (message === void 0) {
    message = '이곳에 메시지를 입력해주세요';
  }

  var $snackbar = (0, dom_1.$)('#snackbar');
  $snackbar.textContent = message;
  $snackbar.classList.toggle('show');
  setTimeout(function () {
    $snackbar.classList.toggle('show');
  }, 3000);
};

exports.displaySnackbar = displaySnackbar;

/***/ }),

/***/ "./src/ts/utils/userInfoUtil.js":
/*!**************************************!*\
  !*** ./src/ts/utils/userInfoUtil.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;
exports.getUserInfo = exports.getSignUpInfo = exports.getLoginInfo = void 0;

var dom_1 = __webpack_require__(/*! ./dom */ "./src/ts/utils/dom.js");

var getLoginInfo = function getLoginInfo() {
  var email = (0, dom_1.$)('#login-form__email-input').value;
  var password = (0, dom_1.$)('#login-form__password-input').value;
  return {
    email: email,
    password: password
  };
};

exports.getLoginInfo = getLoginInfo;

var getSignUpInfo = function getSignUpInfo() {
  var email = (0, dom_1.$)('#signup-form__email-input').value;
  var name = (0, dom_1.$)('#signup-form__name-input').value;
  var password = (0, dom_1.$)('#signup-form__password-input').value;
  var passwordConfirm = (0, dom_1.$)('#signup-form__password-check-input').value;
  return {
    email: email,
    name: name,
    password: password,
    passwordConfirm: passwordConfirm
  };
};

exports.getSignUpInfo = getSignUpInfo;

var getUserInfo = function getUserInfo() {
  var email = (0, dom_1.$)('#edit-profile-form__email-input').value;
  var name = (0, dom_1.$)('#edit-profile-form__name-input').value;
  var password = (0, dom_1.$)('#edit-profile-form__password-input').value;
  var passwordConfirm = (0, dom_1.$)('#edit-profile-form__password-check-input').value;
  return {
    email: email,
    name: name,
    password: password,
    passwordConfirm: passwordConfirm
  };
};

exports.getUserInfo = getUserInfo;

/***/ }),

/***/ "./src/ts/validations/verifyValueValidation.js":
/*!*****************************************************!*\
  !*** ./src/ts/validations/verifyValueValidation.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;

var constants_1 = __webpack_require__(/*! ../constants */ "./src/ts/constants/index.js");

var snackbar_1 = __webpack_require__(/*! ../utils/snackbar */ "./src/ts/utils/snackbar.js");

var VerifyValueValidation =
/** @class */
function () {
  function VerifyValueValidation(products, coins) {
    if (products === void 0) {
      products = [];
    }

    if (coins === void 0) {
      coins = [];
    }

    this.products = products;
    this.coins = coins;
  } // 각각의 전체 검증


  VerifyValueValidation.prototype.verifyProductInfo = function (_a, index) {
    var name = _a.name,
        price = _a.price,
        quantity = _a.quantity;

    if (!this.isValidProductNameRange(name)) {
      (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.PRODUCT_NAME_LENGTH);
      return false;
    }

    if (this.isOverlapProductName(name, index)) {
      (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.PRODUCT_NAME_UNIQUE);
      return false;
    }

    if (!this.isValidProductPrice(price)) {
      (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.PRODUCT_PRICE);
      return false;
    }

    if (!this.isValidProductQuantity(quantity)) {
      (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.PRODUCT_QUANTITY);
      return false;
    }

    return true;
  };

  VerifyValueValidation.prototype.verifyChargeMoney = function (chargeMoney) {
    if (!this.isValidChargeMoney(chargeMoney)) {
      (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.CHARGE_MONEY);
      return false;
    }

    if (!this.isValidChargeMoneyOver(chargeMoney)) {
      (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.CHARGE_MONEY_MAX);
      return false;
    }

    return true;
  };

  VerifyValueValidation.prototype.verifyInputMoney = function (inputMoney) {
    if (!this.isValidInputMoneyRange(inputMoney)) {
      (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.INPUT_MONEY_RANGE);
      return false;
    }

    if (!this.isValidInputMoneyMod(inputMoney)) {
      (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.INPUT_MONEY_MOD);
      return false;
    }

    return true;
  };

  VerifyValueValidation.prototype.verifyLoginInfo = function (_a) {
    var email = _a.email,
        password = _a.password;

    if (!this.isValidEmail(email)) {
      (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.USER_EMAIL);
      return false;
    }

    if (!this.isValidPassWord(password)) {
      (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.USER_PASSWORD);
      return false;
    }

    return true;
  };

  VerifyValueValidation.prototype.verifySignUpInfo = function (_a) {
    var email = _a.email,
        name = _a.name,
        password = _a.password,
        passwordConfirm = _a.passwordConfirm;

    if (!this.isValidEmail(email)) {
      (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.USER_EMAIL);
      return false;
    }

    if (!this.isValidName(name)) {
      (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.USER_NAME);
      return false;
    }

    if (!this.isValidPassWord(password)) {
      (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.USER_PASSWORD);
      return false;
    }

    if (!this.isValidPassWordConfirm(password, passwordConfirm)) {
      (0, snackbar_1.displaySnackbar)(constants_1.ALERT_MESSAGE.USER_PASSWORD_CONFIRM);
      return false;
    }

    return true;
  }; // 상품 정보 검증


  VerifyValueValidation.prototype.isValidProductNameRange = function (name) {
    return name.length >= constants_1.PRODUCT_RULES.MIN_NAME_LENGTH && name.length <= constants_1.PRODUCT_RULES.MAX_NAME_LENGTH;
  };

  VerifyValueValidation.prototype.isOverlapProductName = function (name, index) {
    return this.products.some(function (product, productIndex) {
      return productIndex !== index && product.name === name;
    });
  };

  VerifyValueValidation.prototype.isValidProductPrice = function (price) {
    return price >= constants_1.PRODUCT_RULES.MIN_PRICE && price <= constants_1.PRODUCT_RULES.MAX_PRICE && price % constants_1.PRODUCT_RULES.PRICE_MOD_UNIT === 0;
  };

  VerifyValueValidation.prototype.isValidProductQuantity = function (quantity) {
    return quantity >= constants_1.PRODUCT_RULES.MIN_QUANTITY && quantity <= constants_1.PRODUCT_RULES.MAX_QUANTITY;
  }; // 자판기 동전 충전 검증


  VerifyValueValidation.prototype.isValidChargeMoney = function (chargeMoney) {
    return chargeMoney >= constants_1.CHARGE_MONEY_RULES.MIN && chargeMoney % constants_1.CHARGE_MONEY_RULES.MOD_UNIT === 0;
  };

  VerifyValueValidation.prototype.isValidChargeMoneyOver = function (chargeMoney) {
    return this.totalAmount() + chargeMoney <= constants_1.CHARGE_MONEY_RULES.MAX;
  }; // 상품 구매 금액 충전 검증


  VerifyValueValidation.prototype.isValidInputMoneyRange = function (inputMoney) {
    return inputMoney >= constants_1.INPUT_MONEY_RULES.MIN && inputMoney <= constants_1.INPUT_MONEY_RULES.MAX;
  };

  VerifyValueValidation.prototype.isValidInputMoneyMod = function (inputMoney) {
    return inputMoney % constants_1.INPUT_MONEY_RULES.MOD_UNIT === 0;
  }; // 유저 정보 검증


  VerifyValueValidation.prototype.isValidName = function (name) {
    var nameReg = /^[가-힣]{2,6}$/;
    return nameReg.test(name);
  };

  VerifyValueValidation.prototype.isValidEmail = function (email) {
    var emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    return emailReg.test(email);
  };

  VerifyValueValidation.prototype.isValidPassWord = function (password) {
    var passwordReg = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)-_=+]).{8,16}$/;
    return passwordReg.test(password);
  };

  VerifyValueValidation.prototype.isValidPassWordConfirm = function (password, passwordConfirm) {
    return password === passwordConfirm;
  };

  VerifyValueValidation.prototype.canBuyProduct = function (_a, totalMoney) {
    var price = _a.price,
        quantity = _a.quantity;

    if (quantity < 1) {
      return false;
    }

    if (totalMoney < price) {
      return false;
    }

    return true;
  };

  VerifyValueValidation.prototype.totalAmount = function () {
    return this.coins.reduce(function (acc, _a) {
      var amount = _a.amount,
          count = _a.count;
      return acc + amount * count;
    }, 0);
  };

  return VerifyValueValidation;
}();

exports["default"] = VerifyValueValidation;

/***/ }),

/***/ "./src/ts/views/render.js":
/*!********************************!*\
  !*** ./src/ts/views/render.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;
exports.drawTotalMoney = exports.drawCoins = exports.switchButtons = exports.drawProductList = void 0;

var dom_1 = __webpack_require__(/*! ../utils/dom */ "./src/ts/utils/dom.js");

var drawProductList = function drawProductList(parentNode) {
  if (parentNode === void 0) {
    parentNode = document;
  }

  var template = this.products.map(function (_a) {
    var name = _a.name,
        price = _a.price,
        quantity = _a.quantity;
    return "<tr class=\"product-info\">\n          <td class=\"product-info__text\">".concat(name, "</td>\n          <td class=\"product-info__text\">").concat(price, "</td>\n          <td class=\"product-info__text\">").concat(quantity, "</td>\n          <td class=\"product-info__input\"><input type=\"text\" minlength=\"1\" maxlength=\"10\" required=\"required\" class=\"product-info-name\" value=\"").concat(name, "\" /></td>\n          <td class=\"product-info__input\"><input type=\"number\" max=\"10000\" min=\"100\" required=\"required\" class=\"product-info-price\" value=\"").concat(price, "\" /></td>\n          <td class=\"product-info__input\"><input type=\"number\" max=\"20\" min=\"1\" required=\"required\" class=\"product-info-quantity\" value=\"").concat(quantity, "\" /></td>\n          <td>\n            ").concat((0, exports.switchButtons)(parentNode), "\n          </td>\n        </tr>");
  }).join('');
  (0, dom_1.$)('#product-list', parentNode).replaceChildren();
  (0, dom_1.$)('#product-list', parentNode).insertAdjacentHTML('beforeend', template);
};

exports.drawProductList = drawProductList;

var switchButtons = function switchButtons(parentNode) {
  if (parentNode === document) {
    return "\n      <button class=\"modify-button button\">\uC218\uC815</button>\n      <button class=\"delete-button button\">\uC0AD\uC81C</button>\n      <button class=\"confirm-button button\">\uD655\uC778</button>\n    ";
  }

  return "<button class=\"buy-button button\">\uAD6C\uB9E4</button>";
};

exports.switchButtons = switchButtons;

var drawCoins = function drawCoins() {
  var _this = this;

  this.coins.forEach(function (_a) {
    var amount = _a.amount,
        count = _a.count;
    (0, dom_1.$)("#coin-".concat(amount, "-count"), _this.$buy).innerText = "".concat(count, "\uAC1C");
  });
};

exports.drawCoins = drawCoins;

var drawTotalMoney = function drawTotalMoney() {
  (0, dom_1.$)('.input-money-indicator').textContent = "\uD22C\uC785\uD55C \uAE08\uC561: ".concat(this.totalMoney, "\uC6D0");
};

exports.drawTotalMoney = drawTotalMoney;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/component/button.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/component/button.css ***!
  \****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".button {\n  cursor: pointer;\n  border-radius: 4px;\n  border: none;\n}\n\n.button:hover {\n  background-color: var(--tab-active-background-color);\n}\n", "",{"version":3,"sources":["webpack://./src/css/component/button.css"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,kBAAkB;EAClB,YAAY;AACd;;AAEA;EACE,oDAAoD;AACtD","sourcesContent":[".button {\n  cursor: pointer;\n  border-radius: 4px;\n  border: none;\n}\n\n.button:hover {\n  background-color: var(--tab-active-background-color);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/component/color.css":
/*!***************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/component/color.css ***!
  \***************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --app-border-color: rgba(0, 0, 0, 0.12);\n  --tab-background-color: #f5f5f5;\n  --tab-font-color: #000000;\n  --tab-active-background-color: rgba(0, 188, 212, 0.16);\n  --input-border-color: #b4b4b4;\n  --submit-button-color: #00bcd4;\n  --submit-button-font-color: #ffffff;\n  --product-border-color: #dcdcdc;\n}\n", "",{"version":3,"sources":["webpack://./src/css/component/color.css"],"names":[],"mappings":"AAAA;EACE,uCAAuC;EACvC,+BAA+B;EAC/B,yBAAyB;EACzB,sDAAsD;EACtD,6BAA6B;EAC7B,8BAA8B;EAC9B,mCAAmC;EACnC,+BAA+B;AACjC","sourcesContent":[":root {\n  --app-border-color: rgba(0, 0, 0, 0.12);\n  --tab-background-color: #f5f5f5;\n  --tab-font-color: #000000;\n  --tab-active-background-color: rgba(0, 188, 212, 0.16);\n  --input-border-color: #b4b4b4;\n  --submit-button-color: #00bcd4;\n  --submit-button-font-color: #ffffff;\n  --product-border-color: #dcdcdc;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/component/snackbar.css":
/*!******************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/component/snackbar.css ***!
  \******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#snackbar {\n  visibility: hidden;\n  width: 700px;\n  margin-left: -365px;\n  background-color: #333;\n  color: #fff;\n  text-align: center;\n  border-radius: 2px;\n  padding: 16px;\n  position: fixed;\n  z-index: 1;\n  left: 50%;\n  bottom: 0;\n}\n\n.show {\n  visibility: visible !important;\n  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.7s;\n  animation: fadein 0.5s, fadeout 0.5s 2.7s;\n}\n\n@-webkit-keyframes fadein {\n  from {\n    bottom: 0;\n    opacity: 0;\n  }\n  to {\n    bottom: 30px;\n    opacity: 1;\n  }\n}\n\n@keyframes fadein {\n  from {\n    bottom: 0;\n    opacity: 0;\n  }\n  to {\n    bottom: 0;\n    opacity: 1;\n  }\n}\n\n@-webkit-keyframes fadeout {\n  from {\n    bottom: 0;\n    opacity: 1;\n  }\n  to {\n    bottom: -30px;\n    opacity: 0;\n  }\n}\n\n@keyframes fadeout {\n  from {\n    bottom: 0;\n    opacity: 1;\n  }\n  to {\n    bottom: -30px;\n    opacity: 0;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/css/component/snackbar.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,WAAW;EACX,kBAAkB;EAClB,kBAAkB;EAClB,aAAa;EACb,eAAe;EACf,UAAU;EACV,SAAS;EACT,SAAS;AACX;;AAEA;EACE,8BAA8B;EAC9B,iDAAiD;EACjD,yCAAyC;AAC3C;;AAEA;EACE;IACE,SAAS;IACT,UAAU;EACZ;EACA;IACE,YAAY;IACZ,UAAU;EACZ;AACF;;AAEA;EACE;IACE,SAAS;IACT,UAAU;EACZ;EACA;IACE,SAAS;IACT,UAAU;EACZ;AACF;;AAEA;EACE;IACE,SAAS;IACT,UAAU;EACZ;EACA;IACE,aAAa;IACb,UAAU;EACZ;AACF;;AAEA;EACE;IACE,SAAS;IACT,UAAU;EACZ;EACA;IACE,aAAa;IACb,UAAU;EACZ;AACF","sourcesContent":["#snackbar {\n  visibility: hidden;\n  width: 700px;\n  margin-left: -365px;\n  background-color: #333;\n  color: #fff;\n  text-align: center;\n  border-radius: 2px;\n  padding: 16px;\n  position: fixed;\n  z-index: 1;\n  left: 50%;\n  bottom: 0;\n}\n\n.show {\n  visibility: visible !important;\n  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.7s;\n  animation: fadein 0.5s, fadeout 0.5s 2.7s;\n}\n\n@-webkit-keyframes fadein {\n  from {\n    bottom: 0;\n    opacity: 0;\n  }\n  to {\n    bottom: 30px;\n    opacity: 1;\n  }\n}\n\n@keyframes fadein {\n  from {\n    bottom: 0;\n    opacity: 0;\n  }\n  to {\n    bottom: 0;\n    opacity: 1;\n  }\n}\n\n@-webkit-keyframes fadeout {\n  from {\n    bottom: 0;\n    opacity: 1;\n  }\n  to {\n    bottom: -30px;\n    opacity: 0;\n  }\n}\n\n@keyframes fadeout {\n  from {\n    bottom: 0;\n    opacity: 1;\n  }\n  to {\n    bottom: -30px;\n    opacity: 0;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/index.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/index.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_component_button_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./component/button.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/component/button.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_component_color_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./component/color.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/component/color.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_component_snackbar_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./component/snackbar.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/component/snackbar.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_screen_productManage_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./screen/productManage.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/screen/productManage.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_screen_moneyCharge_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./screen/moneyCharge.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/screen/moneyCharge.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_screen_ProductBuy_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./screen/ProductBuy.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/screen/ProductBuy.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_screen_login_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./screen/login.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/screen/login.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_screen_signUp_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./screen/signUp.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/screen/signUp.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_screen_editProfile_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./screen/editProfile.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/screen/editProfile.css");
// Imports











var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_component_button_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_component_color_css__WEBPACK_IMPORTED_MODULE_3__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_component_snackbar_css__WEBPACK_IMPORTED_MODULE_4__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_screen_productManage_css__WEBPACK_IMPORTED_MODULE_5__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_screen_moneyCharge_css__WEBPACK_IMPORTED_MODULE_6__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_screen_ProductBuy_css__WEBPACK_IMPORTED_MODULE_7__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_screen_login_css__WEBPACK_IMPORTED_MODULE_8__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_screen_signUp_css__WEBPACK_IMPORTED_MODULE_9__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_screen_editProfile_css__WEBPACK_IMPORTED_MODULE_10__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  display: flex;\n  justify-content: center;\n  margin-top: 32px;\n}\n\n.app {\n  padding: 0 0 44px 0;\n  width: 600px;\n  min-height: 675px;\n  border: 1px solid var(--app-border-color);\n  box-sizing: content-box;\n  border-radius: 4px;\n}\n\n.app__title {\n  text-align: center;\n  font-weight: 600;\n  font-size: 34px;\n  line-height: 36px;\n  color: #000000;\n}\n\n.tab {\n  display: flex;\n  justify-content: center;\n  margin-top: 32px;\n}\n\n.tab__item {\n  padding: 9px 20px;\n  background-color: var(--tab-background-color);\n  font-size: 16px;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n  color: var(--tab-font-color);\n}\n\n.tab__item:nth-child(2) {\n  margin: 0 4px;\n}\n\n.app.manage .tab__item[data-name='manage'],\n.app.charge .tab__item[data-name='charge'],\n.app.buy .tab__item[data-name='buy'] {\n  background-color: var(--tab-active-background-color);\n}\n\n.app .app__main {\n  display: none;\n}\n\n.app__header {\n  display: none;\n}\n\n.tab {\n  display: none;\n}\n\n.tab.loginned {\n  display: flex;\n}\n\n.login-button.loginned {\n  display: none;\n}\n\n.edit-profile-button {\n  display: none;\n}\n\n.edit-profile-button.loginned {\n  display: block;\n}\n\n.app.manage .app__main.manage,\n.app.charge .app__main.charge,\n.app.buy .app__main.buy,\n.app.login .app__main.login,\n.app.signup .app__main.signup,\n.app.edit-profile .app__main.edit-profile {\n  display: flex;\n}\n\n.app__header.manage,\n.app__header.charge,\n.app__header.buy {\n  display: block;\n}\n\n.login-button-container {\n  display: flex;\n  justify-content: flex-end;\n}\n\n.login-button {\n  margin: 10px;\n  width: 100px;\n  height: 32px;\n}\n\n.edit-profile-button {\n  margin: 10px;\n  width: 32px;\n  height: 32px;\n  border-radius: 100%;\n  background-color: var(--tab-active-background-color);\n}\n\n.edit-profile-button {\n  text-align: center;\n  -webkit-appearance: none;\n}\n", "",{"version":3,"sources":["webpack://./src/css/index.css"],"names":[],"mappings":"AAWA;EACE,aAAa;EACb,uBAAuB;EACvB,gBAAgB;AAClB;;AAEA;EACE,mBAAmB;EACnB,YAAY;EACZ,iBAAiB;EACjB,yCAAyC;EACzC,uBAAuB;EACvB,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,eAAe;EACf,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,gBAAgB;AAClB;;AAEA;EACE,iBAAiB;EACjB,6CAA6C;EAC7C,eAAe;EACf,iBAAiB;EACjB,qBAAqB;EACrB,4BAA4B;AAC9B;;AAEA;EACE,aAAa;AACf;;AAEA;;;EAGE,oDAAoD;AACtD;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;;;;;;EAME,aAAa;AACf;;AAEA;;;EAGE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,yBAAyB;AAC3B;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,YAAY;EACZ,mBAAmB;EACnB,oDAAoD;AACtD;;AAEA;EACE,kBAAkB;EAClB,wBAAwB;AAC1B","sourcesContent":["@import './component/button.css';\n@import './component/color.css';\n@import './component/snackbar.css';\n\n@import './screen/productManage.css';\n@import './screen/moneyCharge.css';\n@import './screen/ProductBuy.css';\n@import './screen/login.css';\n@import './screen/signUp.css';\n@import './screen/editProfile.css';\n\nbody {\n  display: flex;\n  justify-content: center;\n  margin-top: 32px;\n}\n\n.app {\n  padding: 0 0 44px 0;\n  width: 600px;\n  min-height: 675px;\n  border: 1px solid var(--app-border-color);\n  box-sizing: content-box;\n  border-radius: 4px;\n}\n\n.app__title {\n  text-align: center;\n  font-weight: 600;\n  font-size: 34px;\n  line-height: 36px;\n  color: #000000;\n}\n\n.tab {\n  display: flex;\n  justify-content: center;\n  margin-top: 32px;\n}\n\n.tab__item {\n  padding: 9px 20px;\n  background-color: var(--tab-background-color);\n  font-size: 16px;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n  color: var(--tab-font-color);\n}\n\n.tab__item:nth-child(2) {\n  margin: 0 4px;\n}\n\n.app.manage .tab__item[data-name='manage'],\n.app.charge .tab__item[data-name='charge'],\n.app.buy .tab__item[data-name='buy'] {\n  background-color: var(--tab-active-background-color);\n}\n\n.app .app__main {\n  display: none;\n}\n\n.app__header {\n  display: none;\n}\n\n.tab {\n  display: none;\n}\n\n.tab.loginned {\n  display: flex;\n}\n\n.login-button.loginned {\n  display: none;\n}\n\n.edit-profile-button {\n  display: none;\n}\n\n.edit-profile-button.loginned {\n  display: block;\n}\n\n.app.manage .app__main.manage,\n.app.charge .app__main.charge,\n.app.buy .app__main.buy,\n.app.login .app__main.login,\n.app.signup .app__main.signup,\n.app.edit-profile .app__main.edit-profile {\n  display: flex;\n}\n\n.app__header.manage,\n.app__header.charge,\n.app__header.buy {\n  display: block;\n}\n\n.login-button-container {\n  display: flex;\n  justify-content: flex-end;\n}\n\n.login-button {\n  margin: 10px;\n  width: 100px;\n  height: 32px;\n}\n\n.edit-profile-button {\n  margin: 10px;\n  width: 32px;\n  height: 32px;\n  border-radius: 100%;\n  background-color: var(--tab-active-background-color);\n}\n\n.edit-profile-button {\n  text-align: center;\n  -webkit-appearance: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/screen/ProductBuy.css":
/*!*****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/screen/ProductBuy.css ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".button-container {\n  display: flex;\n}\n\n.return-button {\n  height: 32px;\n  margin-top: 20px;\n}\n\n.input-money-indicator {\n  margin-bottom: 0;\n}\n", "",{"version":3,"sources":["webpack://./src/css/screen/ProductBuy.css"],"names":[],"mappings":"AAAA;EACE,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;AAClB","sourcesContent":[".button-container {\n  display: flex;\n}\n\n.return-button {\n  height: 32px;\n  margin-top: 20px;\n}\n\n.input-money-indicator {\n  margin-bottom: 0;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/screen/editProfile.css":
/*!******************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/screen/editProfile.css ***!
  \******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#edit-profile-form {\n  display: flex;\n  flex-direction: column;\n}\n\n#edit-profile-input-container {\n  display: flex;\n  flex-direction: column;\n  margin: auto;\n}\n\n.edit-profile-form__input {\n  width: 300px;\n  height: 30px;\n  border: 1px solid var(--input-border-color);\n  box-sizing: border-box;\n  border-radius: 4px;\n  margin-bottom: 30px;\n}\n\n#edit-profile-confirm-button {\n  width: 300px;\n}\n", "",{"version":3,"sources":["webpack://./src/css/screen/editProfile.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,2CAA2C;EAC3C,sBAAsB;EACtB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,YAAY;AACd","sourcesContent":["#edit-profile-form {\n  display: flex;\n  flex-direction: column;\n}\n\n#edit-profile-input-container {\n  display: flex;\n  flex-direction: column;\n  margin: auto;\n}\n\n.edit-profile-form__input {\n  width: 300px;\n  height: 30px;\n  border: 1px solid var(--input-border-color);\n  box-sizing: border-box;\n  border-radius: 4px;\n  margin-bottom: 30px;\n}\n\n#edit-profile-confirm-button {\n  width: 300px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/screen/login.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/screen/login.css ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#login-form {\n  display: flex;\n  flex-direction: column;\n}\n\n#login-input-container {\n  display: flex;\n  flex-direction: column;\n  margin: auto;\n}\n\n.login-form__input {\n  width: 300px;\n  height: 30px;\n  border: 1px solid var(--input-border-color);\n  box-sizing: border-box;\n  border-radius: 4px;\n  margin-bottom: 30px;\n}\n\n#login-confirm-button {\n  width: 300px;\n}\n\n.link-to-sign-up {\n  display: flex;\n  justify-content: flex-start;\n  margin: 10px;\n}\n\n.link-to-sign-up > p {\n  font-size: 14px;\n  margin-right: 10px;\n}\n\n#link {\n  color: #3581d7;\n}\n", "",{"version":3,"sources":["webpack://./src/css/screen/login.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,2CAA2C;EAC3C,sBAAsB;EACtB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;EACb,2BAA2B;EAC3B,YAAY;AACd;;AAEA;EACE,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,cAAc;AAChB","sourcesContent":["#login-form {\n  display: flex;\n  flex-direction: column;\n}\n\n#login-input-container {\n  display: flex;\n  flex-direction: column;\n  margin: auto;\n}\n\n.login-form__input {\n  width: 300px;\n  height: 30px;\n  border: 1px solid var(--input-border-color);\n  box-sizing: border-box;\n  border-radius: 4px;\n  margin-bottom: 30px;\n}\n\n#login-confirm-button {\n  width: 300px;\n}\n\n.link-to-sign-up {\n  display: flex;\n  justify-content: flex-start;\n  margin: 10px;\n}\n\n.link-to-sign-up > p {\n  font-size: 14px;\n  margin-right: 10px;\n}\n\n#link {\n  color: #3581d7;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/screen/moneyCharge.css":
/*!******************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/screen/moneyCharge.css ***!
  \******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".app__main .input-form__input {\n  width: 300px;\n  height: 100%;\n  border: 1px solid var(--input-border-color);\n  box-sizing: border-box;\n  border-radius: 4px;\n  margin: 4px 0px;\n}\n\n.app__main .product-table.coin-table {\n  width: 45%;\n  margin: 0 auto;\n  border-collapse: collapse;\n}\n", "",{"version":3,"sources":["webpack://./src/css/screen/moneyCharge.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,YAAY;EACZ,2CAA2C;EAC3C,sBAAsB;EACtB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,UAAU;EACV,cAAc;EACd,yBAAyB;AAC3B","sourcesContent":[".app__main .input-form__input {\n  width: 300px;\n  height: 100%;\n  border: 1px solid var(--input-border-color);\n  box-sizing: border-box;\n  border-radius: 4px;\n  margin: 4px 0px;\n}\n\n.app__main .product-table.coin-table {\n  width: 45%;\n  margin: 0 auto;\n  border-collapse: collapse;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/screen/productManage.css":
/*!********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/screen/productManage.css ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".app__main {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 52px;\n}\n\n.input-container {\n  height: 36px;\n}\n\n.input-descripton {\n  font-weight: 400;\n  font-size: 15px;\n}\n\n.input-form {\n  width: fit-content;\n}\n\n.app__main.manage .input-form__input {\n  width: 120px;\n  height: 100%;\n  border: 1px solid var(--input-border-color);\n  box-sizing: border-box;\n  border-radius: 4px;\n  margin: 4px 0px;\n}\n\n.input-form__submit-button {\n  padding: 6px 6px 6px 8px;\n  width: 56px;\n  height: 100%;\n  background: var(--submit-button-color);\n  color: var(--submit-button-font-color);\n  margin: 0px 10px;\n}\n\n.input-form__submit-button:hover {\n  background-color: var(--submit-button-color);\n  opacity: 0.7;\n}\n\n.table-wrap {\n  width: 100%;\n  margin-top: 48px;\n}\n\n.table-wrap__title {\n  text-align: center;\n  margin-bottom: 16px;\n  font-weight: 600;\n  font-size: 20px;\n  line-height: 24px;\n  letter-spacing: 0.15px;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.app__main.manage .product-table,\n.app__main.buy .product-table {\n  width: 80%;\n  margin: 0 auto;\n  border-collapse: collapse;\n}\n\n.product-table thead td {\n  border-top: 1px solid var(--product-border-color);\n  font-weight: 600;\n}\n\n.product-table tbody td {\n  font-weight: 400;\n}\n\n.product-table td {\n  width: 25%;\n  text-align: center;\n  padding: 8px 0;\n  border-bottom: 1px solid var(--product-border-color);\n  font-size: 15px;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n}\n\n.product-info__input input {\n  width: 80%;\n  padding: 5px 0;\n  border: 1px solid var(--input-border-color);\n  border-radius: 4px;\n  text-align: center;\n}\n\n.product-info .button {\n  height: 32px;\n  background-color: var(--tab-background-color);\n}\n\n.modify-button,\n.delete-button {\n  display: inline-block;\n  width: 50px;\n}\n\n.confirm-button,\n.return-button,\n.buy-button {\n  width: 100px;\n  margin: 0 auto;\n}\n\n.product-info .product-info__input,\n.product-info.modify .product-info__text,\n.product-info .confirm-button,\n.product-info.modify .modify-button,\n.product-info.modify .delete-button {\n  display: none;\n}\n\n.product-info.modify .confirm-button {\n  display: block;\n}\n\n.product-info.modify .product-info__input {\n  display: table-cell;\n}\n", "",{"version":3,"sources":["webpack://./src/css/screen/productManage.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,2CAA2C;EAC3C,sBAAsB;EACtB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,wBAAwB;EACxB,WAAW;EACX,YAAY;EACZ,sCAAsC;EACtC,sCAAsC;EACtC,gBAAgB;AAClB;;AAEA;EACE,4CAA4C;EAC5C,YAAY;AACd;;AAEA;EACE,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,gBAAgB;EAChB,eAAe;EACf,iBAAiB;EACjB,sBAAsB;EACtB,0BAA0B;AAC5B;;AAEA;;EAEE,UAAU;EACV,cAAc;EACd,yBAAyB;AAC3B;;AAEA;EACE,iDAAiD;EACjD,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,UAAU;EACV,kBAAkB;EAClB,cAAc;EACd,oDAAoD;EACpD,eAAe;EACf,iBAAiB;EACjB,qBAAqB;AACvB;;AAEA;EACE,UAAU;EACV,cAAc;EACd,2CAA2C;EAC3C,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,6CAA6C;AAC/C;;AAEA;;EAEE,qBAAqB;EACrB,WAAW;AACb;;AAEA;;;EAGE,YAAY;EACZ,cAAc;AAChB;;AAEA;;;;;EAKE,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,mBAAmB;AACrB","sourcesContent":[".app__main {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 52px;\n}\n\n.input-container {\n  height: 36px;\n}\n\n.input-descripton {\n  font-weight: 400;\n  font-size: 15px;\n}\n\n.input-form {\n  width: fit-content;\n}\n\n.app__main.manage .input-form__input {\n  width: 120px;\n  height: 100%;\n  border: 1px solid var(--input-border-color);\n  box-sizing: border-box;\n  border-radius: 4px;\n  margin: 4px 0px;\n}\n\n.input-form__submit-button {\n  padding: 6px 6px 6px 8px;\n  width: 56px;\n  height: 100%;\n  background: var(--submit-button-color);\n  color: var(--submit-button-font-color);\n  margin: 0px 10px;\n}\n\n.input-form__submit-button:hover {\n  background-color: var(--submit-button-color);\n  opacity: 0.7;\n}\n\n.table-wrap {\n  width: 100%;\n  margin-top: 48px;\n}\n\n.table-wrap__title {\n  text-align: center;\n  margin-bottom: 16px;\n  font-weight: 600;\n  font-size: 20px;\n  line-height: 24px;\n  letter-spacing: 0.15px;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.app__main.manage .product-table,\n.app__main.buy .product-table {\n  width: 80%;\n  margin: 0 auto;\n  border-collapse: collapse;\n}\n\n.product-table thead td {\n  border-top: 1px solid var(--product-border-color);\n  font-weight: 600;\n}\n\n.product-table tbody td {\n  font-weight: 400;\n}\n\n.product-table td {\n  width: 25%;\n  text-align: center;\n  padding: 8px 0;\n  border-bottom: 1px solid var(--product-border-color);\n  font-size: 15px;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n}\n\n.product-info__input input {\n  width: 80%;\n  padding: 5px 0;\n  border: 1px solid var(--input-border-color);\n  border-radius: 4px;\n  text-align: center;\n}\n\n.product-info .button {\n  height: 32px;\n  background-color: var(--tab-background-color);\n}\n\n.modify-button,\n.delete-button {\n  display: inline-block;\n  width: 50px;\n}\n\n.confirm-button,\n.return-button,\n.buy-button {\n  width: 100px;\n  margin: 0 auto;\n}\n\n.product-info .product-info__input,\n.product-info.modify .product-info__text,\n.product-info .confirm-button,\n.product-info.modify .modify-button,\n.product-info.modify .delete-button {\n  display: none;\n}\n\n.product-info.modify .confirm-button {\n  display: block;\n}\n\n.product-info.modify .product-info__input {\n  display: table-cell;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/screen/signUp.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/screen/signUp.css ***!
  \*************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#signup-form {\n  display: flex;\n  flex-direction: column;\n}\n\n#signup-input-container {\n  display: flex;\n  flex-direction: column;\n  margin: auto;\n}\n\n.signup-form__input {\n  width: 300px;\n  height: 30px;\n  border: 1px solid var(--input-border-color);\n  box-sizing: border-box;\n  border-radius: 4px;\n  margin-bottom: 30px;\n}\n\n#signup-confirm-button {\n  width: 300px;\n}\n", "",{"version":3,"sources":["webpack://./src/css/screen/signUp.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,2CAA2C;EAC3C,sBAAsB;EACtB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,YAAY;AACd","sourcesContent":["#signup-form {\n  display: flex;\n  flex-direction: column;\n}\n\n#signup-input-container {\n  display: flex;\n  flex-direction: column;\n  margin: auto;\n}\n\n.signup-form__input {\n  width: 300px;\n  height: 30px;\n  border: 1px solid var(--input-border-color);\n  box-sizing: border-box;\n  border-radius: 4px;\n  margin-bottom: 30px;\n}\n\n#signup-confirm-button {\n  width: 300px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/css/index.css":
/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ts_controllers_VendingMachine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ts/controllers/VendingMachine */ "./src/ts/controllers/VendingMachine.js");
/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/index.css */ "./src/css/index.css");


new _ts_controllers_VendingMachine__WEBPACK_IMPORTED_MODULE_0__["default"]().handlePopstate();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map