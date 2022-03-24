/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _moderator_productModerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moderator/productModerator */ "./src/js/moderator/productModerator.js");
/* harmony import */ var _moderator_changesModerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moderator/changesModerator */ "./src/js/moderator/changesModerator.js");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var App = /*#__PURE__*/_createClass(function App() {
  var _this = this;

  _classCallCheck(this, App);

  _defineProperty(this, "onClickNavButton", function (_ref) {
    var target = _ref.target;

    if (target.classList.contains("product-management-button")) {
      _this.productModerator.init();
    }

    if (target.classList.contains("changes-charge-button")) {
      _this.changesModerator.init();
    }
  });

  _defineProperty(this, "onChangePage", function () {
    var hash = location.hash;

    if (hash === "#!productManagement") {
      _this.productModerator.init();
    }

    if (hash === "#!changesCharge") {
      _this.changesModerator.init();
    }
  });

  this.productModerator = new _moderator_productModerator__WEBPACK_IMPORTED_MODULE_0__["default"]();
  this.changesModerator = new _moderator_changesModerator__WEBPACK_IMPORTED_MODULE_1__["default"]();
  this.$nav = document.querySelector("#page-tab-container");
  this.$nav.addEventListener("click", this.onClickNavButton);
  window.addEventListener("hashchange", this.onChangePage);
  this.onChangePage();
});

new App();

/***/ }),

/***/ "./src/js/constant/index.js":
/*!**********************************!*\
  !*** ./src/js/constant/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ERROR_MESSAGE": () => (/* binding */ ERROR_MESSAGE),
/* harmony export */   "VENDING_MACHINE_NUMBER": () => (/* binding */ VENDING_MACHINE_NUMBER),
/* harmony export */   "EVENT_TYPE": () => (/* binding */ EVENT_TYPE),
/* harmony export */   "CONFIRM_MESSAGE": () => (/* binding */ CONFIRM_MESSAGE)
/* harmony export */ });
var ERROR_MESSAGE = {
  DUPLICATED_NAME: "중복된 상품은 입력 할 수 없습니다.",
  MAXIMUM_NAME_LENGTH: "상품명은 10자이하로 입력해주세요",
  VALID_PRICE: "유효한 가격을 입력해주세요",
  MINIMUM_COUNT: "추가하는 수량은 0이하가 될수가 없습니다.",
  MAXIMUM_COUNT: "수량은 최대 20개까지 추가 가능합니다.",
  DIVIDED_BY_MINIMUM_COIN: "투입된 금액은 10으로 나누어 떨어져야합니다.",
  MAXIMUM_CHANGES: "최대 잔액은 100000원 입니다.",
  MINIMUM_CHANGES: "금액은 0원보다 높아야합니다."
};
var VENDING_MACHINE_NUMBER = {
  MAXIMUM_CHANGES: 100000,
  MAXIMUM_PRICE: 10000,
  MINIMUM_PRICE: 100,
  MINIMUM_COIN: 10,
  MAXIMUM_COUNT: 20,
  MINIMUM_COUNT: 0,
  MAXIMUM_NAME_LENGTH: 10
};
var EVENT_TYPE = {
  CHARGE: "@charge",
  ADD: "@add",
  DELETE: "@delete",
  EDIT: "@edit"
};
var CONFIRM_MESSAGE = "정말로 삭제하시겠습니까?";

/***/ }),

/***/ "./src/js/moderator/changesModerator.js":
/*!**********************************************!*\
  !*** ./src/js/moderator/changesModerator.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ui_changePageView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/changePageView */ "./src/js/ui/changePageView.js");
