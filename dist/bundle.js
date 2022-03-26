/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Controller.js":
/*!******************************!*\
  !*** ./src/js/Controller.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Controller)
/* harmony export */ });
/* harmony import */ var _constants_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/constants.js */ "./src/js/constants/constants.js");
/* harmony import */ var _utils_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/event.js */ "./src/js/utils/event.js");
/* harmony import */ var _views_menuCategoryView_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views/menuCategoryView.js */ "./src/js/views/menuCategoryView.js");
/* harmony import */ var _models_Coin_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/Coin.ts */ "./src/js/models/Coin.ts");
/* harmony import */ var _models_ProductManger_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models/ProductManger.ts */ "./src/js/models/ProductManger.ts");
/* harmony import */ var _views_ChargeView_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/ChargeView.js */ "./src/js/views/ChargeView.js");
/* harmony import */ var _views_ProductManageView_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./views/ProductManageView.js */ "./src/js/views/ProductManageView.js");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }









var _renderSavedData = /*#__PURE__*/new WeakSet();

var _handleProductInfo = /*#__PURE__*/new WeakSet();

var _modifySavedData = /*#__PURE__*/new WeakSet();

var _deleteSavedData = /*#__PURE__*/new WeakSet();

var _handleChargeCoin = /*#__PURE__*/new WeakSet();

var Controller = /*#__PURE__*/_createClass(function Controller() {
  _classCallCheck(this, Controller);

  _classPrivateMethodInitSpec(this, _handleChargeCoin);

  _classPrivateMethodInitSpec(this, _deleteSavedData);

  _classPrivateMethodInitSpec(this, _modifySavedData);

  _classPrivateMethodInitSpec(this, _handleProductInfo);

  _classPrivateMethodInitSpec(this, _renderSavedData);

  this.productManager = new _models_ProductManger_ts__WEBPACK_IMPORTED_MODULE_4__["default"]();
  this.productManageView = new _views_ProductManageView_js__WEBPACK_IMPORTED_MODULE_6__["default"]();
  this.chargeView = new _views_ChargeView_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
  this.coin = new _models_Coin_ts__WEBPACK_IMPORTED_MODULE_3__["default"]();
  (0,_utils_event_js__WEBPACK_IMPORTED_MODULE_1__.on)(_constants_constants_js__WEBPACK_IMPORTED_MODULE_0__.SECTION_CONTAINER, '@render', _classPrivateMethodGet(this, _renderSavedData, _renderSavedData2).bind(this));
  (0,_utils_event_js__WEBPACK_IMPORTED_MODULE_1__.on)(_constants_constants_js__WEBPACK_IMPORTED_MODULE_0__.SECTION_CONTAINER, '@manage', _classPrivateMethodGet(this, _handleProductInfo, _handleProductInfo2).bind(this));
  (0,_utils_event_js__WEBPACK_IMPORTED_MODULE_1__.on)(_constants_constants_js__WEBPACK_IMPORTED_MODULE_0__.SECTION_CONTAINER, '@modify', _classPrivateMethodGet(this, _modifySavedData, _modifySavedData2).bind(this));
  (0,_utils_event_js__WEBPACK_IMPORTED_MODULE_1__.on)(_constants_constants_js__WEBPACK_IMPORTED_MODULE_0__.SECTION_CONTAINER, '@delete', _classPrivateMethodGet(this, _deleteSavedData, _deleteSavedData2).bind(this));
  (0,_utils_event_js__WEBPACK_IMPORTED_MODULE_1__.on)(_constants_constants_js__WEBPACK_IMPORTED_MODULE_0__.SECTION_CONTAINER, '@charge', _classPrivateMethodGet(this, _handleChargeCoin, _handleChargeCoin2).bind(this));
});

function _renderSavedData2(e) {
  var hash = e.detail.hash;
  (0,_views_menuCategoryView_js__WEBPACK_IMPORTED_MODULE_2__.initHashContents)(hash);

  if (hash === '#!manage') {
    this.productManageView.initManageDOM();
    var savedProductList = this.productManager.getProducts();

    if (savedProductList.length !== 0) {
      this.productManageView.render(savedProductList);
    }

    return;
  }

  if (hash === '#!charge') {
    this.chargeView.initChargeDOM();
    this.chargeView.renderCurrentAmount(this.coin.getAmount());
    this.chargeView.renderHaveCoins(this.coin.getCoins());
  }
}

function _handleProductInfo2(e) {
  try {
    var product = e.detail.product;
    this.productManager.addProduct(product);
    this.productManageView.render(product);
    this.productManageView.resetProductInput();
  } catch (error) {
    alert(error.message);
  }
}

function _modifySavedData2(e) {
  try {
    var _e$detail = e.detail,
        index = _e$detail.index,
        product = _e$detail.product;
    this.productManager.modifyProduct(index, product);
    this.productManageView.renderModifiedProduct(index, product);
  } catch (error) {
    alert(error.message);
  }
}

function _deleteSavedData2(e) {
  var index = e.detail.index;
  this.productManager.deleteProduct(index);
}

function _handleChargeCoin2(e) {
  try {
    var amount = e.detail.amount;
    this.coin.setAmount(amount);
    this.chargeView.renderCurrentAmount(this.coin.getAmount());
    this.chargeView.resetChargeInput();
    this.chargeView.renderHaveCoins(this.coin.getCoins());
  } catch (error) {
    alert(error.message);
  }
}



/***/ }),

/***/ "./src/js/constants/constants.js":
/*!***************************************!*\
  !*** ./src/js/constants/constants.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SECTION_CONTAINER": () => (/* binding */ SECTION_CONTAINER),
