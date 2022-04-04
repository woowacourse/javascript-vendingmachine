/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/constants/index.js":
/*!***********************************!*\
  !*** ./src/ts/constants/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {



exports.__esModule = true;
exports.ALERT_MESSAGE = exports.INPUT_MONEY_RULES = exports.COINS = exports.PRODUCT_RULES = void 0;
exports.PRODUCT_RULES = {
  MAX_NAME_LENGTH: 10,
  MIN_NAME_LENGTH: 1,
  MAX_PRICE: 10000,
  MIN_PRICE: 100,
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 20,
  PRICE_MOD_UNIT: 10
};
exports.COINS = {
  VAULE_10: 10,
  VAULE_50: 50,
  VAULE_100: 100,
  VAULE_500: 500
};
exports.INPUT_MONEY_RULES = {
  MIN: 1000,
  MAX: 100000,
  MOD_UNIT: 10
};
exports.ALERT_MESSAGE = {
  PRODUCT_NAME_LENGTH: "\uC0C1\uD488\uBA85\uC740 ".concat(exports.PRODUCT_RULES.MIN_NAME_LENGTH, "\uAE00\uC790\uBD80\uD130 ").concat(exports.PRODUCT_RULES.MAX_NAME_LENGTH, "\uAE00\uC790\uAE4C\uC9C0\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4."),
  PRODUCT_NAME_UNIQUE: "\uC0C1\uD488\uBA85\uC740 \uC911\uBCF5\uB418\uC9C0 \uC54A\uC544\uC57C\uD569\uB2C8\uB2E4.",
  PRODUCT_PRICE: "\uC0C1\uD488\uAC00\uACA9\uC740 ".concat(exports.PRODUCT_RULES.PRICE_MOD_UNIT, "\uC73C\uB85C \uB098\uB204\uC5B4 \uB5A8\uC5B4\uC838\uC57C\uD558\uBA70, ").concat(exports.PRODUCT_RULES.MIN_PRICE, "~").concat(exports.PRODUCT_RULES.MAX_PRICE, "\uAE4C\uC9C0\uC758 \uAC12\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4."),
  PRODUCT_QUANTITY: "\uC0C1\uD488\uC218\uB7C9\uC740 ".concat(exports.PRODUCT_RULES.MIN_QUANTITY, "~").concat(exports.PRODUCT_RULES.MAX_QUANTITY, "\uC758 \uAC12\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4."),
  INPUT_MONEY: "\uD22C\uC785\uAE08\uC561\uC740 ".concat(exports.INPUT_MONEY_RULES.MOD_UNIT, "\uC73C\uB85C \uB098\uB204\uC5B4 \uB5A8\uC5B4\uC838\uC57C\uD558\uBA70, \uCD5C\uC18C ").concat(exports.INPUT_MONEY_RULES.MIN, " \uAC12 \uC774\uC0C1\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4."),
  INPUT_MONEY_MAX: "\uD22C\uC785\uAE08\uC561\uACFC \uC790\uD310\uAE30 \uBCF4\uC720\uAE08\uC561\uC758 \uD569\uC774 ".concat(exports.INPUT_MONEY_RULES.MAX, "\uB97C \uCD08\uACFC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.")
};

/***/ }),

/***/ "./src/ts/core/ChargeMoneyImpl.js":
/*!****************************************!*\
  !*** ./src/ts/core/ChargeMoneyImpl.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;

var dom_1 = __webpack_require__(/*! ../util/dom */ "./src/ts/util/dom.js");

var isValidMoney_1 = __webpack_require__(/*! ../validation/isValidMoney */ "./src/ts/validation/isValidMoney.js");

var ChargeMoneyImpl =
/** @class */
function () {
  function ChargeMoneyImpl(coins) {
    var _this = this;

    this.coins = coins;
    window.addEventListener('load', function () {
      (0, dom_1.$)('#charge-money-form').addEventListener('submit', _this.handleChargeMoney.bind(_this));
    });
  }

  ChargeMoneyImpl.prototype.handleChargeMoney = function (e) {
    e.preventDefault();
    var inputMoney = Number((0, dom_1.$)('#charge-money-input').value);

    if ((0, isValidMoney_1.isValidMoney)(inputMoney, this.coins)) {
      var coinList = this.generateRandomCoins(inputMoney);
      this.chargeMoney(coinList);
      this.drawCoins();
    }
  };

  ChargeMoneyImpl.prototype.chargeMoney = function (coinList) {
    this.coins.forEach(function (coin, index) {
      return coin.count += coinList[index];
    });
  };

  ChargeMoneyImpl.prototype.generateRandomCoins = function (inputMoney) {
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

  ChargeMoneyImpl.prototype.drawCoins = function () {
    this.coins.forEach(function (_a) {
      var amount = _a.amount,
          count = _a.count;
      (0, dom_1.$)("#coin-".concat(amount, "-count")).innerText = "".concat(count, "\uAC1C");
    });
  };

  return ChargeMoneyImpl;
}();

exports["default"] = ChargeMoneyImpl;

/***/ }),