/* harmony import */ var _domain_changesProcessMachine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../domain/changesProcessMachine */ "./src/js/domain/changesProcessMachine.ts");
/* harmony import */ var _util_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/event */ "./src/js/util/event.js");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constant */ "./src/js/constant/index.js");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var ChangesModerator = /*#__PURE__*/_createClass(function ChangesModerator() {
  var _this = this;

  _classCallCheck(this, ChangesModerator);

  _defineProperty(this, "init", function () {
    _this.changePageView.renderInput();

    var changes = _this.changeProcessMachine.getTotalChanges();

    var coinStatus = _this.changeProcessMachine.getCoins();

    _this.changePageView.renderChangesTable();

    _this.changePageView.initDOM();

    _this.changePageView.renderHaveChanges(changes);

    _this.changePageView.renderChangeStatus(coinStatus);
  });

  _defineProperty(this, "chargeChange", function (_ref) {
    var money = _ref.money;

    try {
      _this.changeProcessMachine.charge(money);

      var changes = _this.changeProcessMachine.getTotalChanges();

      var coinStatus = _this.changeProcessMachine.getCoins();

      _this.changePageView.renderHaveChanges(changes);

      _this.changePageView.renderChangeStatus(coinStatus);
    } catch (err) {
      alert(err.message);
    }
  });

  this.changePageView = new _ui_changePageView__WEBPACK_IMPORTED_MODULE_0__["default"]();
  this.changeProcessMachine = new _domain_changesProcessMachine__WEBPACK_IMPORTED_MODULE_1__["default"]();
  (0,_util_event__WEBPACK_IMPORTED_MODULE_2__.on)(window, _constant__WEBPACK_IMPORTED_MODULE_3__.EVENT_TYPE.CHARGE, function (e) {
    return _this.chargeChange(e.detail);
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChangesModerator);

/***/ }),

/***/ "./src/js/moderator/productModerator.js":
/*!**********************************************!*\
  !*** ./src/js/moderator/productModerator.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constant */ "./src/js/constant/index.js");
/* harmony import */ var _domain_productProcessMachine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../domain/productProcessMachine */ "./src/js/domain/productProcessMachine.ts");
/* harmony import */ var _ui_productPageView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/productPageView */ "./src/js/ui/productPageView.js");
/* harmony import */ var _util_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/event */ "./src/js/util/event.js");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var ProductModerator = /*#__PURE__*/_createClass(function ProductModerator() {
  var _this = this;

  _classCallCheck(this, ProductModerator);

  _defineProperty(this, "init", function () {
    _this.productPageView.renderInputForm();

    _this.productPageView.initDOMS();

    var products = _this.productProcessMachine.getProducts();

    _this.productPageView.renderProductStatus(products);
  });

  _defineProperty(this, "addProduct", function (_ref) {
    var name = _ref.name,
        price = _ref.price,
        count = _ref.count;

    try {
      _this.productProcessMachine.add({
        name: name,
        price: price,
        count: count
      });

      var products = _this.productProcessMachine.getProducts();

      _this.productPageView.renderProductStatus(products);
    } catch (err) {
      alert(err.message);
    }
  });

  _defineProperty(this, "updateProduct", function (_ref2) {
    var idx = _ref2.idx,
        name = _ref2.name,
        price = _ref2.price,
        count = _ref2.count;

    try {
      _this.productProcessMachine.update(idx, name, price, count);

      var products = _this.productProcessMachine.getProducts();

      _this.productPageView.renderProductStatus(products);
    } catch (err) {
      alert(err.message);
    }
  });

  _defineProperty(this, "deleteProduct", function (_ref3) {
    var id = _ref3.id;

    if (!confirm(_constant__WEBPACK_IMPORTED_MODULE_0__.CONFIRM_MESSAGE)) {
      return;
    }

    _this.productProcessMachine["delete"](id);

    var products = _this.productProcessMachine.getProducts();

    _this.productPageView.renderProductStatus(products);
  });

  this.productProcessMachine = new _domain_productProcessMachine__WEBPACK_IMPORTED_MODULE_1__["default"]();
  this.productPageView = new _ui_productPageView__WEBPACK_IMPORTED_MODULE_2__["default"]();
  (0,_util_event__WEBPACK_IMPORTED_MODULE_3__.on)(window, _constant__WEBPACK_IMPORTED_MODULE_0__.EVENT_TYPE.ADD, function (e) {
    return _this.addProduct(e.detail);
  });
  (0,_util_event__WEBPACK_IMPORTED_MODULE_3__.on)(window, _constant__WEBPACK_IMPORTED_MODULE_0__.EVENT_TYPE.DELETE, function (e) {
    return _this.deleteProduct(e.detail);
  });
  (0,_util_event__WEBPACK_IMPORTED_MODULE_3__.on)(window, _constant__WEBPACK_IMPORTED_MODULE_0__.EVENT_TYPE.EDIT, function (e) {
    return _this.updateProduct(e.detail);
  });
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductModerator);

/***/ }),