/* harmony export */   "PRODUCT": () => (/* binding */ PRODUCT),
/* harmony export */   "COIN": () => (/* binding */ COIN),
/* harmony export */   "CONFIRM_DELETE_MESSAGE": () => (/* binding */ CONFIRM_DELETE_MESSAGE),
/* harmony export */   "ERROR_MESSAGE": () => (/* binding */ ERROR_MESSAGE)
/* harmony export */ });
/* harmony import */ var _utils_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom.js */ "./src/js/utils/dom.js");

var SECTION_CONTAINER = (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_0__.$)('#section-container');
var PRODUCT = {
  MAX_LENGTH: 10,
  PRICE_UNIT: 10,
  PRICE_RANGE: {
    MIN: 100,
    MAX: 10000
  },
  QUANTITY_RANGE: {
    MIN: 1,
    MAX: 20
  }
};
var COIN = {
  UNIT_LIST: [500, 100, 50, 10],
  MIN_UNIT: 10,
  MAX_AMOUNT: 100000
};
var CONFIRM_DELETE_MESSAGE = '상품을 삭제하시겠습니까?';
var ERROR_MESSAGE = {
  EMPTY_NAME: '상품명을 입력해 주세요.',
  EMPTY_PRICE: '상품가격을 입력해 주세요.',
  EMPTY_QUANTITY: '상품수량을 입력해 주세요.',
  OVER_MAX_LENGTH: '상품명은 10글자 이하로 입력해 주세요.',
  NOT_DIVIDE_NUMBER: '10원 단위로 입력해 주세요.',
  OUT_OF_PRICE_RANGE: '상품 가격은 100원 이상 10000원 이하로 입력해 주세요.',
  OUT_OF_QUANTITY_RANGE: '상품 수량은 1개 이상 20개 이하로 입력해 주세요.',
  DUPLICATE_PRODUCT: '중복된 상품 입니다. 다른 상품을 입력해 주세요.',
  OVER_MAX_AMOUNT: '최대 보유 금액은 100,000원 을 넘을 수 없습니다.'
};

/***/ }),

/***/ "./src/js/route/route.js":
/*!*******************************!*\
  !*** ./src/js/route/route.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/event.js */ "./src/js/utils/event.js");
/* harmony import */ var _constants_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/constants.js */ "./src/js/constants/constants.js");



var render = function render() {
  var hash = window.location.hash;
  (0,_utils_event_js__WEBPACK_IMPORTED_MODULE_0__.emit)(_constants_constants_js__WEBPACK_IMPORTED_MODULE_1__.SECTION_CONTAINER, '@render', {
    hash: hash
  });
};

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);

/***/ }),

/***/ "./src/js/templates/templates.js":
/*!***************************************!*\
  !*** ./src/js/templates/templates.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CATEGORY_TEMPLATE": () => (/* binding */ CATEGORY_TEMPLATE),