/***/ "./src/ts/core/ProductManageImpl.js":
/*!******************************************!*\
  !*** ./src/ts/core/ProductManageImpl.js ***!
  \******************************************/
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

var dom_1 = __webpack_require__(/*! ../util/dom */ "./src/ts/util/dom.js");

var isValidProductInfo_1 = __webpack_require__(/*! ../validation/isValidProductInfo */ "./src/ts/validation/isValidProductInfo.js");

var ProductManageImpl =
/** @class */
function () {
  function ProductManageImpl(products) {
    var _this = this;

    this.products = products;
    window.addEventListener('load', function () {
      (0, dom_1.$)('#add-product-form').addEventListener('submit', _this.handleAddProduct.bind(_this));
      (0, dom_1.$)('#product-list').addEventListener('click', _this.handleClickButtons.bind(_this));
    });
  }

  ProductManageImpl.prototype.getProductInfo = function () {
    var name = (0, dom_1.$)('#product-name-input').value;
    var price = Number((0, dom_1.$)('#product-price-input').value);
    var quantity = Number((0, dom_1.$)('#product-quantity-input').value);
    return {
      name: name,
      price: price,
      quantity: quantity
    };
  };

  ProductManageImpl.prototype.getProductInfoModify = function (productNode) {
    var name = (0, dom_1.$)('.product-info-name', productNode).value;
    var price = Number((0, dom_1.$)('.product-info-price', productNode).value);
    var quantity = Number((0, dom_1.$)('.product-info-quantity', productNode).value);
    return {
      name: name,
      price: price,
      quantity: quantity
    };
  };

  ProductManageImpl.prototype.handleAddProduct = function (e) {
    e.preventDefault();
    var productInfo = this.getProductInfo();

    if ((0, isValidProductInfo_1.isValidProductInfo)(productInfo, -1, this.products)) {
      this.addProduct(productInfo);
      this.drawProductList();
    }
  };

  ProductManageImpl.prototype.getProductRowIndex = function (productRow) {
    return __spreadArray([], (0, dom_1.$)('#product-list').childNodes, true).findIndex(function (row) {
      return row === productRow;
    });
  };

  ProductManageImpl.prototype.handleClickButtons = function (e) {
    if (e.target.classList.contains('modify-button')) {
      e.target.closest('tr').classList.add('modify');
    }

    if (e.target.classList.contains('delete-button') && confirm('정말 삭제하시겠습니까?')) {
      this.deleteProduct(e.target.closest('tr').children[0].innerText);
      this.drawProductList();
    }

    if (e.target.classList.contains('confirm-button')) {
      var productInfo = this.getProductInfoModify(e.target.closest('tr'));
      var index = this.getProductRowIndex(e.target.closest('tr'));

      if ((0, isValidProductInfo_1.isValidProductInfo)(productInfo, index, this.products)) {
        this.modifyProduct(productInfo, index);
        this.drawProductList();
      }
    }
  };

  ProductManageImpl.prototype.drawProductList = function () {
    var template = this.products.map(function (_a) {
      var name = _a.name,
          price = _a.price,
          quantity = _a.quantity;
      return "<tr class=\"product-info\">\n          <td class=\"product-info__text\">".concat(name, "</td>\n          <td class=\"product-info__text\">").concat(price, "</td>\n          <td class=\"product-info__text\">").concat(quantity, "</td>\n          <td class=\"product-info__input\"><input type=\"text\" minlength=\"1\" maxlength=\"10\" required=\"required\" class=\"product-info-name\" value=\"").concat(name, "\" /></td>\n          <td class=\"product-info__input\"><input type=\"number\" max=\"10000\" min=\"100\" required=\"required\" class=\"product-info-price\" value=\"").concat(price, "\" /></td>\n          <td class=\"product-info__input\"><input type=\"number\" max=\"20\" min=\"1\" required=\"required\" class=\"product-info-quantity\" value=\"").concat(quantity, "\" /></td>\n          <td>\n            <button class=\"modify-button button\">\uC218\uC815</button>\n            <button class=\"delete-button button\">\uC0AD\uC81C</button>\n            <button class=\"confirm-button button\">\uD655\uC778</button>\n          </td>\n        </tr>");
    }).join('');
    (0, dom_1.$)('#product-list').replaceChildren();
    (0, dom_1.$)('#product-list').insertAdjacentHTML('beforeend', template);
  };

  ProductManageImpl.prototype.addProduct = function (productInfo) {
    this.products.push(productInfo);
  };

  ProductManageImpl.prototype.modifyProduct = function (productInfo, index) {
    this.products[index] = productInfo;
  };

  ProductManageImpl.prototype.deleteProduct = function (name) {
    if (this.products.splice(this.getProductIndex(name), 1).length === 0) {
      return false;
    }

    return true;
  };

  ProductManageImpl.prototype.getProductIndex = function (name) {
    return this.products.findIndex(function (product) {
      return product.name === name;
    });
  };

  return ProductManageImpl;
}();