/***/ "./src/js/template/changes.template.js":
/*!*********************************************!*\
  !*** ./src/js/template/changes.template.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var changesTemplate = {
  input: function input() {
    return "\n    <form id=\"changes-form\" class=\"form\">\n      <label for=\"changes-input\">\uC790\uD310\uAE30\uAC00 \uBCF4\uC720\uD560 \uAE08\uC561\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694</label>\n      <div class=\"input-container\">\n        <input id=\"changes-input\" class=\"input\" placeholder=\"\uAE08\uC561\" type=\"number\">\n        <button id=\"charge-changes-button\" class=\"button\">\uCDA9\uC804</button>\n      </div>\n      <p id=\"have-changes\"></p>\n    </form>\n  ";
  },
  changesTable: function changesTable() {
    return "\n  <section>\n    <h2>\uC790\uD310\uAE30\uAC00 \uBCF4\uC720\uD55C \uB3D9\uC804</h2>\n\n    <table>\n      <thead>\n        <tr>\n          <th>\uB3D9\uC804</th>\n          <th>\uAC1C\uC218</th>\n        </tr>\n      </thead>\n      <tbody id=\"changes-table-body\">\n\n      </tbody>\n    </table>\n  </section>\n  ";
  },
  changeStatus: function changeStatus(coinStatus) {
    return "\n    <tr>\n      <td>500\uC6D0</td>\n      <td>".concat(coinStatus["500"], "</td>\n    </tr>\n    <tr>\n      <td>100\uC6D0</td>\n      <td>").concat(coinStatus["100"], "</td>\n    </tr>\n    <tr>\n      <td>50\uC6D0</td>\n      <td>").concat(coinStatus["50"], "</td>\n    </tr>\n    <tr>\n      <td>10\uC6D0</td>\n      <td>").concat(coinStatus["10"], "</td>\n    </tr>\n  ");
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (changesTemplate);

/***/ }),

/***/ "./src/js/template/product.template.js":
/*!*********************************************!*\
  !*** ./src/js/template/product.template.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var productTemplate = {
  input: function input() {
    return "\n    <form id=\"add-product-form\" class=\"form\">\n        <label for=\"product-name-input\">\uCD94\uAC00\uD560 \uC0C1\uD488 \uC815\uBCF4\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.</label>\n        <div class=\"input-container\">\n          <input id=\"product-name-input\" class=\"input\" placeholder=\"\uC0C1\uD488\uBA85\"/>\n          <input id=\"product-price-input\" class=\"input\" placeholder=\"\uAC00\uACA9\" type=\"number\"/>\n          <input id=\"product-count-input\" class=\"input\" placeholder=\"\uC218\uB7C9\" type=\"number\"/>\n          <button id=\"add-product-button\" class=\"button\">\uCD94\uAC00</button>\n        </div>\n    </form>\n    <section id=\"product-status\">\n\n    </section>\n  ";
  },
  productStatus: function productStatus(products) {
    return "\n      <h2>\uC0C1\uD488 \uD604\uD669</h2>\n      <table>\n        <colgroup>\n          <col width=\"23%\"></col>\n          <col width=\"23%\"></col>\n          <col width=\"23%\"></col>\n          <col width=\"31%\"></col>\n        </colgroup>\n        <thead>\n          <tr>\n            <th>\uC0C1\uD488\uBA85</th>\n            <th>\uAC00\uACA9</th>\n            <th>\uC218\uB7C9</th>\n            <th></th>\n          </tr>\n        </thead>\n        <tbody>\n        ".concat(products.map(function (_ref, idx) {
      var name = _ref.name,
          price = _ref.price,
          count = _ref.count;
      return "\n          <tr data-id=".concat(idx, " data-name=").concat(name, " data-price=").concat(price, " data-count=").concat(count, ">\n            <td>").concat(name, "</td>\n            <td>").concat(price, "</td>\n            <td>").concat(count, "</td>\n            <td>\n              <button class=\"edit-button process-button\">\uC218\uC815</button>\n              <button class=\"delete-button process-button\">\uC0AD\uC81C</button>\n            </td>\n          </tr>\n          ");
    }).join(""), "\n        </tbody>\n      </table>\n  ");
  },
  productUpdateForm: function productUpdateForm(_ref2) {
    var name = _ref2.name,
        price = _ref2.price,
        count = _ref2.count;
    return "\n    <td><input id=\"edit-name-input\" class=\"product-edit-input input\" value='".concat(name, "' /></td>\n    <td><input id=\"edit-price-input\" class=\"product-edit-input input\" value='").concat(price, "' type=\"number\"/></td>\n    <td><input id=\"edit-count-input\" class=\"product-edit-input input\" value='").concat(count, "' type=\"number\"/></td>\n    <td>\n      <button class=\"save-button process-button\">\uD655\uC778</button>\n    </td>\n  ");
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (productTemplate);

/***/ }),