/* harmony export */   "tableTemplate": () => (/* binding */ tableTemplate),
/* harmony export */   "tableInputTemplate": () => (/* binding */ tableInputTemplate)
/* harmony export */ });
var CATEGORY_TEMPLATE = {
  MANAGE: "\n    <h2 hidden>\uC0C1\uD488 \uAD00\uB9AC</h2>\n    <form id=\"product-add-form\">\n      <label>\uCD94\uAC00\uD560 \uC0C1\uD488 \uC815\uBCF4\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.</label>\n      <div class=\"form-input product-manage-input-width\">\n        <input\n          id=\"product-name-input\"\n          type=\"text\"\n          placeholder=\"\uC0C1\uD488\uBA85\"\n          maxlength=\"10\"\n          required\n          aria-labelledby=\"product-information\"\n        />\n        <input\n          id=\"product-price-input\"\n          type=\"number\"\n          placeholder=\"\uAC00\uACA9\"\n          min=\"100\"\n          max=\"10000\"\n          required\n          aria-labelledby=\"product-information\"\n        />\n        <input\n          id=\"product-quantity-input\"\n          type=\"number\"\n          placeholder=\"\uC218\uB7C9\"\n          min=\"1\"\n          max=\"20\"\n          required\n          aria-labelledby=\"product-information\"\n        />\n        <button class=\"hover-button\">\uCD94\uAC00</button>\n      </div>\n    </form>\n    <table class=\"table\">\n      <caption class=\"caption\">\n        \uC0C1\uD488 \uD604\uD669\n      </caption>\n      <colgroup>\n        <col>\n        <col width=\"24%\">\n        <col width=\"24%\">\n        <col width=\"24%\">\n      </colgroup>\n      <thead></thead>\n        <tr>\n          <th>\uC0C1\uD488\uBA85</th>\n          <th>\uAC00\uACA9</th>\n          <th>\uC218\uB7C9</th>\n        </tr>\n      </thead>\n      <tbody id=\"product-tbody\"></tbody>\n    </table>\n  ",
  CHARGE: "\n    <h2 hidden>\uC794\uB3C8 \uCDA9\uC804</h2>\n    <form id=\"charge-form\" class=\"form\">\n      <label for=\"charge-amount\">\uC790\uD310\uAE30\uAC00 \uBCF4\uC720\uD560 \uAE08\uC561\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694.</label>\n      <div class=\"form-input\">\n        <input\n          id=\"charge-amount-input\"\n          class=\"input-width\"\n          type=\"number\"\n          placeholder=\"\uAE08\uC561\"\n          min=\"10\"\n          max=\"100000\"\n          required\n        />\n        <button class=\"hover-button\">\uAD6C\uC785</button>\n      </div>\n      <p class=\"current-amount\"></p>\n    </form>\n    <table class=\"table\">\n      <caption class=\"caption\">\n        \uC790\uD310\uAE30\uAC00 \uBCF4\uC720\uD55C \uB3D9\uC804\n      </caption>\n      <thead>\n        <tr>\n          <th>\uB3D9\uC804</th>\n          <th>\uAC1C\uC218</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr></tr>\n          <td>500\uC6D0</td>\n          <td id=\"five-hundred-coin\"></td>\n        </tr>\n        <tr>\n          <td>100\uC6D0</td>\n          <td id=\"one-hundred-coin\"></td>\n        </tr>\n        <tr>\n          <td>50\uC6D0</td>\n          <td id=\"fifty-coin\"></td>\n        </tr>\n        <tr>\n          <td>10\uC6D0</td>\n          <td id=\"ten-coin\"></td>\n        </tr>\n      </tbody>\n    </table>\n  ",
  PURCHASE: "\n    <h2 hidden>\uC0C1\uD488 \uAD6C\uB9E4</h2>\n    <form class=\"purchase-form form\">\n      <label for=\"product-purchased\">\uC0C1\uD488\uC744 \uAD6C\uB9E4\uD560 \uAE08\uC561\uC744 \uD22C\uC785\uD574\uC8FC\uC138\uC694.</label>\n      <div class=\"form-input\">\n        <input id=\"product-purchased\" type=\"number\" class=\"input-width\" placeholder=\"\uAE08\uC561\" />\n        <button class=\"hover-button\">\uD22C\uC785</button>\n      </div>\n      <p class=\"current-amount\">\uD22C\uC785\uD55C \uAE08\uC561: 3000\uC6D0</p>\n    </form>\n    <table class=\"table\">\n      <caption class=\"caption\">\n        \uAD6C\uB9E4 \uAC00\uB2A5 \uC0C1\uD488 \uD604\uD669\n      </caption>\n      <thead>\n        <tr>\n          <th>\uC0C1\uD488\uBA85</th>\n          <th>\uAC00\uACA9</th>\n          <th>\uC218\uB7C9</th>\n          <th>\uAD6C\uB9E4</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>\uCF5C\uB77C</td>\n          <td>1000</td>\n          <td>10</td>\n          <td><button type=\"button\">\uAD6C\uB9E4</button></td>\n        </tr>\n      </tbody>\n    </table>\n    <table class=\"table\">\n      <caption class=\"caption\">\n        \uC794\uB3C8 \uBC18\uD658\n      </caption>\n      <thead>\n        <tr>\n          <th>\uB3D9\uC804</th>\n          <th>\uAC1C\uC218</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>500\uC6D0</td>\n          <td>5\uAC1C</td>\n        </tr>\n      </tbody>\n    </table>\n    <button type=\"button\" class=\"button change-button\">\uBC18\uD658\uD558\uAE30</button>\n  "
};
var tableTemplate = function tableTemplate(product) {
  return "\n    <tr>\n      <td>".concat(product.name, "</td>\n      <td>").concat(product.price, "</td>\n      <td>").concat(product.quantity, "</td>\n      <td><button class=\"modify-button\" type=\"button\">\uC218\uC815</button> <button class=\"delete-button\" type=\"button\">\uC0AD\uC81C</button></td>\n    </tr>\n  ");
};
var tableInputTemplate = function tableInputTemplate(product) {
  return "\n    <td><input type=\"text\" class=\"modify-input\" placeholder=\"\uC0C1\uD488\uBA85\" value=".concat(product.name, " /></td>\n    <td><input type=\"number\" class=\"modify-input\" placeholder=\"\uAC00\uACA9\" value=").concat(product.price, " /></td>\n    <td><input type=\"number\" class=\"modify-input\" placeholder=\"\uC218\uB7C9\" value=").concat(product.quantity, " /></td>\n    <td><button class=\"confirm-button\" type=\"button\">\uD655\uC778</button></td>\n  ");
};

/***/ }),

/***/ "./src/js/utils/common.js":
/*!********************************!*\
  !*** ./src/js/utils/common.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "isMaximumLength": () => (/* binding */ isMaximumLength),
/* harmony export */   "isDivideUnit": () => (/* binding */ isDivideUnit),
/* harmony export */   "isRangeNumber": () => (/* binding */ isRangeNumber),
/* harmony export */   "getRandomNumber": () => (/* binding */ getRandomNumber),
/* harmony export */   "isOverMaxNumber": () => (/* binding */ isOverMaxNumber)
/* harmony export */ });
var isEmpty = function isEmpty(name) {
  return !name;
};
var isMaximumLength = function isMaximumLength(value, max) {
  return value.length > max;
};
var isDivideUnit = function isDivideUnit(number, unit) {
  return number % unit !== 0;
};
var isRangeNumber = function isRangeNumber(number, min, max) {
  return number < min || number > max;
};
var getRandomNumber = function getRandomNumber(max) {
  return Math.floor(Math.random() * (max + 1));
};
var isOverMaxNumber = function isOverMaxNumber(number, max) {
  return number > max;
};

/***/ }),

/***/ "./src/js/utils/dom.js":
/*!*****************************!*\
  !*** ./src/js/utils/dom.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ $),
/* harmony export */   "replaceElement": () => (/* binding */ replaceElement)
/* harmony export */ });
var $ = function $(select) {
  return document.querySelector(select);
};
var replaceElement = function replaceElement(element, content) {
  element.replaceChildren();
  element.insertAdjacentHTML('beforeend', content);
};

/***/ }),

/***/ "./src/js/utils/event.js":
/*!*******************************!*\
  !*** ./src/js/utils/event.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "emit": () => (/* binding */ emit),
/* harmony export */   "on": () => (/* binding */ on)
/* harmony export */ });
var emit = function emit(target, eventName, detail) {
  var event = new CustomEvent(eventName, {
    detail: detail
  });
  target.dispatchEvent(event);
};
var on = function on(target, eventName, handler) {
  target.addEventListener(eventName, handler);
};