exports["default"] = ProductManageImpl;

/***/ }),

/***/ "./src/ts/resource/VendingMachine.js":
/*!*******************************************!*\
  !*** ./src/ts/resource/VendingMachine.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;

var ProductManageImpl_1 = __webpack_require__(/*! ../core/ProductManageImpl */ "./src/ts/core/ProductManageImpl.js");

var ChargeMoneyImpl_1 = __webpack_require__(/*! ../core/ChargeMoneyImpl */ "./src/ts/core/ChargeMoneyImpl.js");

var dom_1 = __webpack_require__(/*! ../util/dom */ "./src/ts/util/dom.js");

var index_1 = __webpack_require__(/*! ../constants/index */ "./src/ts/constants/index.js");

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
    new ProductManageImpl_1["default"](this.products);
    new ChargeMoneyImpl_1["default"](this.coins);
    (0, dom_1.$)('#tab').addEventListener('click', this.handleClickTabButtons.bind(this));
    window.addEventListener('popstate', this.handlePopstate.bind(this));
  }

  VendingMachine.prototype.handleClickTabButtons = function (e) {
    if (e.target === e.currentTarget) {
      return;
    }

    var tabName = e.target.dataset.name;
    history.pushState({}, '', window.location.pathname + "#".concat(tabName));
    this.switchTab(tabName);
  };

  VendingMachine.prototype.handlePopstate = function () {
    if (window.location.hash) {
      this.switchTab(window.location.hash.slice(1));
    }
  };

  VendingMachine.prototype.switchTab = function (tabName) {
    (0, dom_1.$)('#app').classList.remove('manage', 'charge', 'buy');
    (0, dom_1.$)('#app').classList.add(tabName);
  };

  return VendingMachine;
}();

exports["default"] = VendingMachine;

/***/ }),

/***/ "./src/ts/util/dom.js":
/*!****************************!*\
  !*** ./src/ts/util/dom.js ***!
  \****************************/
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

/***/ "./src/ts/validation/isValidMoney.js":
/*!*******************************************!*\
  !*** ./src/ts/validation/isValidMoney.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;
exports.totalAmount = exports.isValidMoney = void 0;

var constants_1 = __webpack_require__(/*! ../constants */ "./src/ts/constants/index.js");

var isValidMoney = function isValidMoney(inputMoney, coins) {
  if (inputMoney < constants_1.INPUT_MONEY_RULES.MIN || inputMoney % constants_1.INPUT_MONEY_RULES.MOD_UNIT !== 0) {
    alert(constants_1.ALERT_MESSAGE.INPUT_MONEY);
    return false;
  }

  if ((0, exports.totalAmount)(coins) + inputMoney > constants_1.INPUT_MONEY_RULES.MAX) {
    alert(constants_1.ALERT_MESSAGE.INPUT_MONEY_MAX);
    return false;
  }

  return true;
};

exports.isValidMoney = isValidMoney;

var totalAmount = function totalAmount(coins) {
  return coins.reduce(function (acc, _a) {
    var amount = _a.amount,
        count = _a.count;
    return acc + amount * count;
  }, 0);
};

exports.totalAmount = totalAmount;

/***/ }),