/***/ "./src/js/ui/changePageView.js":
/*!*************************************!*\
  !*** ./src/js/ui/changePageView.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _template_changes_template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../template/changes.template */ "./src/js/template/changes.template.js");
/* harmony import */ var _util_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/event */ "./src/js/util/event.js");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constant */ "./src/js/constant/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var ChangePageView = /*#__PURE__*/function () {
  function ChangePageView() {
    var _this = this;

    _classCallCheck(this, ChangePageView);

    _defineProperty(this, "bindEvent", function () {
      (0,_util_event__WEBPACK_IMPORTED_MODULE_1__.on)(_this.$page, "submit", _this.changesSubmitHandler);
    });

    _defineProperty(this, "changesSubmitHandler", function (e) {
      if (e.target.id !== "changes-form") return;
      e.preventDefault();
      (0,_util_event__WEBPACK_IMPORTED_MODULE_1__.emit)(_constant__WEBPACK_IMPORTED_MODULE_2__.EVENT_TYPE.CHARGE, {
        money: _this.$changesInput.valueAsNumber
      });
      _this.$changesInput.value = "";
    });

    _defineProperty(this, "initDOM", function () {
      _this.$changesForm = document.querySelector("#changes-form");
      _this.$changesInput = document.querySelector("#changes-input");
      _this.$haveChanges = document.querySelector("#have-changes");
      _this.$changesTableBody = document.querySelector("#changes-table-body");
    });

    _defineProperty(this, "renderHaveChanges", function (changes) {
      _this.$haveChanges.innerText = "\uD604\uC7AC \uBCF4\uC720 \uAE08\uC561: ".concat(changes);
    });

    _defineProperty(this, "renderChangesTable", function () {
      _this.$page.insertAdjacentHTML("beforeend", _template_changes_template__WEBPACK_IMPORTED_MODULE_0__["default"].changesTable());
    });

    _defineProperty(this, "renderChangeStatus", function (coinStatus) {
      _this.$changesTableBody.replaceChildren();

      _this.$changesTableBody.insertAdjacentHTML("beforeend", _template_changes_template__WEBPACK_IMPORTED_MODULE_0__["default"].changeStatus(coinStatus));
    });

    this.$page = document.querySelector("#page");
    this.bindEvent();
  }

  _createClass(ChangePageView, [{
    key: "renderInput",
    value: function renderInput() {
      this.$page.replaceChildren();
      this.$page.insertAdjacentHTML("beforeend", _template_changes_template__WEBPACK_IMPORTED_MODULE_0__["default"].input());
    }
  }]);

  return ChangePageView;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChangePageView);

/***/ }),

/***/ "./src/js/ui/productPageView.js":
/*!**************************************!*\
  !*** ./src/js/ui/productPageView.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/event.js */ "./src/js/util/event.js");