/***/ }),

/***/ "./src/js/utils/validation.js":
/*!************************************!*\
  !*** ./src/js/utils/validation.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validProductInfo": () => (/* binding */ validProductInfo),
/* harmony export */   "validChargeAmount": () => (/* binding */ validChargeAmount)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./src/js/utils/common.js");
/* harmony import */ var _constants_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/constants.js */ "./src/js/constants/constants.js");



var isDuplicateProduct = function isDuplicateProduct(name, products) {
  return products.some(function (product) {
    return product.name === name;
  });
};

var validProductInfo = function validProductInfo(_ref, products) {
  var name = _ref.name,
      price = _ref.price,
      quantity = _ref.quantity;

  if ((0,_common_js__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(name)) {
    throw new Error(_constants_constants_js__WEBPACK_IMPORTED_MODULE_1__.ERROR_MESSAGE.EMPTY_NAME);
  }

  if (Number.isNaN(price)) {
    throw new Error(_constants_constants_js__WEBPACK_IMPORTED_MODULE_1__.ERROR_MESSAGE.EMPTY_PRICE);
  }

  if (Number.isNaN(quantity)) {
    throw new Error(_constants_constants_js__WEBPACK_IMPORTED_MODULE_1__.ERROR_MESSAGE.EMPTY_QUANTITY);
  }

  if (isDuplicateProduct(name, products)) {
    throw new Error(_constants_constants_js__WEBPACK_IMPORTED_MODULE_1__.ERROR_MESSAGE.DUPLICATE_PRODUCT);
  }

  if ((0,_common_js__WEBPACK_IMPORTED_MODULE_0__.isMaximumLength)(name, _constants_constants_js__WEBPACK_IMPORTED_MODULE_1__.PRODUCT.MAX_LENGTH)) {
    throw new Error(_constants_constants_js__WEBPACK_IMPORTED_MODULE_1__.ERROR_MESSAGE.OVER_MAX_LENGTH);
  }

  if ((0,_common_js__WEBPACK_IMPORTED_MODULE_0__.isDivideUnit)(price, _constants_constants_js__WEBPACK_IMPORTED_MODULE_1__.PRODUCT.PRICE_UNIT)) {
    throw new Error(_constants_constants_js__WEBPACK_IMPORTED_MODULE_1__.ERROR_MESSAGE.NOT_DIVIDE_NUMBER);
  }

  if ((0,_common_js__WEBPACK_IMPORTED_MODULE_0__.isRangeNumber)(price, _constants_constants_js__WEBPACK_IMPORTED_MODULE_1__.PRODUCT.PRICE_RANGE.MIN, _constants_constants_js__WEBPACK_IMPORTED_MODULE_1__.PRODUCT.PRICE_RANGE.MAX)) {
    throw new Error(_constants_constants_js__WEBPACK_IMPORTED_MODULE_1__.ERROR_MESSAGE.OUT_OF_PRICE_RANGE);
  }

  if ((0,_common_js__WEBPACK_IMPORTED_MODULE_0__.isRangeNumber)(quantity, _constants_constants_js__WEBPACK_IMPORTED_MODULE_1__.PRODUCT.QUANTITY_RANGE.MIN, _constants_constants_js__WEBPACK_IMPORTED_MODULE_1__.PRODUCT.QUANTITY_RANGE.MAX)) {
    throw new Error(_constants_constants_js__WEBPACK_IMPORTED_MODULE_1__.ERROR_MESSAGE.OUT_OF_QUANTITY_RANGE);
  }

  return true;
};
var validChargeAmount = function validChargeAmount(amount, totalAmount) {
  if ((0,_common_js__WEBPACK_IMPORTED_MODULE_0__.isDivideUnit)(amount, _constants_constants_js__WEBPACK_IMPORTED_MODULE_1__.COIN.MIN_UNIT)) {
    throw new Error(_constants_constants_js__WEBPACK_IMPORTED_MODULE_1__.ERROR_MESSAGE.NOT_DIVIDE_NUMBER);
  }

  if ((0,_common_js__WEBPACK_IMPORTED_MODULE_0__.isOverMaxNumber)(totalAmount, _constants_constants_js__WEBPACK_IMPORTED_MODULE_1__.COIN.MAX_AMOUNT)) {
    throw new Error(_constants_constants_js__WEBPACK_IMPORTED_MODULE_1__.ERROR_MESSAGE.OVER_MAX_AMOUNT);
  }
};

/***/ }),

/***/ "./src/js/views/ChargeView.js":
/*!************************************!*\
  !*** ./src/js/views/ChargeView.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChargeView)
/* harmony export */ });
/* harmony import */ var _constants_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/constants.js */ "./src/js/constants/constants.js");
/* harmony import */ var _utils_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dom.js */ "./src/js/utils/dom.js");
/* harmony import */ var _utils_event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/event.js */ "./src/js/utils/event.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }





var _onSubmitChargeAmount = /*#__PURE__*/new WeakSet();