/***/ "./src/ts/validation/isValidProductInfo.js":
/*!*************************************************!*\
  !*** ./src/ts/validation/isValidProductInfo.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;
exports.isValidProductInfo = void 0;

var constants_1 = __webpack_require__(/*! ../constants */ "./src/ts/constants/index.js");

var isValidProductInfo = function isValidProductInfo(_a, index, products) {
  var name = _a.name,
      price = _a.price,
      quantity = _a.quantity;

  if (name.length < constants_1.PRODUCT_RULES.MIN_NAME_LENGTH || name.length > constants_1.PRODUCT_RULES.MAX_NAME_LENGTH) {
    alert(constants_1.ALERT_MESSAGE.PRODUCT_NAME_LENGTH);
    return false;
  }

  if (products.some(function (product, productIndex) {
    return productIndex !== index && product.name === name;
  })) {
    alert(constants_1.ALERT_MESSAGE.PRODUCT_NAME_UNIQUE);
    return false;
  }

  if (price < constants_1.PRODUCT_RULES.MIN_PRICE || price > constants_1.PRODUCT_RULES.MAX_PRICE || price % constants_1.PRODUCT_RULES.PRICE_MOD_UNIT !== 0) {
    alert(constants_1.ALERT_MESSAGE.PRODUCT_PRICE);
    return false;
  }

  if (quantity < constants_1.PRODUCT_RULES.MIN_QUANTITY || quantity > constants_1.PRODUCT_RULES.MAX_QUANTITY) {
    alert(constants_1.ALERT_MESSAGE.PRODUCT_QUANTITY);
    return false;
  }

  return true;
};

exports.isValidProductInfo = isValidProductInfo;

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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_screen_productManage_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./screen/productManage.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/screen/productManage.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_screen_moneyCharge_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./screen/moneyCharge.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/screen/moneyCharge.css");
// Imports