/* harmony import */ var _template_product_template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../template/product.template.js */ "./src/js/template/product.template.js");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constant */ "./src/js/constant/index.js");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var ProductPageView = /*#__PURE__*/_createClass(function ProductPageView() {
  var _this = this;

  _classCallCheck(this, ProductPageView);

  _defineProperty(this, "bindEvent", function () {
    (0,_util_event_js__WEBPACK_IMPORTED_MODULE_0__.on)(_this.$page, "submit", _this.productSubmitHandler);
    (0,_util_event_js__WEBPACK_IMPORTED_MODULE_0__.on)(_this.$page, "click", _this.onClick);
  });

  _defineProperty(this, "initDOMS", function () {
    _this.$productStatus = document.querySelector("#product-status");
  });

  _defineProperty(this, "productSubmitHandler", function (e) {
    if (e.target.id !== "add-product-form") return;
    e.preventDefault();
    if (_this.edited === true) return;
    var $productNameInput = e.target.querySelector("#product-name-input");
    var $productPriceInput = e.target.querySelector("#product-price-input");
    var $productCountInput = e.target.querySelector("#product-count-input");
    (0,_util_event_js__WEBPACK_IMPORTED_MODULE_0__.emit)(_constant__WEBPACK_IMPORTED_MODULE_2__.EVENT_TYPE.ADD, {
      name: $productNameInput.value,
      price: $productPriceInput.valueAsNumber,
      count: $productCountInput.valueAsNumber
    });
    $productNameInput.value = "";
    $productPriceInput.value = "";
    $productCountInput.value = "";
  });

  _defineProperty(this, "onClick", function (_ref) {
    var target = _ref.target;

    if (target.classList.contains("delete-button")) {
      if (_this.edited === true) return;

      _this.productDeleteHandler(target);
    }

    if (target.classList.contains("edit-button")) {
      if (_this.edited === true) return;

      _this.productUpdateHandler(target);
    }

    if (target.classList.contains("save-button")) {
      _this.productSubmitUpdateHandler(target);
    }
  });

  _defineProperty(this, "productDeleteHandler", function (target) {
    var productId = target.closest("tr").dataset.id;
    (0,_util_event_js__WEBPACK_IMPORTED_MODULE_0__.emit)(_constant__WEBPACK_IMPORTED_MODULE_2__.EVENT_TYPE.DELETE, {
      id: productId
    });
  });

  _defineProperty(this, "productUpdateHandler", function (target) {
    var product = target.closest("tr");
    product.innerHTML = _template_product_template_js__WEBPACK_IMPORTED_MODULE_1__["default"].productUpdateForm({
      name: product.dataset.name,
      price: product.dataset.price,
      count: product.dataset.count
    });
    _this.edited = true;
  });

  _defineProperty(this, "productSubmitUpdateHandler", function (target) {
    var updatedProduct = target.closest("tr");
    var idx = Number(updatedProduct.dataset.id);
    var updatedName = updatedProduct.querySelector("#edit-name-input").value;
    var updatedPrice = updatedProduct.querySelector("#edit-price-input").valueAsNumber;
    var updatedCount = updatedProduct.querySelector("#edit-count-input").valueAsNumber;
    _this.edited = false;
    (0,_util_event_js__WEBPACK_IMPORTED_MODULE_0__.emit)(_constant__WEBPACK_IMPORTED_MODULE_2__.EVENT_TYPE.EDIT, {
      idx: idx,
      name: updatedName,
      price: updatedPrice,
      count: updatedCount
    });
  });

  _defineProperty(this, "renderInputForm", function () {
    _this.$page.replaceChildren();

    _this.$page.insertAdjacentHTML("beforeend", _template_product_template_js__WEBPACK_IMPORTED_MODULE_1__["default"].input());
  });

  _defineProperty(this, "renderProductStatus", function (products) {
    _this.$productStatus.replaceChildren();

    _this.$productStatus.insertAdjacentHTML("beforeend", _template_product_template_js__WEBPACK_IMPORTED_MODULE_1__["default"].productStatus(products));
  });

  this.$page = document.querySelector("#page");
  this.edited = false;
  this.bindEvent();
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductPageView);

/***/ }),

/***/ "./src/js/util/event.js":
/*!******************************!*\
  !*** ./src/js/util/event.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "on": () => (/* binding */ on),