var ChargeView = /*#__PURE__*/function () {
  function ChargeView() {
    _classCallCheck(this, ChargeView);

    _classPrivateMethodInitSpec(this, _onSubmitChargeAmount);

    (0,_utils_event_js__WEBPACK_IMPORTED_MODULE_2__.on)(_constants_constants_js__WEBPACK_IMPORTED_MODULE_0__.SECTION_CONTAINER, 'submit', _classPrivateMethodGet(this, _onSubmitChargeAmount, _onSubmitChargeAmount2).bind(this));
  }

  _createClass(ChargeView, [{
    key: "initChargeDOM",
    value: function initChargeDOM() {
      this.$chargeAmountInput = (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_1__.$)('#charge-amount-input');
      this.$currentAmount = (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_1__.$)('.current-amount');
      this.$fiveHundredCoin = (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_1__.$)('#five-hundred-coin');
      this.$oneHundredCoin = (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_1__.$)('#one-hundred-coin');
      this.$fiftyCoin = (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_1__.$)('#fifty-coin');
      this.$tenCoin = (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_1__.$)('#ten-coin');
    }
  }, {
    key: "renderHaveCoins",
    value: function renderHaveCoins(coins) {
      this.$fiveHundredCoin.innerText = "".concat(coins[500], "\uAC1C");
      this.$oneHundredCoin.innerText = "".concat(coins[100], "\uAC1C");
      this.$fiftyCoin.innerText = "".concat(coins[50], "\uAC1C");
      this.$tenCoin.innerText = "".concat(coins[10], "\uAC1C");
    }
  }, {
    key: "renderCurrentAmount",
    value: function renderCurrentAmount(amount) {
      this.$currentAmount.innerText = "\uD604\uC7AC \uBCF4\uC720 \uAE08\uC561: ".concat(amount, "\uC6D0");
    }
  }, {
    key: "resetChargeInput",
    value: function resetChargeInput() {
      this.$chargeAmountInput.value = '';
    }
  }]);

  return ChargeView;
}();

function _onSubmitChargeAmount2(e) {
  e.preventDefault();
  if (e.target.id !== 'charge-form') return;
  var amount = this.$chargeAmountInput.valueAsNumber;
  (0,_utils_event_js__WEBPACK_IMPORTED_MODULE_2__.emit)(_constants_constants_js__WEBPACK_IMPORTED_MODULE_0__.SECTION_CONTAINER, '@charge', {
    amount: amount
  });
}



/***/ }),

/***/ "./src/js/views/ProductManageView.js":
/*!*******************************************!*\
  !*** ./src/js/views/ProductManageView.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductManageView)
/* harmony export */ });
/* harmony import */ var _constants_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/constants.js */ "./src/js/constants/constants.js");
/* harmony import */ var _utils_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dom.js */ "./src/js/utils/dom.js");
/* harmony import */ var _utils_event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/event.js */ "./src/js/utils/event.js");
/* harmony import */ var _templates_templates_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../templates/templates.js */ "./src/js/templates/templates.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }






var _bindMangeEvent = /*#__PURE__*/new WeakSet();

var _onSubmitProductInfo = /*#__PURE__*/new WeakSet();

var _modifyProductInfo = /*#__PURE__*/new WeakSet();

var _confirmProductInfo = /*#__PURE__*/new WeakSet();

var _deleteProductInfo = /*#__PURE__*/new WeakSet();

var ProductManageView = /*#__PURE__*/function () {
  function ProductManageView() {
    _classCallCheck(this, ProductManageView);

    _classPrivateMethodInitSpec(this, _deleteProductInfo);

    _classPrivateMethodInitSpec(this, _confirmProductInfo);

    _classPrivateMethodInitSpec(this, _modifyProductInfo);

    _classPrivateMethodInitSpec(this, _onSubmitProductInfo);

    _classPrivateMethodInitSpec(this, _bindMangeEvent);

    (0,_utils_event_js__WEBPACK_IMPORTED_MODULE_2__.on)(_constants_constants_js__WEBPACK_IMPORTED_MODULE_0__.SECTION_CONTAINER, 'submit', _classPrivateMethodGet(this, _onSubmitProductInfo, _onSubmitProductInfo2).bind(this));
  }

  _createClass(ProductManageView, [{
    key: "renderModifiedProduct",
    value: function renderModifiedProduct(index, product) {
      (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_1__.replaceElement)(this.$productTbody.children[index], (0,_templates_templates_js__WEBPACK_IMPORTED_MODULE_3__.tableTemplate)(product));
    }
  }, {
    key: "initManageDOM",
    value: function initManageDOM() {
      this.$productNameInput = (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_1__.$)('#product-name-input');
      this.$productPriceInput = (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_1__.$)('#product-price-input');
      this.$productQuantityInput = (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_1__.$)('#product-quantity-input');
      this.$productTbody = (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_1__.$)('#product-tbody');

      _classPrivateMethodGet(this, _bindMangeEvent, _bindMangeEvent2).call(this);
    }
  }, {
    key: "render",
    value: function render(productList) {
      var _this = this;

      if (Array.isArray(productList)) {
        productList.forEach(function (product) {
          _this.$productTbody.insertAdjacentHTML('beforeend', (0,_templates_templates_js__WEBPACK_IMPORTED_MODULE_3__.tableTemplate)(product));
        });
        return;
      }

      this.$productTbody.insertAdjacentHTML('beforeend', (0,_templates_templates_js__WEBPACK_IMPORTED_MODULE_3__.tableTemplate)(productList));
    }
  }, {
    key: "resetProductInput",
    value: function resetProductInput() {
      this.$productNameInput.value = '';
      this.$productPriceInput.value = '';
      this.$productQuantityInput.value = '';
    }
  }]);

  return ProductManageView;
}();

function _bindMangeEvent2() {
  var _this2 = this;

  this.$productTbody.addEventListener('click', function (e) {
    var target = e.target;

    if (target.classList.contains('modify-button')) {
      _classPrivateMethodGet(_this2, _modifyProductInfo, _modifyProductInfo2).call(_this2, target.closest('tr'));

      return;
    }

    if (target.classList.contains('confirm-button')) {
      _classPrivateMethodGet(_this2, _confirmProductInfo, _confirmProductInfo2).call(_this2, target.closest('tr'));

      return;
    }

    if (target.classList.contains('delete-button')) {
      if (window.confirm(_constants_constants_js__WEBPACK_IMPORTED_MODULE_0__.CONFIRM_DELETE_MESSAGE)) {
        _classPrivateMethodGet(_this2, _deleteProductInfo, _deleteProductInfo2).call(_this2, target.closest('tr'));
      }
    }
  });
}