var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_component_button_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_component_color_css__WEBPACK_IMPORTED_MODULE_3__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_screen_productManage_css__WEBPACK_IMPORTED_MODULE_4__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_screen_moneyCharge_css__WEBPACK_IMPORTED_MODULE_5__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  display: flex;\n  justify-content: center;\n  margin-top: 32px;\n}\n\n.app {\n  padding-top: 44px;\n  width: 600px;\n  height: 675px;\n  border: 1px solid var(--app-border-color);\n  box-sizing: border-box;\n  border-radius: 4px;\n}\n\n.app__title {\n  text-align: center;\n  font-weight: 600;\n  font-size: 34px;\n  line-height: 36px;\n  color: #000000;\n}\n\n.tab {\n  display: flex;\n  justify-content: center;\n  margin-top: 32px;\n}\n\n.tab__item {\n  padding: 9px 20px;\n  background-color: var(--tab-background-color);\n  font-size: 16px;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n  color: var(--tab-font-color);\n}\n\n.tab__item:nth-child(2) {\n  margin: 0 4px;\n}\n\n.app.manage .tab__item[data-name=\"manage\"],\n.app.charge .tab__item[data-name=\"charge\"], \n.app.buy .tab__item[data-name=\"buy\"] {\n  background-color: var(--tab-active-background-color);\n}\n\n.app .app__main {\n  display: none;\n}\n\n.app.manage .app__main.manage,\n.app.charge .app__main.charge, \n.app.buy .app__main.buy {\n  display: flex;\n}\n", "",{"version":3,"sources":["webpack://./src/css/index.css"],"names":[],"mappings":"AAMA;EACE,aAAa;EACb,uBAAuB;EACvB,gBAAgB;AAClB;;AAEA;EACE,iBAAiB;EACjB,YAAY;EACZ,aAAa;EACb,yCAAyC;EACzC,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,eAAe;EACf,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,gBAAgB;AAClB;;AAEA;EACE,iBAAiB;EACjB,6CAA6C;EAC7C,eAAe;EACf,iBAAiB;EACjB,qBAAqB;EACrB,4BAA4B;AAC9B;;AAEA;EACE,aAAa;AACf;;AAEA;;;EAGE,oDAAoD;AACtD;;AAEA;EACE,aAAa;AACf;;AAEA;;;EAGE,aAAa;AACf","sourcesContent":["@import './component/button.css';\n@import './component/color.css';\n\n@import './screen/productManage.css';\n@import './screen/moneyCharge.css';\n\nbody {\n  display: flex;\n  justify-content: center;\n  margin-top: 32px;\n}\n\n.app {\n  padding-top: 44px;\n  width: 600px;\n  height: 675px;\n  border: 1px solid var(--app-border-color);\n  box-sizing: border-box;\n  border-radius: 4px;\n}\n\n.app__title {\n  text-align: center;\n  font-weight: 600;\n  font-size: 34px;\n  line-height: 36px;\n  color: #000000;\n}\n\n.tab {\n  display: flex;\n  justify-content: center;\n  margin-top: 32px;\n}\n\n.tab__item {\n  padding: 9px 20px;\n  background-color: var(--tab-background-color);\n  font-size: 16px;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n  color: var(--tab-font-color);\n}\n\n.tab__item:nth-child(2) {\n  margin: 0 4px;\n}\n\n.app.manage .tab__item[data-name=\"manage\"],\n.app.charge .tab__item[data-name=\"charge\"], \n.app.buy .tab__item[data-name=\"buy\"] {\n  background-color: var(--tab-active-background-color);\n}\n\n.app .app__main {\n  display: none;\n}\n\n.app.manage .app__main.manage,\n.app.charge .app__main.charge, \n.app.buy .app__main.buy {\n  display: flex;\n}\n"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, ".app__main.charge .input-form__input {\n  width:  300px;\n  height: 100%;\n  border: 1px solid var(--input-border-color);\n  box-sizing: border-box;\n  border-radius: 4px;\n  margin: 4px 0px;\n}\n\n.app__main.charge .product-table {\n  width: 45%;\n  margin: 0 auto;\n  border-collapse: collapse;\n}", "",{"version":3,"sources":["webpack://./src/css/screen/moneyCharge.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,YAAY;EACZ,2CAA2C;EAC3C,sBAAsB;EACtB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,UAAU;EACV,cAAc;EACd,yBAAyB;AAC3B","sourcesContent":[".app__main.charge .input-form__input {\n  width:  300px;\n  height: 100%;\n  border: 1px solid var(--input-border-color);\n  box-sizing: border-box;\n  border-radius: 4px;\n  margin: 4px 0px;\n}\n\n.app__main.charge .product-table {\n  width: 45%;\n  margin: 0 auto;\n  border-collapse: collapse;\n}"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, ".app__main {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 52px;\n}\n\n.input-container {\n  height: 36px;\n}\n\n.input-descripton {\n  font-weight: 400;\n  font-size: 15px;\n}\n\n.input-form {\n  width: fit-content;\n}\n\n.app__main.manage .input-form__input {\n  width: 120px;\n  height: 100%;\n  border: 1px solid var(--input-border-color);\n  box-sizing: border-box;\n  border-radius: 4px;\n  margin: 4px 0px;\n}\n\n.input-form__submit-button {\n  padding: 6px 6px 6px 8px; \n  width: 56px;\n  height: 100%;\n  background: var(--submit-button-color);\n  color: var(--submit-button-font-color);\n  margin: 0px 10px;\n}\n\n.input-form__submit-button:hover {\n  background-color: var(--submit-button-color);\n  opacity: 0.7;\n}\n\n.table-wrap {\n  width: 100%;\n  margin-top: 48px;\n}\n\n.table-wrap__title {\n  text-align: center;\n  margin-bottom: 16px;\n  font-weight: 600;\n  font-size: 20px;\n  line-height: 24px;\n  letter-spacing: 0.15px;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.app__main.manage .product-table {\n  width: 80%;\n  margin: 0 auto;\n  border-collapse: collapse;\n}\n\n.product-table thead td {\n  border-top: 1px solid var(--product-border-color);\n  font-weight: 600;\n}\n\n.product-table tbody td {\n  font-weight: 400;\n}\n\n.product-table td {\n  width: 25%;\n  text-align: center;\n  padding: 8px 0;\n  border-bottom: 1px solid var(--product-border-color);\n  font-size: 15px;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n}\n\n.product-info__input input {\n  width: 80%;\n  padding: 5px 0;\n  border: 1px solid var(--input-border-color);\n  border-radius: 4px;\n  text-align: center;\n}\n\n.product-info .button {\n  height: 32px;\n  background-color: var(--tab-background-color);\n}\n\n.modify-button, \n.delete-button {\n  display: inline-block;\n  width: 50px;\n}\n\n.confirm-button {\n  width: 100px;\n  margin: 0 auto;\n}\n\n.product-info .product-info__input,\n.product-info.modify .product-info__text,\n.product-info .confirm-button,\n.product-info.modify .modify-button,\n.product-info.modify .delete-button {\n  display: none; \n}\n\n.product-info.modify .confirm-button {\n  display: block;\n}\n\n.product-info.modify .product-info__input {\n  display: table-cell;\n}", "",{"version":3,"sources":["webpack://./src/css/screen/productManage.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,2CAA2C;EAC3C,sBAAsB;EACtB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,wBAAwB;EACxB,WAAW;EACX,YAAY;EACZ,sCAAsC;EACtC,sCAAsC;EACtC,gBAAgB;AAClB;;AAEA;EACE,4CAA4C;EAC5C,YAAY;AACd;;AAEA;EACE,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,gBAAgB;EAChB,eAAe;EACf,iBAAiB;EACjB,sBAAsB;EACtB,0BAA0B;AAC5B;;AAEA;EACE,UAAU;EACV,cAAc;EACd,yBAAyB;AAC3B;;AAEA;EACE,iDAAiD;EACjD,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,UAAU;EACV,kBAAkB;EAClB,cAAc;EACd,oDAAoD;EACpD,eAAe;EACf,iBAAiB;EACjB,qBAAqB;AACvB;;AAEA;EACE,UAAU;EACV,cAAc;EACd,2CAA2C;EAC3C,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,6CAA6C;AAC/C;;AAEA;;EAEE,qBAAqB;EACrB,WAAW;AACb;;AAEA;EACE,YAAY;EACZ,cAAc;AAChB;;AAEA;;;;;EAKE,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,mBAAmB;AACrB","sourcesContent":[".app__main {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 52px;\n}\n\n.input-container {\n  height: 36px;\n}\n\n.input-descripton {\n  font-weight: 400;\n  font-size: 15px;\n}\n\n.input-form {\n  width: fit-content;\n}\n\n.app__main.manage .input-form__input {\n  width: 120px;\n  height: 100%;\n  border: 1px solid var(--input-border-color);\n  box-sizing: border-box;\n  border-radius: 4px;\n  margin: 4px 0px;\n}\n\n.input-form__submit-button {\n  padding: 6px 6px 6px 8px; \n  width: 56px;\n  height: 100%;\n  background: var(--submit-button-color);\n  color: var(--submit-button-font-color);\n  margin: 0px 10px;\n}\n\n.input-form__submit-button:hover {\n  background-color: var(--submit-button-color);\n  opacity: 0.7;\n}\n\n.table-wrap {\n  width: 100%;\n  margin-top: 48px;\n}\n\n.table-wrap__title {\n  text-align: center;\n  margin-bottom: 16px;\n  font-weight: 600;\n  font-size: 20px;\n  line-height: 24px;\n  letter-spacing: 0.15px;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.app__main.manage .product-table {\n  width: 80%;\n  margin: 0 auto;\n  border-collapse: collapse;\n}\n\n.product-table thead td {\n  border-top: 1px solid var(--product-border-color);\n  font-weight: 600;\n}\n\n.product-table tbody td {\n  font-weight: 400;\n}\n\n.product-table td {\n  width: 25%;\n  text-align: center;\n  padding: 8px 0;\n  border-bottom: 1px solid var(--product-border-color);\n  font-size: 15px;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n}\n\n.product-info__input input {\n  width: 80%;\n  padding: 5px 0;\n  border: 1px solid var(--input-border-color);\n  border-radius: 4px;\n  text-align: center;\n}\n\n.product-info .button {\n  height: 32px;\n  background-color: var(--tab-background-color);\n}\n\n.modify-button, \n.delete-button {\n  display: inline-block;\n  width: 50px;\n}\n\n.confirm-button {\n  width: 100px;\n  margin: 0 auto;\n}\n\n.product-info .product-info__input,\n.product-info.modify .product-info__text,\n.product-info .confirm-button,\n.product-info.modify .modify-button,\n.product-info.modify .delete-button {\n  display: none; \n}\n\n.product-info.modify .confirm-button {\n  display: block;\n}\n\n.product-info.modify .product-info__input {\n  display: table-cell;\n}"],"sourceRoot":""}]);
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
/* harmony import */ var _ts_resource_VendingMachine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ts/resource/VendingMachine */ "./src/ts/resource/VendingMachine.js");
/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/index.css */ "./src/css/index.css");


new _ts_resource_VendingMachine__WEBPACK_IMPORTED_MODULE_0__["default"]().handlePopstate();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map