/* harmony export */   "emit": () => (/* binding */ emit)
/* harmony export */ });
var _on$emit = {
  on: function on(element, eventName, callback) {
    element.addEventListener(eventName, callback);
  },
  emit: function emit(eventName) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var customEvent = new CustomEvent(eventName, {
      detail: data
    });
    dispatchEvent(customEvent);
  }
},
    on = _on$emit.on,
    emit = _on$emit.emit;


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
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  padding: 0;\n}\n\n:root {\n  --nav-button-color: #f5f5f5;\n  --nav-button-hover-color: rgba(0, 188, 212, 0.25);\n  --input-border-color: #b4b4b4;\n  --default-button-color: #00bcd4;\n  --hover-button-color: #80deea;\n  --table-border-color: #dcdcdc;\n  --process-button-color: #f5f5f5;\n}\n\na {\n  text-decoration: none;\n  color: black;\n  line-height: 40px;\n}\n\n#app {\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n#page-tab-container {\n  display: flex;\n  justify-content: center;\n  width: 360px;\n  gap: 20px;\n  margin-top: 40px;\n  margin-bottom: 70px;\n}\n\n.nav-button {\n  background-color: var(--nav-button-color);\n  width: 117px;\n  height: 36px;\n  cursor: pointer;\n  border: none;\n  border-radius: 4px;\n}\n\n.nav-button:hover {\n  background-color: var(--nav-button-hover-color);\n}\n\n.input {\n  height: 36px;\n  border-radius: 4px;\n  padding-left: 8px;\n  border: 1px solid var(--input-border-color);\n}\n\n.form {\n  text-align: left;\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n\n.input-container {\n  display: flex;\n  gap: 6px;\n}\n\n.edit-input-container {\n  display: flex;\n  gap: 5px;\n}\n\n.product-edit-input {\n  width: 90px;\n  height: 30px;\n}\n\n.button {\n  color: white;\n  background-color: var(--default-button-color);\n  width: 56px;\n  height: 38px;\n  padding: 0;\n  margin-left: 10px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n\n.button:hover {\n  background-color: var(--hover-button-color);\n}\n\ntable {\n  width: 470px;\n  border-collapse: collapse;\n}\n\ntr {\n  height: 40px;\n  border-top: 1px solid var(--table-border-color);\n}\n\n.process-button {\n  background-color: var(--process-button-color);\n  width: 50px;\n  height: 32px;\n  border-radius: 4px;\n  border: none;\n  margin-right: 5px;\n  cursor: pointer;\n}\n\n.process-button:hover {\n  background-color: var(--nav-button-hover-color);\n}\n\n#changes-input {\n  width: 300px;\n}\n\n#changes-form {\n  width: 400px;\n  margin: 0 auto;\n}\n\n#have-changes {\n  margin-top: 5px;\n}\n", "",{"version":3,"sources":["webpack://./src/css/index.css"],"names":[],"mappings":"AAAA;EACE,UAAU;AACZ;;AAEA;EACE,2BAA2B;EAC3B,iDAAiD;EACjD,6BAA6B;EAC7B,+BAA+B;EAC/B,6BAA6B;EAC7B,6BAA6B;EAC7B,+BAA+B;AACjC;;AAEA;EACE,qBAAqB;EACrB,YAAY;EACZ,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,YAAY;EACZ,SAAS;EACT,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,yCAAyC;EACzC,YAAY;EACZ,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,+CAA+C;AACjD;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,iBAAiB;EACjB,2CAA2C;AAC7C;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,QAAQ;AACV;;AAEA;EACE,aAAa;EACb,QAAQ;AACV;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,6CAA6C;EAC7C,WAAW;EACX,YAAY;EACZ,UAAU;EACV,iBAAiB;EACjB,YAAY;EACZ,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,2CAA2C;AAC7C;;AAEA;EACE,YAAY;EACZ,yBAAyB;AAC3B;;AAEA;EACE,YAAY;EACZ,+CAA+C;AACjD;;AAEA;EACE,6CAA6C;EAC7C,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,+CAA+C;AACjD;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,cAAc;AAChB;;AAEA;EACE,eAAe;AACjB","sourcesContent":["* {\n  padding: 0;\n}\n\n:root {\n  --nav-button-color: #f5f5f5;\n  --nav-button-hover-color: rgba(0, 188, 212, 0.25);\n  --input-border-color: #b4b4b4;\n  --default-button-color: #00bcd4;\n  --hover-button-color: #80deea;\n  --table-border-color: #dcdcdc;\n  --process-button-color: #f5f5f5;\n}\n\na {\n  text-decoration: none;\n  color: black;\n  line-height: 40px;\n}\n\n#app {\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n#page-tab-container {\n  display: flex;\n  justify-content: center;\n  width: 360px;\n  gap: 20px;\n  margin-top: 40px;\n  margin-bottom: 70px;\n}\n\n.nav-button {\n  background-color: var(--nav-button-color);\n  width: 117px;\n  height: 36px;\n  cursor: pointer;\n  border: none;\n  border-radius: 4px;\n}\n\n.nav-button:hover {\n  background-color: var(--nav-button-hover-color);\n}\n\n.input {\n  height: 36px;\n  border-radius: 4px;\n  padding-left: 8px;\n  border: 1px solid var(--input-border-color);\n}\n\n.form {\n  text-align: left;\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n\n.input-container {\n  display: flex;\n  gap: 6px;\n}\n\n.edit-input-container {\n  display: flex;\n  gap: 5px;\n}\n\n.product-edit-input {\n  width: 90px;\n  height: 30px;\n}\n\n.button {\n  color: white;\n  background-color: var(--default-button-color);\n  width: 56px;\n  height: 38px;\n  padding: 0;\n  margin-left: 10px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n\n.button:hover {\n  background-color: var(--hover-button-color);\n}\n\ntable {\n  width: 470px;\n  border-collapse: collapse;\n}\n\ntr {\n  height: 40px;\n  border-top: 1px solid var(--table-border-color);\n}\n\n.process-button {\n  background-color: var(--process-button-color);\n  width: 50px;\n  height: 32px;\n  border-radius: 4px;\n  border: none;\n  margin-right: 5px;\n  cursor: pointer;\n}\n\n.process-button:hover {\n  background-color: var(--nav-button-hover-color);\n}\n\n#changes-input {\n  width: 300px;\n}\n\n#changes-form {\n  width: 400px;\n  margin: 0 auto;\n}\n\n#have-changes {\n  margin-top: 5px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/productPage.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/productPage.css ***!
  \***********************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "#product-status {\n  margin-top: 70px;\n}\n", "",{"version":3,"sources":["webpack://./src/css/productPage.css"],"names":[],"mappings":"AAAA;EACE,gBAAgB;AAClB","sourcesContent":["#product-status {\n  margin-top: 70px;\n}\n"],"sourceRoot":""}]);
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