function _onSubmitProductInfo2(e) {
  e.preventDefault();
  if (e.target.id !== 'product-add-form') return;
  var product = {
    name: this.$productNameInput.value.trim(),
    price: this.$productPriceInput.valueAsNumber,
    quantity: this.$productQuantityInput.valueAsNumber
  };
  (0,_utils_event_js__WEBPACK_IMPORTED_MODULE_2__.emit)(_constants_constants_js__WEBPACK_IMPORTED_MODULE_0__.SECTION_CONTAINER, '@manage', {
    product: product
  });
}

function _modifyProductInfo2(selectedProduct) {
  var product = {
    name: selectedProduct.children[0].textContent,
    price: selectedProduct.children[1].textContent,
    quantity: selectedProduct.children[2].textContent
  };
  (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_1__.replaceElement)(selectedProduct, (0,_templates_templates_js__WEBPACK_IMPORTED_MODULE_3__.tableInputTemplate)(product));
}

function _confirmProductInfo2(selectedProduct) {
  var index = selectedProduct.rowIndex - 1;
  var product = {
    name: selectedProduct.children[0].firstChild.value.trim(),
    price: selectedProduct.children[1].firstChild.valueAsNumber,
    quantity: selectedProduct.children[2].firstChild.valueAsNumber
  };
  (0,_utils_event_js__WEBPACK_IMPORTED_MODULE_2__.emit)(_constants_constants_js__WEBPACK_IMPORTED_MODULE_0__.SECTION_CONTAINER, '@modify', {
    index: index,
    product: product
  });
}

function _deleteProductInfo2(selectedProduct) {
  var index = selectedProduct.rowIndex - 1;
  this.$productTbody.removeChild(selectedProduct);
  (0,_utils_event_js__WEBPACK_IMPORTED_MODULE_2__.emit)(_constants_constants_js__WEBPACK_IMPORTED_MODULE_0__.SECTION_CONTAINER, '@delete', {
    index: index
  });
}



/***/ }),

/***/ "./src/js/views/menuCategoryView.js":
/*!******************************************!*\
  !*** ./src/js/views/menuCategoryView.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initHashContents": () => (/* binding */ initHashContents)
/* harmony export */ });
/* harmony import */ var _constants_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/constants.js */ "./src/js/constants/constants.js");
/* harmony import */ var _utils_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dom.js */ "./src/js/utils/dom.js");
/* harmony import */ var _templates_templates_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../templates/templates.js */ "./src/js/templates/templates.js");



var routes = {
  '#!manage': _templates_templates_js__WEBPACK_IMPORTED_MODULE_2__.CATEGORY_TEMPLATE.MANAGE,
  '#!charge': _templates_templates_js__WEBPACK_IMPORTED_MODULE_2__.CATEGORY_TEMPLATE.CHARGE,
  '#!purchase': _templates_templates_js__WEBPACK_IMPORTED_MODULE_2__.CATEGORY_TEMPLATE.PURCHASE
};
var menu = {
  manage: (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_1__.$)('#manage-menu'),
  charge: (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_1__.$)('#charge-menu'),
  purchase: (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_1__.$)('#purchase-menu')
};

var selectTab = function selectTab(hash) {
  menu.manage.classList.toggle('select', hash === '#!manage');
  menu.charge.classList.toggle('select', hash === '#!charge');
  menu.purchase.classList.toggle('select', hash === '#!purchase');
};

var initHashContents = function initHashContents(hash) {
  var _routes$hash;

  var content = (_routes$hash = routes[hash]) !== null && _routes$hash !== void 0 ? _routes$hash : '';
  selectTab(hash);
  (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_1__.replaceElement)(_constants_constants_js__WEBPACK_IMPORTED_MODULE_0__.SECTION_CONTAINER, content);
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/app.css":
/*!***************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/app.css ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#app {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  width: 600px;\n  padding: 44px 80px;\n  margin: 100px auto 100px;\n  border: 1px solid var(--color-dark-gray);\n  border-radius: 4px;\n  box-sizing: border-box;\n}\n\n.vending-machine-header {\n  margin-bottom: 32px;\n  line-height: 36px;\n  font-size: 34px;\n  font-weight: 600;\n}\n\n.menu-list {\n  display: flex;\n  margin-bottom: 52px;\n  gap: 4px;\n}\n\n.button {\n  text-align: center;\n  width: 117px;\n  height: 36px;\n  border: none;\n  border-radius: 4px;\n  line-height: 38px;\n  font-weight: 500;\n  font-size: 16px;\n  background-color: var(--color-light-white);\n}\n\n.section {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.button:hover,\n.modify-button:hover,\n.delete-button:hover,\n.confirm-button:hover {\n  background-color: var(--color-dark-white);\n}\n\n.menu-list li a {\n  display: block;\n  text-decoration-line: none;\n}\n\n.menu-list li a:link,\n.menu-list li a:visited,\n.menu-list li a:hover,\n.menu-list li a:active {\n  color: black;\n}\n\n.menu-list li .select {\n  background-color: var(--color-sky-blue);\n}\n\n.form-input {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  margin: 8px 0 0;\n  gap: 3px;\n}\n\n.product-manage-input-width input {\n  width: 120px;\n}\n\n.form-input input {\n  height: 36px;\n  padding-left: 8px;\n  font-size: 16px;\n  border-radius: 4px;\n  border: 1px solid var(--color-light-gray);\n}\n\n.form-input button {\n  width: 56px;\n  margin-left: 16px;\n  line-height: 16px;\n  font-size: 14px;\n  font-weight: 700;\n  border: none;\n  border-radius: 4px;\n  color: var(--color-white);\n  background-color: var(--color-light-blue);\n}\n\n.current-amount {\n  margin-top: 20px;\n}\n\n.hover-button:hover {\n  background-color: var(--color-dark-blue);\n}\n\n/* table */\n.table {\n  margin: 48px auto 20px;\n  font-size: 16px;\n  line-height: 24px;\n  table-layout: fixed;\n  word-break: break-all;\n  border-collapse: collapse;\n}\n\n.caption {\n  margin-bottom: 16px;\n  font-size: 20px;\n  font-weight: 600;\n}\n\n.table tr {\n  border: 1px solid var(--color-light-gray);\n  border-width: 1px 0;\n}\n\n.table th {\n  padding: 8px 36px;\n  font-weight: 600;\n}\n\n.table td {\n  text-align: center;\n  padding: 8px 0;\n  font-weight: 400;\n}\n\n.table button {\n  width: 50px;\n  height: 32px;\n  border: 0px;\n  border-radius: 4px;\n  background-color: var(--color-light-white);\n}\n\n.input-width {\n  width: 300px;\n}\n\n.change-button {\n  display: block;\n  margin: 0 auto;\n}\n\n.modify-input {\n  width: 60%;\n  padding: 5px 0;\n}\n\n.purchase-form {\n  width: 375px;\n  margin: 0 auto;\n}\n", "",{"version":3,"sources":["webpack://./src/css/app.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,sBAAsB;EACtB,YAAY;EACZ,kBAAkB;EAClB,wBAAwB;EACxB,wCAAwC;EACxC,kBAAkB;EAClB,sBAAsB;AACxB;;AAEA;EACE,mBAAmB;EACnB,iBAAiB;EACjB,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;AACV;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,iBAAiB;EACjB,gBAAgB;EAChB,eAAe;EACf,0CAA0C;AAC5C;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;;;;EAIE,yCAAyC;AAC3C;;AAEA;EACE,cAAc;EACd,0BAA0B;AAC5B;;AAEA;;;;EAIE,YAAY;AACd;;AAEA;EACE,uCAAuC;AACzC;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,QAAQ;AACV;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe;EACf,kBAAkB;EAClB,yCAAyC;AAC3C;;AAEA;EACE,WAAW;EACX,iBAAiB;EACjB,iBAAiB;EACjB,eAAe;EACf,gBAAgB;EAChB,YAAY;EACZ,kBAAkB;EAClB,yBAAyB;EACzB,yCAAyC;AAC3C;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,wCAAwC;AAC1C;;AAEA,UAAU;AACV;EACE,sBAAsB;EACtB,eAAe;EACf,iBAAiB;EACjB,mBAAmB;EACnB,qBAAqB;EACrB,yBAAyB;AAC3B;;AAEA;EACE,mBAAmB;EACnB,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,yCAAyC;EACzC,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,0CAA0C;AAC5C;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,cAAc;EACd,cAAc;AAChB;;AAEA;EACE,UAAU;EACV,cAAc;AAChB;;AAEA;EACE,YAAY;EACZ,cAAc;AAChB","sourcesContent":["#app {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  width: 600px;\n  padding: 44px 80px;\n  margin: 100px auto 100px;\n  border: 1px solid var(--color-dark-gray);\n  border-radius: 4px;\n  box-sizing: border-box;\n}\n\n.vending-machine-header {\n  margin-bottom: 32px;\n  line-height: 36px;\n  font-size: 34px;\n  font-weight: 600;\n}\n\n.menu-list {\n  display: flex;\n  margin-bottom: 52px;\n  gap: 4px;\n}\n\n.button {\n  text-align: center;\n  width: 117px;\n  height: 36px;\n  border: none;\n  border-radius: 4px;\n  line-height: 38px;\n  font-weight: 500;\n  font-size: 16px;\n  background-color: var(--color-light-white);\n}\n\n.section {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.button:hover,\n.modify-button:hover,\n.delete-button:hover,\n.confirm-button:hover {\n  background-color: var(--color-dark-white);\n}\n\n.menu-list li a {\n  display: block;\n  text-decoration-line: none;\n}\n\n.menu-list li a:link,\n.menu-list li a:visited,\n.menu-list li a:hover,\n.menu-list li a:active {\n  color: black;\n}\n\n.menu-list li .select {\n  background-color: var(--color-sky-blue);\n}\n\n.form-input {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  margin: 8px 0 0;\n  gap: 3px;\n}\n\n.product-manage-input-width input {\n  width: 120px;\n}\n\n.form-input input {\n  height: 36px;\n  padding-left: 8px;\n  font-size: 16px;\n  border-radius: 4px;\n  border: 1px solid var(--color-light-gray);\n}\n\n.form-input button {\n  width: 56px;\n  margin-left: 16px;\n  line-height: 16px;\n  font-size: 14px;\n  font-weight: 700;\n  border: none;\n  border-radius: 4px;\n  color: var(--color-white);\n  background-color: var(--color-light-blue);\n}\n\n.current-amount {\n  margin-top: 20px;\n}\n\n.hover-button:hover {\n  background-color: var(--color-dark-blue);\n}\n\n/* table */\n.table {\n  margin: 48px auto 20px;\n  font-size: 16px;\n  line-height: 24px;\n  table-layout: fixed;\n  word-break: break-all;\n  border-collapse: collapse;\n}\n\n.caption {\n  margin-bottom: 16px;\n  font-size: 20px;\n  font-weight: 600;\n}\n\n.table tr {\n  border: 1px solid var(--color-light-gray);\n  border-width: 1px 0;\n}\n\n.table th {\n  padding: 8px 36px;\n  font-weight: 600;\n}\n\n.table td {\n  text-align: center;\n  padding: 8px 0;\n  font-weight: 400;\n}\n\n.table button {\n  width: 50px;\n  height: 32px;\n  border: 0px;\n  border-radius: 4px;\n  background-color: var(--color-light-white);\n}\n\n.input-width {\n  width: 300px;\n}\n\n.change-button {\n  display: block;\n  margin: 0 auto;\n}\n\n.modify-input {\n  width: 60%;\n  padding: 5px 0;\n}\n\n.purchase-form {\n  width: 375px;\n  margin: 0 auto;\n}\n"],"sourceRoot":""}]);
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./app.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/app.css");
// Imports



var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --color-white: #ffffff;\n  --color-light-white: #f5f5f5;\n  --color-dark-white: #ebebeb;\n  --color-light-gray: #b4b4b4;\n  --color-dark-gray: rgba(0, 0, 0, 0.12);\n  --color-sky-blue: rgba(0, 188, 212, 0.16);\n  --color-light-blue: #00bcd4;\n  --color-dark-blue: #0098ac;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nol,\nul {\n  list-style: none;\n}\n\nbutton {\n  cursor: pointer;\n}\n", "",{"version":3,"sources":["webpack://./src/css/index.css"],"names":[],"mappings":"AAEA;EACE,sBAAsB;EACtB,4BAA4B;EAC5B,2BAA2B;EAC3B,2BAA2B;EAC3B,sCAAsC;EACtC,yCAAyC;EACzC,2BAA2B;EAC3B,0BAA0B;AAC5B;;AAEA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;AACxB;;AAEA;;EAEE,gBAAgB;AAClB;;AAEA;EACE,eAAe;AACjB","sourcesContent":["@import './app.css';\n\n:root {\n  --color-white: #ffffff;\n  --color-light-white: #f5f5f5;\n  --color-dark-white: #ebebeb;\n  --color-light-gray: #b4b4b4;\n  --color-dark-gray: rgba(0, 0, 0, 0.12);\n  --color-sky-blue: rgba(0, 188, 212, 0.16);\n  --color-light-blue: #00bcd4;\n  --color-dark-blue: #0098ac;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nol,\nul {\n  list-style: none;\n}\n\nbutton {\n  cursor: pointer;\n}\n"],"sourceRoot":""}]);
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

/***/ }),