/***/ "./src/css/productPage.css":
/*!*********************************!*\
  !*** ./src/css/productPage.css ***!
  \*********************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_productPage_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./productPage.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/productPage.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_productPage_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_productPage_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_productPage_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_productPage_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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

/***/ "./src/js/domain/changesProcessMachine.ts":
/*!************************************************!*\
  !*** ./src/js/domain/changesProcessMachine.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constant */ "./src/js/constant/index.js");
var __assign = (undefined && undefined.__assign) || function () {
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

var ChangesProcessMachine = /** @class */ (function () {
    function ChangesProcessMachine() {
        var _this = this;
        this.coins = { 500: 0, 100: 0, 50: 0, 10: 0 };
        this.charge = function (money) {
            _this.checkDividedByMinimumCoin(money);
            _this.checkMoneyOverMaximum(money);
            _this.checkMoenyUnderZero(money);
            var newCoins = _this.generateCoins(money);
            _this.accumulateCoins(newCoins);
            console.log(_this.coins);
        };
        this.accumulateCoins = function (newCoins) {
            _this.coins = Object.entries(newCoins).reduce(function (acc, _a) {
                var _b;
                var coin = _a[0], count = _a[1];
                return __assign(__assign({}, acc), (_b = {}, _b[coin] = _this.coins[coin] + count, _b));
            }, _this.coins);
        };
        this.generateCoins = function (money) {
            var coinArray = [500, 100, 50, 10];
            var newCoins = { 500: 0, 100: 0, 50: 0, 10: 0 };
            while (money) {
                var idx = Math.floor(Math.random() * coinArray.length);
                if (money < coinArray[idx])
                    continue;
                newCoins[coinArray[idx]] += 1;
                money -= coinArray[idx];
            }
            return newCoins;
        };
        this.getCoins = function () {
            return _this.coins;
        };
        this.getTotalChanges = function () {
            return Object.entries(_this.coins).reduce(function (acc, _a) {
                var coin = _a[0], count = _a[1];
                return acc + Number(coin) * count;
            }, 0);
        };
        this.checkDividedByMinimumCoin = function (money) {
            if (money % _constant__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE_NUMBER.MINIMUM_COIN !== 0) {
                throw new Error(_constant__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.DIVIDED_BY_MINIMUM_COIN);
            }
        };
        this.checkMoneyOverMaximum = function (money) {
            if (_this.getTotalChanges() + money >
                _constant__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE_NUMBER.MAXIMUM_CHANGES) {
                throw new Error(_constant__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.MAXIMUM_CHANGES);
            }
        };
        this.checkMoenyUnderZero = function (money) {
            if (money <= 0) {
                throw new Error(_constant__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.MINIMUM_CHANGES);
            }
        };
    }
    return ChangesProcessMachine;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChangesProcessMachine);


/***/ }),