/***/ "./src/js/models/Coin.ts":
/*!*******************************!*\
  !*** ./src/js/models/Coin.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/constants.js */ "./src/js/constants/constants.js");
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/common.js */ "./src/js/utils/common.js");
/* harmony import */ var _utils_validation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/validation.js */ "./src/js/utils/validation.js");



var Coin = /** @class */ (function () {
    function Coin() {
        this.amount = 0;
        this.coins = {
            500: 0,
            100: 0,
            50: 0,
            10: 0
        };
    }
    Coin.prototype.setAmount = function (chargedAmount) {
        var currentAmount = this.amount + chargedAmount;
        (0,_utils_validation_js__WEBPACK_IMPORTED_MODULE_2__.validChargeAmount)(chargedAmount, currentAmount);
        this.amount = currentAmount;
        this.makeRandomCoins(chargedAmount);
    };
    Coin.prototype.getAmount = function () {
        return this.amount;
    };
    Coin.prototype.getCoins = function () {
        return this.coins;
    };
    // [500, 100, 50] 큰 단위 순으로 보유할 수 있는 동전 개수중에서 랜덤 숫자를 뽑는다.
    // 뽑은 숫자 만큼 동전을 추가한다.
    // 나머지 금액은 10원 동전으로 바꾼다.
    Coin.prototype.makeRandomCoins = function (amount) {
        var _this = this;
        var currentAmount = amount;
        _constants_constants_js__WEBPACK_IMPORTED_MODULE_0__.COIN.UNIT_LIST.forEach(function (coin) {
            var maxCoinCount = currentAmount / coin;
            var coinCount = coin === _constants_constants_js__WEBPACK_IMPORTED_MODULE_0__.COIN.MIN_UNIT ? maxCoinCount : (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(maxCoinCount);
            currentAmount -= coinCount * coin;
            _this.coins[coin] += coinCount;
        });
    };
    return Coin;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Coin);


/***/ }),

/***/ "./src/js/models/ProductManger.ts":
/*!****************************************!*\
  !*** ./src/js/models/ProductManger.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_validation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/validation.js */ "./src/js/utils/validation.js");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

var ProductManager = /** @class */ (function () {
    function ProductManager() {
        this.products = [];
    }
    ProductManager.prototype.addProduct = function (product) {
        (0,_utils_validation_js__WEBPACK_IMPORTED_MODULE_0__.validProductInfo)(product, this.products);
        this.products.push(product);
    };
    ProductManager.prototype.getProducts = function () {
        return this.products;
    };
    ProductManager.prototype.modifyProduct = function (index, product) {
        var productsList = __spreadArray([], this.products, true);
        productsList.splice(index, 1);
        (0,_utils_validation_js__WEBPACK_IMPORTED_MODULE_0__.validProductInfo)(product, productsList);
        this.products.splice(index, 1, product);
    };
    ProductManager.prototype.deleteProduct = function (index) {
        this.products.splice(index, 1);
    };
    return ProductManager;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductManager);


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
/*!*************************!*\
  !*** ./src/js/index.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/index.css */ "./src/css/index.css");
/* harmony import */ var _route_route_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./route/route.js */ "./src/js/route/route.js");
/* harmony import */ var _Controller_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Controller.js */ "./src/js/Controller.js");



new _Controller_js__WEBPACK_IMPORTED_MODULE_2__["default"]();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map