/***/ "./src/js/domain/productProcessMachine.ts":
/*!************************************************!*\
  !*** ./src/js/domain/productProcessMachine.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constant */ "./src/js/constant/index.js");

var ProductProcessMachine = /** @class */ (function () {
    function ProductProcessMachine() {
        var _this = this;
        this.products = [];
        this.add = function (newProduct) {
            _this.checkDuplicatedName(newProduct.name);
            _this.checkNameLength(newProduct.name);
            _this.checkValidPrice(newProduct.price);
            _this.checkValidCount(newProduct.count);
            _this.products.push(newProduct);
        };
        this.getProducts = function () {
            return _this.products;
        };
        this.update = function (idx, name, price, count) {
            _this.checkDuplicatedName(name, idx);
            _this.checkNameLength(name);
            _this.checkValidPrice(price);
            _this.checkValidCount(count);
            name && _this.checkNameLength(name);
            price && _this.checkValidPrice(price);
            count && _this.checkValidCount(count);
            _this.updateStatus(idx, name, "name");
            _this.updateStatus(idx, price, "price");
            _this.updateStatus(idx, count, "count");
        };
        this["delete"] = function (idx) {
            _this.products.splice(idx, 1);
        };
        this.updateStatus = function (idx, status, key) {
            _this.products[idx]["".concat(key)] = status;
        };
        this.checkDuplicatedName = function (newName, idx) {
            if (idx === void 0) { idx = -1; }
            if (_this.products.some(function (_a, index) {
                var name = _a.name;
                return name === newName && (idx === -1 || index !== idx);
            })) {
                throw new Error(_constant__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.DUPLICATED_NAME);
            }
        };
        this.checkNameLength = function (name) {
            if (name.length > _constant__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE_NUMBER.MAXIMUM_NAME_LENGTH) {
                throw new Error(_constant__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.MAXIMUM_NAME_LENGTH);
            }
        };
        this.checkValidPrice = function (price) {
            if (price < _constant__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE_NUMBER.MINIMUM_PRICE ||
                price > _constant__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE_NUMBER.MAXIMUM_PRICE ||
                price % _constant__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE_NUMBER.MINIMUM_COIN !== 0) {
                throw new Error(_constant__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.VALID_PRICE);
            }
        };
        this.checkValidCount = function (count) {
            if (!count || count <= _constant__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE_NUMBER.MINIMUM_COUNT) {
                throw new Error(_constant__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.MINIMUM_COUNT);
            }
            if (count > _constant__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE_NUMBER.MAXIMUM_COUNT) {
                throw new Error(_constant__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.MAXIMUM_COUNT);
            }
        };
    }
    return ProductProcessMachine;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductProcessMachine);


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
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/index */ "./src/css/index.css");
/* harmony import */ var _css_productPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/productPage */ "./src/css/productPage.css");
/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/app */ "./src/js/app.js");




})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map