/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/ProductManagementComponent.js":
/*!******************************************************!*\
  !*** ./src/components/ProductManagementComponent.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_ProductTableComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/ProductTableComponent */ "./src/components/common/ProductTableComponent.js");
/* harmony import */ var _utils_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/validation */ "./src/utils/validation.ts");
/* harmony import */ var _stores_vendingMachineStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stores/vendingMachineStore */ "./src/stores/vendingMachineStore.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }






var _currentProductListComponent = /*#__PURE__*/new WeakMap();

var ProductManagementComponent = /*#__PURE__*/function () {
  function ProductManagementComponent($parent) {
    var _this = this;

    _classCallCheck(this, ProductManagementComponent);

    _classPrivateFieldInitSpec(this, _currentProductListComponent, {
      writable: true,
      value: void 0
    });

    _defineProperty(this, "onSubmitProductInputForm", function (e) {
      e.preventDefault();
      var productNameInputValue = _this.$productNameInput.value;
      var productPriceInputValue = _this.$productPriceInput.valueAsNumber;
      var productQuantityInputValue = _this.$productQuantityInput.valueAsNumber;

      try {
        if ((0,_utils_validation__WEBPACK_IMPORTED_MODULE_1__.checkProductInput)({
          nameInput: productNameInputValue,
          priceInput: productPriceInputValue,
          quantityInput: productQuantityInputValue
        })) {
          _stores_vendingMachineStore__WEBPACK_IMPORTED_MODULE_2__["default"].mutateState({
            actionType: _utils_constants__WEBPACK_IMPORTED_MODULE_3__.ACTION_TYPES.ADD_PRODUCT,
            payload: {
              name: productNameInputValue,
              price: productPriceInputValue,
              quantity: productQuantityInputValue
            },
            stateKey: _utils_constants__WEBPACK_IMPORTED_MODULE_3__.VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST
          });

          _this.clearInputForm();
        }
      } catch (_ref) {
        var message = _ref.message;
        alert(message);
      }
    });

    this.$parent = $parent;
    this.mount();
    this.initDOM();
    this.initChildComponents();
    this.bindEventHandler();
  }

  _createClass(ProductManagementComponent, [{
    key: "mount",
    value: function mount() {
      this.$parent.insertAdjacentHTML('beforeend', this.generateTemplate());
    }
  }, {
    key: "initDOM",
    value: function initDOM() {
      this.$manageProductContainer = document.querySelector('#manage-product-container');
      this.$productInputForm = document.querySelector('#product-input-form');
      this.$productNameInput = document.querySelector('#product-name-input');
      this.$productPriceInput = document.querySelector('#product-price-input');
      this.$productQuantityInput = document.querySelector('#product-quantity-input');
    }
  }, {
    key: "generateTemplate",
    value: function generateTemplate() {
      return "<section id=\"manage-product-container\" class=\"hide\" aria-labelledby=\"manage-product-title\">\n    <h2 id=\"manage-product-title\" hidden>\uC0C1\uD488\uC744 \uAD00\uB9AC\uD558\uB294 \uC139\uC158</h2>\n    <form id=\"product-input-form\" class=\"input-form\">\n      <label for=\"product-input-form\">\uCD94\uAC00\uD560 \uC0C1\uD488 \uC815\uBCF4\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694</label>\n      <div class=\"input-wrapper\">\n        <input id=\"product-name-input\" type=\"text\" placeholder=\"\uC0C1\uD488\uBA85\" />\n        <input id=\"product-price-input\" type=\"number\" placeholder=\"\uAC00\uACA9\" />\n        <input id=\"product-quantity-input\" type=\"number\" placeholder=\"\uC218\uB7C9\" />\n        <button id=\"product-input-submit\" class=\"submit-button\">\uCD94\uAC00</button>\n      </div>\n    </form> \n  </section>";
    }
  }, {
    key: "initChildComponents",
    value: function initChildComponents() {
      _classPrivateFieldSet(this, _currentProductListComponent, new _common_ProductTableComponent__WEBPACK_IMPORTED_MODULE_0__["default"](this.$manageProductContainer, {
        tableId: 'current-product-list',
        tableCaption: '상품 현황'
      }));
    }
  }, {
    key: "bindEventHandler",
    value: function bindEventHandler() {
      this.$productInputForm.addEventListener('submit', this.onSubmitProductInputForm);
    }
  }, {
    key: "show",
    value: function show() {
      this.$manageProductContainer.classList.remove('hide');
    }
  }, {
    key: "hide",
    value: function hide() {
      this.$manageProductContainer.classList.add('hide');
    }
  }, {
    key: "clearInputForm",
    value: function clearInputForm() {
      this.$productNameInput.value = '';
      this.$productPriceInput.value = '';
      this.$productQuantityInput.value = '';
      this.$productNameInput.focus();
    }
  }]);

  return ProductManagementComponent;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductManagementComponent);

/***/ }),

/***/ "./src/components/PurchaseProductComponent.js":
/*!****************************************************!*\
  !*** ./src/components/PurchaseProductComponent.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var PurchaseProductComponent = /*#__PURE__*/function () {
  function PurchaseProductComponent($parent) {
    _classCallCheck(this, PurchaseProductComponent);

    this.$parent = $parent;
    this.mount();
    this.initDOM();
  }

  _createClass(PurchaseProductComponent, [{
    key: "mount",
    value: function mount() {
      this.$parent.insertAdjacentHTML('beforeend', this.generateTemplate());
    }
  }, {
    key: "initDOM",
    value: function initDOM() {
      this.$purchaseProductContainer = document.querySelector('#purchase-product-container');
    }
  }, {
    key: "generateTemplate",
    value: function generateTemplate() {
      return "<section id=\"purchase-product-container\" aria-labelledby=\"purchase-product-title\" class=\"hide\">\n          <h2 id=\"purchase-product-title\" hidden>\uC0C1\uD488\uC744 \uAD6C\uB9E4\uD558\uB294 \uC139\uC158</h2>\n          <div class=\"empty-img\"><img src=\"./empty-img.png\" width=\"200px\" height=\"200px\"></img></div>\n        </section>";
    }
  }, {
    key: "show",
    value: function show() {
      this.$purchaseProductContainer.classList.remove('hide');
    }
  }, {
    key: "hide",
    value: function hide() {
      this.$purchaseProductContainer.classList.add('hide');
    }
  }]);

  return PurchaseProductComponent;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PurchaseProductComponent);

/***/ }),

/***/ "./src/components/RechargeChangeComponent.js":
/*!***************************************************!*\
  !*** ./src/components/RechargeChangeComponent.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _stores_vendingMachineStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stores/vendingMachineStore */ "./src/stores/vendingMachineStore.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _utils_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/validation */ "./src/utils/validation.ts");
/* harmony import */ var _common_CoinTableComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/CoinTableComponent */ "./src/components/common/CoinTableComponent.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }






var _rechargeCoinTableComponent = /*#__PURE__*/new WeakMap();

var RechargeChangeComponent = /*#__PURE__*/function () {
  function RechargeChangeComponent($parent) {
    var _this = this;

    _classCallCheck(this, RechargeChangeComponent);

    _classPrivateFieldInitSpec(this, _rechargeCoinTableComponent, {
      writable: true,
      value: void 0
    });

    _defineProperty(this, "onSubmitRechargeChangeForm", function (e) {
      e.preventDefault();
      var changeInput = _this.$rechargeChangeInput.valueAsNumber;

      try {
        if ((0,_utils_validation__WEBPACK_IMPORTED_MODULE_2__.checkChangeInput)(changeInput)) {
          _stores_vendingMachineStore__WEBPACK_IMPORTED_MODULE_0__["default"].mutateState({
            actionType: _utils_constants__WEBPACK_IMPORTED_MODULE_1__.ACTION_TYPES.RECHARGE_CHANGE,
            payload: {
              changeInput: changeInput
            },
            stateKey: _utils_constants__WEBPACK_IMPORTED_MODULE_1__.VENDING_MACHINE_STATE_KEYS.COIN_WALLET
          });

          _this.clearInputForm();
        }
      } catch (_ref) {
        var message = _ref.message;
        alert(message);
      }
    });

    this.$parent = $parent;
    this.mount();
    this.initDOM();
    this.initChildComponents();
    this.subscribeStore();
    this.bindEventHandler();
  }

  _createClass(RechargeChangeComponent, [{
    key: "mount",
    value: function mount() {
      this.$parent.insertAdjacentHTML('beforeend', this.generateTemplate());
    }
  }, {
    key: "initDOM",
    value: function initDOM() {
      this.$rechargeChangeContainer = this.$parent.querySelector('#recharge-change-container');
      this.$rechargeChangeForm = this.$parent.querySelector('#recharge-change-form');
      this.$rechargeChangeInput = this.$parent.querySelector('#recharge-change-input');
      this.$rechargeChangeTotal = this.$parent.querySelector('#change-total-amount');
    }
  }, {
    key: "generateTemplate",
    value: function generateTemplate() {
      return "<section id=\"recharge-change-container\" aria-labelledby=\"recharge-change-title\" class=\"hide\">\n    <h2 id=\"recharge-change-title\" hidden>\uC790\uD310\uAE30\uC758 \uC794\uB3C8\uC744 \uCDA9\uC804\uD558\uB294 \uC139\uC158</h2>\n    <form id=\"recharge-change-form\" class=\"input-form\">\n      <label for=\"recharge-change-form\">\uC790\uD310\uAE30\uAC00 \uBCF4\uC720\uD560 \uAE08\uC561\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694</label>\n      <div class=\"input-wrapper\">\n        <input id=\"recharge-change-input\" type=\"number\" placeholder=\"\uAE08\uC561\" />\n        <button  class=\"submit-button\">\uCDA9\uC804</button>\n      </div>\n      <div class=\"total-amount\">\uD22C\uC785\uD55C \uAE08\uC561: <span id=\"change-total-amount\">0</span>\uC6D0</div>\n      </form>\n  </section>";
    }
  }, {
    key: "initChildComponents",
    value: function initChildComponents() {
      _classPrivateFieldSet(this, _rechargeCoinTableComponent, new _common_CoinTableComponent__WEBPACK_IMPORTED_MODULE_3__["default"](this.$rechargeChangeContainer, {
        tableId: 'recharge-coin-table',
        tableCaption: '자판기가 보유한 동전'
      }));
    }
  }, {
    key: "subscribeStore",
    value: function subscribeStore() {
      _stores_vendingMachineStore__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.VENDING_MACHINE_STATE_KEYS.COIN_WALLET, this);
    }
  }, {
    key: "bindEventHandler",
    value: function bindEventHandler() {
      this.$rechargeChangeForm.addEventListener('submit', this.onSubmitRechargeChangeForm);
    }
  }, {
    key: "wakeUp",
    value: function wakeUp() {
      var coinWallet = _stores_vendingMachineStore__WEBPACK_IMPORTED_MODULE_0__["default"].getState(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.VENDING_MACHINE_STATE_KEYS.COIN_WALLET, this);
      this.render(coinWallet);
    }
  }, {
    key: "render",
    value: function render(coinWallet) {
      var coinTotalAmount = coinWallet.computeCoinTotalAmount();
      this.$rechargeChangeTotal.textContent = coinTotalAmount;
    }
  }, {
    key: "show",
    value: function show() {
      this.$rechargeChangeContainer.classList.remove('hide');
    }
  }, {
    key: "hide",
    value: function hide() {
      this.$rechargeChangeContainer.classList.add('hide');
    }
  }, {
    key: "clearInputForm",
    value: function clearInputForm() {
      this.$rechargeChangeInput.value = '';
      this.$rechargeChangeInput.blur();
    }
  }]);

  return RechargeChangeComponent;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RechargeChangeComponent);

/***/ }),

/***/ "./src/components/common/CoinTableComponent.js":
/*!*****************************************************!*\
  !*** ./src/components/common/CoinTableComponent.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _stores_vendingMachineStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stores/vendingMachineStore */ "./src/stores/vendingMachineStore.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/constants */ "./src/utils/constants.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var CoinTableComponent = /*#__PURE__*/function () {
  function CoinTableComponent($parent, _ref) {
    var tableId = _ref.tableId,
        tableCaption = _ref.tableCaption;

    _classCallCheck(this, CoinTableComponent);

    this.$parent = $parent;
    this.tableId = tableId;
    this.tableCaption = tableCaption;
    this.mount();
    this.initDOM();
    this.subscribeStore();
  }

  _createClass(CoinTableComponent, [{
    key: "mount",
    value: function mount() {
      this.$parent.insertAdjacentHTML('beforeend', this.generateTemplate());
    }
  }, {
    key: "generateTemplate",
    value: function generateTemplate() {
      return "<table id=\"".concat(this.tableId, "\">\n        <caption>\n          ").concat(this.tableCaption, "\n        </caption>\n        <tbody>\n          <tr>\n            <th>\uB3D9\uC804</th>\n            <th>\uAC1C\uC218</th>\n          </tr>\n          <tr>\n            <td>500\uC6D0</td>\n            <td ><span id=\"hold-coin-500-count\">0</span>\uAC1C</td>\n          </tr>\n          <tr>\n            <td>100\uC6D0</td>\n            <td ><span id=\"hold-coin-100-count\">0</span>\uAC1C</td>\n          </tr>\n          <tr>\n            <td>50\uC6D0</td>\n            <td ><span id=\"hold-coin-50-count\">0</span>\uAC1C</td>\n          </tr>\n          <tr>\n            <td>10\uC6D0</td>\n            <td><span id=\"hold-coin-10-count\">0</span>\uAC1C</td>\n          </tr>\n        </tbody>\n      </table>");
    }
  }, {
    key: "initDOM",
    value: function initDOM() {
      this.$tableData500 = this.$parent.querySelector('#hold-coin-500-count');
      this.$tableData100 = this.$parent.querySelector('#hold-coin-100-count');
      this.$tableData50 = this.$parent.querySelector('#hold-coin-50-count');
      this.$tableData10 = this.$parent.querySelector('#hold-coin-10-count');
    }
  }, {
    key: "subscribeStore",
    value: function subscribeStore() {
      if (this.tableId === 'recharge-coin-table') {
        _stores_vendingMachineStore__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.VENDING_MACHINE_STATE_KEYS.COIN_WALLET, this);
      }
    }
  }, {
    key: "wakeUp",
    value: function wakeUp() {
      if (this.tableId === 'recharge-coin-table') {
        var coinWallet = _stores_vendingMachineStore__WEBPACK_IMPORTED_MODULE_0__["default"].getState(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.VENDING_MACHINE_STATE_KEYS.COIN_WALLET, this);
        this.renderRechargeCoinTable(coinWallet);
      }
    }
  }, {
    key: "renderRechargeCoinTable",
    value: function renderRechargeCoinTable(coinWallet) {
      var _coinWallet$getCoinWa = coinWallet.getCoinWalletInfo(),
          coin500 = _coinWallet$getCoinWa.coin500,
          coin100 = _coinWallet$getCoinWa.coin100,
          coin50 = _coinWallet$getCoinWa.coin50,
          coin10 = _coinWallet$getCoinWa.coin10;

      this.$tableData500.textContent = "".concat(coin500);
      this.$tableData100.textContent = "".concat(coin100);
      this.$tableData50.textContent = "".concat(coin50);
      this.$tableData10.textContent = "".concat(coin10);
    }
  }]);

  return CoinTableComponent;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CoinTableComponent);

/***/ }),

/***/ "./src/components/common/ProductTableComponent.js":
/*!********************************************************!*\
  !*** ./src/components/common/ProductTableComponent.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _stores_vendingMachineStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../stores/vendingMachineStore */ "./src/stores/vendingMachineStore.ts");
/* harmony import */ var _utils_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/validation */ "./src/utils/validation.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var ProductTableComponent = /*#__PURE__*/function () {
  function ProductTableComponent($parent, _ref) {
    var _this = this;

    var tableId = _ref.tableId,
        tableCaption = _ref.tableCaption;

    _classCallCheck(this, ProductTableComponent);

    _defineProperty(this, "onClickTable", function (e) {
      e.preventDefault();
      var _e$target = e.target,
          classList = _e$target.classList,
          productId = _e$target.dataset.productId;
      var parentElement = e.target.closest('.product-row');

      if (classList.contains('product-edit-button')) {
        _this.onClickEditButton(parentElement, classList);
      }

      if (classList.contains('product-delete-button')) {
        _this.onClickDeleteButton(productId);
      }

      if (classList.contains('product-confirm-button')) {
        _this.onClickConfirmButton(parentElement, classList, productId);
      }
    });

    _defineProperty(this, "onClickEditButton", function (parentElement, editButtonClassList) {
      /** 모든 상품 엘리먼트 (tr) 에 대한 td 엘리먼트들을 미리 찾아두고 이벤트가 발생하면 참조만 하게끔 로직을 구현하는 것이 효율적이겠죠? */
      var nameTableData = parentElement.querySelector("td.product-row-name");
      var priceTableData = parentElement.querySelector("td.product-row-price");
      var quantityTableData = parentElement.querySelector("td.product-row-quantity");
      nameTableData.innerHTML = "<input type=\"text\" id=\"product-name-edit-input\"   value=\"".concat(nameTableData.dataset.productName, "\"/>");
      priceTableData.innerHTML = "<input type=\"number\" id=\"product-price-edit-input\"   value=\"".concat(priceTableData.dataset.productPrice, "\"/>");
      quantityTableData.innerHTML = "<input type=\"number\" id=\"product-quantity-edit-input\"  value=\"".concat(quantityTableData.dataset.productQuantity, "\"/>");

      _this.showConfirmButton(parentElement, editButtonClassList);
    });

    _defineProperty(this, "onClickConfirmButton", function (parentElement, confirmButtonClassList, productId) {
      var _parentElement$queryS = parentElement.querySelector('#product-name-edit-input'),
          name = _parentElement$queryS.value;

      var _parentElement$queryS2 = parentElement.querySelector('#product-price-edit-input'),
          price = _parentElement$queryS2.valueAsNumber;

      var _parentElement$queryS3 = parentElement.querySelector('#product-quantity-edit-input'),
          quantity = _parentElement$queryS3.valueAsNumber;

      try {
        if ((0,_utils_validation__WEBPACK_IMPORTED_MODULE_2__.checkProductInput)({
          nameInput: name,
          priceInput: price,
          quantityInput: quantity
        })) {
          _stores_vendingMachineStore__WEBPACK_IMPORTED_MODULE_1__["default"].mutateState({
            actionType: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.ACTION_TYPES.EDIT_PRODUCT,
            payload: {
              id: productId,
              name: name,
              price: price,
              quantity: quantity
            },
            stateKey: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST
          });

          _this.showEditAndDeleteButton(parentElement, confirmButtonClassList);
        }
      } catch (_ref2) {
        var message = _ref2.message;
        alert(message);
      }
    });

    this.$parent = $parent;
    this.tableId = tableId;
    this.tableCaption = tableCaption;
    this.mount();
    this.initDOM();
    this.subscribeStore();
    this.bindEventHandler();
  }

  _createClass(ProductTableComponent, [{
    key: "mount",
    value: function mount() {
      this.$parent.insertAdjacentHTML('beforeend', this.generateTemplate());
    }
  }, {
    key: "initDOM",
    value: function initDOM() {
      this.$productTable = this.$parent.querySelector("#".concat(this.tableId));
      this.$tableBody = this.$parent.querySelector('.product-list-table-body');
      this.$emptyImg = this.$parent.querySelector('.empty-img');
    }
  }, {
    key: "generateTemplate",
    value: function generateTemplate() {
      return "<table id=\"".concat(this.tableId, "\" class=\"product-list\">\n        <caption>\n         ").concat(this.tableCaption, "\n        </caption>\n        <tbody class=\"product-list-table-body\">\n        <tr>\n          <th>\uC0C1\uD488\uBA85</th>\n          <th>\uAC00\uACA9</th>\n          <th>\uC218\uB7C9</th>\n          <th>").concat(this.tableId === 'purchase-product-list' ? '구매' : '', "</th>\n        </tr>\n        </tbody>\n      </table>\n      <div class=\"empty-img\"><img src=\"./empty-img.png\" width=\"200px\" height=\"200px\"></img></div>\n      ");
    }
  }, {
    key: "subscribeStore",
    value: function subscribeStore() {
      _stores_vendingMachineStore__WEBPACK_IMPORTED_MODULE_1__["default"].subscribe(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST, this);
    }
  }, {
    key: "bindEventHandler",
    value: function bindEventHandler() {
      this.$productTable.addEventListener('click', this.onClickTable);
    }
  }, {
    key: "wakeUp",
    value: function wakeUp() {
      var productList = _stores_vendingMachineStore__WEBPACK_IMPORTED_MODULE_1__["default"].getState(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST, this);
      this.render(productList);
    }
  }, {
    key: "render",
    value: function render(productList) {
      if (productList.length === 0) {
        this.$emptyImg.classList.remove('hide');
      }

      if (productList.length !== 0) {
        this.$emptyImg.classList.add('hide');
      }

      this.$tableBody.innerHTML = "<tr>\n        <th>\uC0C1\uD488\uBA85</th>\n        <th>\uAC00\uACA9</th>\n        <th>\uC218\uB7C9</th>\n        <th>".concat(this.tableId === 'purchase-product-list' ? '구매' : '', "</th>\n    </tr>\n    ").concat(this.generateProductListTemplate(productList));
    }
  }, {
    key: "generateProductListTemplate",
    value: function generateProductListTemplate(productList) {
      var _this2 = this;

      return productList.reduce(function (prev, product) {
        var _product$getProductIn = product.getProductInfo(),
            id = _product$getProductIn.id,
            name = _product$getProductIn.name,
            price = _product$getProductIn.price,
            quantity = _product$getProductIn.quantity;

        return "".concat(prev, "\n        <tr class=\"product-row\">\n          <td class=\"product-row-name\" data-product-name='").concat(name, "'>").concat(name, "</td>\n          <td class=\"product-row-price\" data-product-price='").concat(price, "'>").concat(price, "</td>\n          <td class=\"product-row-quantity\" data-product-quantity='").concat(quantity, "'>").concat(quantity, "</td>\n          <td>\n            ").concat(_this2.generateButton(id), "\n          </td>\n      </tr>\n      ");
      }, '');
    }
  }, {
    key: "generateButton",
    value: function generateButton(id) {
      if (this.tableId === 'current-product-list') {
        return "<button\n        type=\"button\"\n        class=\"product-edit-button gray-button\"\n        data-product-id=\"".concat(id, "\"\n      >\n        \uC218\uC815\n      </button>\n      <button\n        type=\"button\"\n        class=\"product-delete-button gray-button\"\n        data-product-id=\"").concat(id, "\"\n      >\n        \uC0AD\uC81C\n      </button>\n      <button\n        type=\"button\"\n        class=\"product-confirm-button gray-button hide\"\n        data-product-id=\"").concat(id, "\"\n      >\n        \uD655\uC778\n      </button>");
      }
      /** 구매 기능 요구사항도 이번 스텝에 포함되는 줄 알고 미리 작성.. 했네요 .. */


      if (this.tableId === 'purchase-product-list') {
        return "  <button\n        type=\"button\"\n        class=\"product-purchase-button gray-button\"\n        data-product-id=\"".concat(id, "\"\n      >\n        \uAD6C\uB9E4\n      </button>");
      }

      return '';
    }
  }, {
    key: "onClickDeleteButton",
    value: function onClickDeleteButton(productId) {
      if (confirm('정말로 삭제하시겠습니까?')) {
        _stores_vendingMachineStore__WEBPACK_IMPORTED_MODULE_1__["default"].mutateState({
          actionType: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.ACTION_TYPES.DELETE_PRODUCT,
          payload: {
            id: productId
          },
          stateKey: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST
        });
      }
    }
  }, {
    key: "showConfirmButton",
    value: function showConfirmButton(parentElement, editButtonClassList) {
      /** 모든 상품 엘리먼트 (tr) 에 대한 button 엘리먼트들을 미리 찾아두고 이벤트가 발생하면 참조만 하게끔 로직을 구현하는 것이 효율적이겠죠? */
      var deleteButton = parentElement.querySelector('.product-delete-button');
      var confirmButton = parentElement.querySelector('.product-confirm-button');
      editButtonClassList.add('hide');
      deleteButton.classList.add('hide');
      confirmButton.classList.remove('hide');
    }
  }, {
    key: "showEditAndDeleteButton",
    value: function showEditAndDeleteButton(parentElement, confirmButtonClassList) {
      /** 모든 상품 엘리먼트 (tr) 에 대한 button 엘리먼트들을 미리 찾아두고 이벤트가 발생하면 참조만 하게끔 로직을 구현하는 것이 효율적이겠죠? */
      var editButton = parentElement.querySelector('.product-edit-button');
      var deleteButton = parentElement.querySelector('.product-delete-button');
      confirmButtonClassList.add('hide');
      editButton.classList.remove('hide');
      deleteButton.classList.remove('hide');
    }
  }]);

  return ProductTableComponent;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductTableComponent);

/***/ }),

/***/ "./src/components/index.js":
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProductManagementComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductManagementComponent */ "./src/components/ProductManagementComponent.js");
/* harmony import */ var _PurchaseProductComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PurchaseProductComponent */ "./src/components/PurchaseProductComponent.js");
/* harmony import */ var _RechargeChangeComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RechargeChangeComponent */ "./src/components/RechargeChangeComponent.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }





var _ProductManagementComponent = /*#__PURE__*/new WeakMap();

var _PurchaseProductComponent = /*#__PURE__*/new WeakMap();

var _RechargeChangeComponent = /*#__PURE__*/new WeakMap();

var VendingMachineComponent = /*#__PURE__*/function () {
  function VendingMachineComponent(hashRoute) {
    _classCallCheck(this, VendingMachineComponent);

    _classPrivateFieldInitSpec(this, _ProductManagementComponent, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _PurchaseProductComponent, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _RechargeChangeComponent, {
      writable: true,
      value: void 0
    });

    _defineProperty(this, "$app", void 0);

    this.$app = document.querySelector('#app');
    this.initDOM();
    this.initChildComponents();
    this.showSectionByRoute(hashRoute);
  }

  _createClass(VendingMachineComponent, [{
    key: "initDOM",
    value: function initDOM() {
      this.tabButtonMap = {
        manageProduct: this.$app.querySelector('#manage-product-tab'),
        rechargeChange: this.$app.querySelector('#recharge-change-tab'),
        purchaseProduct: this.$app.querySelector('#purchase-product-tab')
      };
    }
  }, {
    key: "initChildComponents",
    value: function initChildComponents() {
      _classPrivateFieldSet(this, _ProductManagementComponent, new _ProductManagementComponent__WEBPACK_IMPORTED_MODULE_0__["default"](this.$app));

      _classPrivateFieldSet(this, _PurchaseProductComponent, new _PurchaseProductComponent__WEBPACK_IMPORTED_MODULE_1__["default"](this.$app));

      _classPrivateFieldSet(this, _RechargeChangeComponent, new _RechargeChangeComponent__WEBPACK_IMPORTED_MODULE_2__["default"](this.$app));
    }
  }, {
    key: "showSectionByRoute",
    value: function showSectionByRoute(route) {
      if (route === '') {
        _classPrivateFieldGet(this, _RechargeChangeComponent).hide();

        _classPrivateFieldGet(this, _PurchaseProductComponent).hide();

        _classPrivateFieldGet(this, _ProductManagementComponent).show();

        this.focusTabButton('manageProduct');
      }

      if (route === 'recharge') {
        _classPrivateFieldGet(this, _PurchaseProductComponent).hide();

        _classPrivateFieldGet(this, _ProductManagementComponent).hide();

        _classPrivateFieldGet(this, _RechargeChangeComponent).show();

        this.focusTabButton('rechargeChange');
      }

      if (route === 'purchase') {
        _classPrivateFieldGet(this, _ProductManagementComponent).hide();

        _classPrivateFieldGet(this, _RechargeChangeComponent).hide();

        _classPrivateFieldGet(this, _PurchaseProductComponent).show();

        this.focusTabButton('purchaseProduct');
      }
    }
  }, {
    key: "focusTabButton",
    value: function focusTabButton(buttonName) {
      Object.entries(this.tabButtonMap).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            node = _ref2[1];

        if (key === buttonName) {
          node.classList.add('checked');
          return;
        }

        node.classList.remove('checked');
      });
    }
  }]);

  return VendingMachineComponent;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VendingMachineComponent);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/app.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/app.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_color_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./color.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/color.css");
// Imports



var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_color_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  padding: 64px 0;\n  background-color: var(--body-background-color);\n}\n#app {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n\n  max-width: 600px;\n  margin: 0 auto;\n  border: 1px solid var(--app-border-color);\n  background-color: #fff;\n  border-radius: 4px;\n}\n\nnav {\n  display: flex;\n  width: 359px;\n  margin-bottom: 50px;\n  gap: 4px;\n}\nbutton {\n  width: 100%;\n  cursor: pointer;\n}\n\nbutton.gray-button {\n  background-color: var(--button-gray-background-color);\n  border: 0;\n  border-radius: 4px;\n  padding: 5px 10px;\n}\n\na.tab-button.checked {\n  background-color: var(--button-hover-background-color);\n}\n\nbutton:hover {\n  background-color: var(--button-hover-background-color);\n}\n\n#return-change-button {\n  width: 100px;\n}\n\na.tab-button {\n  width: 100%;\n  background-color: var(--button-gray-background-color);\n  border: 0;\n  border-radius: 4px;\n  padding: 5px 10px;\n  text-decoration: none;\n  color: #000000;\n  text-align: center;\n}\na.tab-button:hover {\n  background-color: var(--button-hover-background-color);\n}\n.hide {\n  display: none;\n  visibility: none;\n  opacity: 0;\n}\n", "",{"version":3,"sources":["webpack://./src/styles/app.css"],"names":[],"mappings":"AACA;EACE,eAAe;EACf,8CAA8C;AAChD;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;;EAEnB,gBAAgB;EAChB,cAAc;EACd,yCAAyC;EACzC,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,mBAAmB;EACnB,QAAQ;AACV;AACA;EACE,WAAW;EACX,eAAe;AACjB;;AAEA;EACE,qDAAqD;EACrD,SAAS;EACT,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,sDAAsD;AACxD;;AAEA;EACE,sDAAsD;AACxD;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,WAAW;EACX,qDAAqD;EACrD,SAAS;EACT,kBAAkB;EAClB,iBAAiB;EACjB,qBAAqB;EACrB,cAAc;EACd,kBAAkB;AACpB;AACA;EACE,sDAAsD;AACxD;AACA;EACE,aAAa;EACb,gBAAgB;EAChB,UAAU;AACZ","sourcesContent":["@import url('./color.css');\nbody {\n  padding: 64px 0;\n  background-color: var(--body-background-color);\n}\n#app {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n\n  max-width: 600px;\n  margin: 0 auto;\n  border: 1px solid var(--app-border-color);\n  background-color: #fff;\n  border-radius: 4px;\n}\n\nnav {\n  display: flex;\n  width: 359px;\n  margin-bottom: 50px;\n  gap: 4px;\n}\nbutton {\n  width: 100%;\n  cursor: pointer;\n}\n\nbutton.gray-button {\n  background-color: var(--button-gray-background-color);\n  border: 0;\n  border-radius: 4px;\n  padding: 5px 10px;\n}\n\na.tab-button.checked {\n  background-color: var(--button-hover-background-color);\n}\n\nbutton:hover {\n  background-color: var(--button-hover-background-color);\n}\n\n#return-change-button {\n  width: 100px;\n}\n\na.tab-button {\n  width: 100%;\n  background-color: var(--button-gray-background-color);\n  border: 0;\n  border-radius: 4px;\n  padding: 5px 10px;\n  text-decoration: none;\n  color: #000000;\n  text-align: center;\n}\na.tab-button:hover {\n  background-color: var(--button-hover-background-color);\n}\n.hide {\n  display: none;\n  visibility: none;\n  opacity: 0;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/color.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/color.css ***!
  \********************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --body-background-color: #f9f9f9;\n\n  --app-border-color: rgba(0, 0, 0, 0.12);\n\n  --button-skyblue-background-color: #00bcd4;\n  --button-skyblue-font-color: #ffffff;\n  --button-gray-background-color: #f5f5f5;\n  --button-gray-font-color: #111;\n\n  --button-hover-background-color: rgba(0, 188, 212, 0.16);\n  --label-font-color: rgba(0, 0, 0, 0.87);\n  --input-border-color: #8b8b8b;\n\n  --table-division-color: #dcdcdc;\n}\n", "",{"version":3,"sources":["webpack://./src/styles/color.css"],"names":[],"mappings":"AAAA;EACE,gCAAgC;;EAEhC,uCAAuC;;EAEvC,0CAA0C;EAC1C,oCAAoC;EACpC,uCAAuC;EACvC,8BAA8B;;EAE9B,wDAAwD;EACxD,uCAAuC;EACvC,6BAA6B;;EAE7B,+BAA+B;AACjC","sourcesContent":[":root {\n  --body-background-color: #f9f9f9;\n\n  --app-border-color: rgba(0, 0, 0, 0.12);\n\n  --button-skyblue-background-color: #00bcd4;\n  --button-skyblue-font-color: #ffffff;\n  --button-gray-background-color: #f5f5f5;\n  --button-gray-font-color: #111;\n\n  --button-hover-background-color: rgba(0, 188, 212, 0.16);\n  --label-font-color: rgba(0, 0, 0, 0.87);\n  --input-border-color: #8b8b8b;\n\n  --table-division-color: #dcdcdc;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/form.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/form.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_color_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./color.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/color.css");
// Imports



var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_color_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".input-form {\n  width: 400px;\n}\n.input-form label {\n  color: var(--label-font-color);\n}\n\n.input-form .input-wrapper {\n  display: flex;\n  gap: 4px;\n}\n.input-form input {\n  width: 100%;\n  border-radius: 4px;\n  border: 1px solid var(--input-border-color);\n  padding: 7px 5px;\n  flex: 1;\n}\n.input-form .submit-button {\n  width: 56px;\n  background-color: var(--button-skyblue-background-color);\n  color: var(--button-skyblue-font-color);\n  border: none;\n  border-radius: 4px;\n  margin-left: 10px;\n}\n\n.input-form .submit-button:hover {\n  opacity: 0.8;\n}\n\n.input-form * {\n  margin-top: 5px;\n}\n", "",{"version":3,"sources":["webpack://./src/styles/form.css"],"names":[],"mappings":"AACA;EACE,YAAY;AACd;AACA;EACE,8BAA8B;AAChC;;AAEA;EACE,aAAa;EACb,QAAQ;AACV;AACA;EACE,WAAW;EACX,kBAAkB;EAClB,2CAA2C;EAC3C,gBAAgB;EAChB,OAAO;AACT;AACA;EACE,WAAW;EACX,wDAAwD;EACxD,uCAAuC;EACvC,YAAY;EACZ,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,eAAe;AACjB","sourcesContent":["@import url('./color.css');\n.input-form {\n  width: 400px;\n}\n.input-form label {\n  color: var(--label-font-color);\n}\n\n.input-form .input-wrapper {\n  display: flex;\n  gap: 4px;\n}\n.input-form input {\n  width: 100%;\n  border-radius: 4px;\n  border: 1px solid var(--input-border-color);\n  padding: 7px 5px;\n  flex: 1;\n}\n.input-form .submit-button {\n  width: 56px;\n  background-color: var(--button-skyblue-background-color);\n  color: var(--button-skyblue-font-color);\n  border: none;\n  border-radius: 4px;\n  margin-left: 10px;\n}\n\n.input-form .submit-button:hover {\n  opacity: 0.8;\n}\n\n.input-form * {\n  margin-top: 5px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/index.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/index.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_color_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./color.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/color.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./app.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/app.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_form_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./form.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/form.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_table_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./table.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/table.css");
// Imports






var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_color_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_3__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_form_css__WEBPACK_IMPORTED_MODULE_4__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_table_css__WEBPACK_IMPORTED_MODULE_5__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/table.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/table.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_color_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./color.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/color.css");
// Imports



var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_color_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "table {\n  border-collapse: collapse;\n  margin-top: 50px;\n  margin-bottom: 20px;\n  min-width: 200px;\n}\n\ncaption {\n  font-size: 20px;\n  font-weight: bold;\n  text-align: center;\n  margin-bottom: 16px;\n}\n\ntbody {\n  min-width: 200px;\n}\n\ntbody tr {\n  border-top: 1px solid var(--table-division-color);\n  border-bottom: 1px solid var(--table-division-color);\n}\n\ntbody tr td,\ntable tr th {\n  width: 100px;\n}\n\ntbody tr td:last-child {\n  display: flex;\n  gap: 5px;\n  justify-content: center;\n}\ntbody tr td,\ntbody tr th {\n  text-align: center;\n  padding: 10px 0;\n}\n\nsection {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\ntbody tr td input:read-only {\n  border: none;\n  outline: none;\n  display: flex;\n  justify-content: center;\n}\ntbody tr td input {\n  text-align: center;\n  color: #111;\n  padding: 5px 0;\n}\n", "",{"version":3,"sources":["webpack://./src/styles/table.css"],"names":[],"mappings":"AAEA;EACE,yBAAyB;EACzB,gBAAgB;EAChB,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,iDAAiD;EACjD,oDAAoD;AACtD;;AAEA;;EAEE,YAAY;AACd;;AAEA;EACE,aAAa;EACb,QAAQ;EACR,uBAAuB;AACzB;AACA;;EAEE,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,aAAa;EACb,uBAAuB;AACzB;AACA;EACE,kBAAkB;EAClB,WAAW;EACX,cAAc;AAChB","sourcesContent":["@import './color.css';\n\ntable {\n  border-collapse: collapse;\n  margin-top: 50px;\n  margin-bottom: 20px;\n  min-width: 200px;\n}\n\ncaption {\n  font-size: 20px;\n  font-weight: bold;\n  text-align: center;\n  margin-bottom: 16px;\n}\n\ntbody {\n  min-width: 200px;\n}\n\ntbody tr {\n  border-top: 1px solid var(--table-division-color);\n  border-bottom: 1px solid var(--table-division-color);\n}\n\ntbody tr td,\ntable tr th {\n  width: 100px;\n}\n\ntbody tr td:last-child {\n  display: flex;\n  gap: 5px;\n  justify-content: center;\n}\ntbody tr td,\ntbody tr th {\n  text-align: center;\n  padding: 10px 0;\n}\n\nsection {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\ntbody tr td input:read-only {\n  border: none;\n  outline: none;\n  display: flex;\n  justify-content: center;\n}\ntbody tr td input {\n  text-align: center;\n  color: #111;\n  padding: 5px 0;\n}\n"],"sourceRoot":""}]);
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

/***/ "./images/empty-img.png":
/*!******************************!*\
  !*** ./images/empty-img.png ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "empty-img.png");

/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/index.css");

      
      
      
      
      
      
      
      
      

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

/***/ "./src/domains/coinWallet.ts":
/*!***********************************!*\
  !*** ./src/domains/coinWallet.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");
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

var CoinWallet = /** @class */ (function () {
    function CoinWallet() {
        this.coinWallet = {
            coin500: 0,
            coin100: 0,
            coin50: 0,
            coin10: 0
        };
    }
    CoinWallet.prototype.rechargeCoinWallet = function (charge) {
        var _this = this;
        var coinWallet = this.generateRandomCoinInfo(charge);
        Object.keys(coinWallet).forEach(function (key) { return (_this.coinWallet[key] += coinWallet[key]); });
    };
    CoinWallet.prototype.computeCoinTotalAmount = function () {
        var _this = this;
        return Object.keys(this.coinWallet).reduce(function (prev, key) { return prev + _this.coinWallet[key] * _utils_constants__WEBPACK_IMPORTED_MODULE_0__.COIN_VALUES[key]; }, 0);
    };
    CoinWallet.prototype.generateRandomCoinInfo = function (charge) {
        var coinWalletInfo = { coin500: 0, coin100: 0, coin50: 0, coin10: 0 };
        while (charge > 0) {
            var coinKey = this.pickRandomCoinKey();
            var coin = _utils_constants__WEBPACK_IMPORTED_MODULE_0__.COIN_VALUES[coinKey];
            if (coin <= charge) {
                charge -= coin;
                coinWalletInfo[coinKey]++;
            }
        }
        return coinWalletInfo;
    };
    CoinWallet.prototype.returnChangeCoinInfo = function (change) {
        var returnCoinInfo = {
            coin500: 0,
            coin100: 0,
            coin50: 0,
            coin10: 0
        };
        var currentCoinTotalAmount = this.computeCoinTotalAmount();
        if (currentCoinTotalAmount <= change) {
            var currentCoinWallet = __assign({}, this.coinWallet);
            this.coinWallet = returnCoinInfo;
            return currentCoinWallet;
        }
        while (change > 0) {
            var maxCoinKey = this.findMaxCoinKey(change);
            var maxCoinValue = _utils_constants__WEBPACK_IMPORTED_MODULE_0__.COIN_VALUES[maxCoinKey];
            change -= maxCoinValue;
            returnCoinInfo[maxCoinKey]++;
            this.coinWallet[maxCoinKey]--;
        }
        return returnCoinInfo;
    };
    CoinWallet.prototype.pickRandomCoinKey = function () {
        var randomIndex = Math.floor(Math.random() * _utils_constants__WEBPACK_IMPORTED_MODULE_0__.COIN_KEYS.length);
        return _utils_constants__WEBPACK_IMPORTED_MODULE_0__.COIN_KEYS[randomIndex];
    };
    CoinWallet.prototype.findMaxCoinKey = function (change) {
        var _this = this;
        return _utils_constants__WEBPACK_IMPORTED_MODULE_0__.COIN_KEYS.find(function (coinKey) { return _this.coinWallet[coinKey] !== 0 && change >= _utils_constants__WEBPACK_IMPORTED_MODULE_0__.COIN_VALUES[coinKey]; });
    };
    CoinWallet.prototype.getCoinWalletInfo = function () {
        return this.coinWallet;
    };
    return CoinWallet;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CoinWallet);


/***/ }),

/***/ "./src/domains/product.ts":
/*!********************************!*\
  !*** ./src/domains/product.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");
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
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

var generateNonDuplicatedId = (function () {
    var memo = {};
    function generateId(name) {
        return "".concat(name).concat(__spreadArray([], new Array(10), true).map(function () { return Math.floor(Math.random() * 10); }).join(''));
    }
    return {
        generateNonDuplicatedId: function (name) {
            var id = generateId(name);
            while (memo[id]) {
                id = generateId(name);
            }
            memo[id] = id;
            return id;
        }
    };
})().generateNonDuplicatedId;
var Product = /** @class */ (function () {
    function Product(name, price, quantity) {
        this.product = {
            id: generateNonDuplicatedId(name),
            name: name,
            price: price,
            quantity: quantity
        };
    }
    Product.prototype.purchaseProduct = function () {
        if (this.product.quantity === 0) {
            throw new Error(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MSG.PRODUCT_SOLD_OUT);
        }
        this.product.quantity--;
    };
    Product.prototype.getProductInfo = function () {
        return this.product;
    };
    Product.prototype.editProductInfo = function (_a) {
        var name = _a.name, price = _a.price, quantity = _a.quantity;
        this.product = __assign(__assign({}, this.product), { name: name !== null && name !== void 0 ? name : this.product.name, price: price !== null && price !== void 0 ? price : this.product.price, quantity: quantity !== null && quantity !== void 0 ? quantity : this.product.quantity });
    };
    return Product;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Product);


/***/ }),

/***/ "./src/stores/vendingMachineStore.ts":
/*!*******************************************!*\
  !*** ./src/stores/vendingMachineStore.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _domains_coinWallet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domains/coinWallet */ "./src/domains/coinWallet.ts");
/* harmony import */ var _domains_product__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../domains/product */ "./src/domains/product.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");



var VendingMachineStore = /** @class */ (function () {
    function VendingMachineStore() {
        var _a;
        var _this = this;
        this.reducer = (_a = {},
            _a[_utils_constants__WEBPACK_IMPORTED_MODULE_2__.ACTION_TYPES.ADD_PRODUCT] = function (payload) {
                var name = payload.name, price = payload.price, quantity = payload.quantity;
                var product = new _domains_product__WEBPACK_IMPORTED_MODULE_1__["default"](name, price, quantity);
                /** 무언가.. 객체를 직접 변경하는 것 같죠..? 얕은 복사를 수행한 배열 데이터를 조작하여 그 배열 데이터를 set 해주어야 할 것 같은데 */
                _this.state.PRODUCT_LIST.push(product);
                /** 아래 방법으로 수행하는 것과 위 방법으로 수행하는 것 - 둘은 어떤 문제를 막고 어떤 문제를 발생시킬 수 있나요.? */
                // this.state.PRODUCT_LIST = [...this.state.PRODUCT_LIST,product];
            },
            _a[_utils_constants__WEBPACK_IMPORTED_MODULE_2__.ACTION_TYPES.EDIT_PRODUCT] = function (payload) {
                var id = payload.id, name = payload.name, price = payload.price, quantity = payload.quantity;
                /** 무언가.. 객체를 직접 변경하는 것 같죠..? 얕은 복사를 수행한 배열 데이터를 조작하여 그 배열 데이터를 set 해주어야 할 것 같은데 */
                var editProduct = _this.state.PRODUCT_LIST.find(function (product) { return product.getProductInfo().id === id; });
                editProduct.editProductInfo({ name: name, price: price, quantity: quantity });
            },
            _a[_utils_constants__WEBPACK_IMPORTED_MODULE_2__.ACTION_TYPES.DELETE_PRODUCT] = function (payload) {
                var id = payload.id;
                var deletedProductList = _this.state.PRODUCT_LIST.filter(function (product) {
                    var productId = product.getProductInfo().id;
                    return productId !== id;
                });
                _this.state.PRODUCT_LIST = deletedProductList;
            },
            _a[_utils_constants__WEBPACK_IMPORTED_MODULE_2__.ACTION_TYPES.RECHARGE_CHANGE] = function (payload) {
                var changeInput = payload.changeInput;
                _this.state.COIN_WALLET.rechargeCoinWallet(changeInput);
            },
            _a);
        this.subscribedComponents = {
            PRODUCT_LIST: [],
            COIN_WALLET: [],
            INPUT_CHARGE: []
        };
        this.state = {
            PRODUCT_LIST: [],
            COIN_WALLET: new _domains_coinWallet__WEBPACK_IMPORTED_MODULE_0__["default"](),
            INPUT_CHARGE: 0
        };
    }
    VendingMachineStore.prototype.mutateState = function (_a) {
        var actionType = _a.actionType, payload = _a.payload, stateKey = _a.stateKey;
        this.reducer[actionType](payload);
        this.notifySubscribedView(stateKey);
    };
    VendingMachineStore.prototype.subscribe = function (stateType, component) {
        this.subscribedComponents[stateType].push(component);
    };
    VendingMachineStore.prototype.getState = function (stateType, component) {
        if (this.subscribedComponents[stateType].includes(component)) {
            return this.state[stateType];
        }
        throw new Error(_utils_constants__WEBPACK_IMPORTED_MODULE_2__.ERROR_MSG.CAN_NOT_REFERENCE_STATE);
    };
    VendingMachineStore.prototype.notifySubscribedView = function (stateType) {
        this.subscribedComponents[stateType].forEach(function (component) { return component.wakeUp(); });
    };
    return VendingMachineStore;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new VendingMachineStore());


/***/ }),

/***/ "./src/utils/constants.ts":
/*!********************************!*\
  !*** ./src/utils/constants.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COIN_VALUES": () => (/* binding */ COIN_VALUES),
/* harmony export */   "COIN_KEYS": () => (/* binding */ COIN_KEYS),
/* harmony export */   "VENDING_MACHINE_STATE_KEYS": () => (/* binding */ VENDING_MACHINE_STATE_KEYS),
/* harmony export */   "ERROR_MSG": () => (/* binding */ ERROR_MSG),
/* harmony export */   "NAME_LENGTH_LIMIT": () => (/* binding */ NAME_LENGTH_LIMIT),
/* harmony export */   "PRICE_RANGE": () => (/* binding */ PRICE_RANGE),
/* harmony export */   "MONEY_DIVIDE_STANDARD": () => (/* binding */ MONEY_DIVIDE_STANDARD),
/* harmony export */   "QUANTITY_RANGE": () => (/* binding */ QUANTITY_RANGE),
/* harmony export */   "CHANGE_RANGE": () => (/* binding */ CHANGE_RANGE),
/* harmony export */   "ACTION_TYPES": () => (/* binding */ ACTION_TYPES)
/* harmony export */ });
var COIN_VALUES = {
    coin500: 500,
    coin100: 100,
    coin50: 50,
    coin10: 10
};
var COIN_KEYS = ['coin500', 'coin100', 'coin50', 'coin10'];
var VENDING_MACHINE_STATE_KEYS = {
    PRODUCT_LIST: 'PRODUCT_LIST',
    COIN_WALLET: 'COIN_WALLET',
    INPUT_CHARGE: 'INPUT_CHARGE'
};
var ERROR_MSG = {
    NAME_OVER_LIMIT_LENGTH: '상품 명은 10글자를 초과할 수 없습니다.',
    NAME_EMPTY: '상품 명을 최소 한 글자를 입력해주세요.',
    PRICE_OUT_OF_RANGE: '상품가격을 100이상 10000이하로 입력해주세요.',
    PRICE_NOT_DIVISIBLE_BY_10: '상품가격을 10으로 나누어 떨어지도록 입력해주세요.',
    QUANTITY_OUT_OF_RANGE: '상품 수량을 0이상 20이하의 수로 입력해주세요.',
    PRODUCT_SOLD_OUT: '상품이 매진되었습니다.',
    CAN_NOT_REFERENCE_STATE: '조회할 수 없는 상태값 입니다',
    CHANGE_NOT_DIVISIBLE_BY_10: '잔돈은 10으로 나누어 떨어져야합니다.',
    CHANGE_OUT_OF_RANGE: '잔돈은 10이상 100000이하의 금액을 투입하여야 합니다.'
};
var NAME_LENGTH_LIMIT = 10;
var PRICE_RANGE = {
    MIN: 100,
    MAX: 10000
};
var MONEY_DIVIDE_STANDARD = 10;
var QUANTITY_RANGE = {
    MIN: 0,
    MAX: 20
};
var CHANGE_RANGE = {
    MIN: 10,
    MAX: 100000
};
var ACTION_TYPES = {
    ADD_PRODUCT: 'addProduct',
    EDIT_PRODUCT: 'editProduct',
    DELETE_PRODUCT: 'deleteProduct',
    RECHARGE_CHANGE: 'rechargeChange'
};


/***/ }),

/***/ "./src/utils/validation.ts":
/*!*********************************!*\
  !*** ./src/utils/validation.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isOverLimitLength": () => (/* binding */ isOverLimitLength),
/* harmony export */   "isEmptyName": () => (/* binding */ isEmptyName),
/* harmony export */   "isOutOfPriceRange": () => (/* binding */ isOutOfPriceRange),
/* harmony export */   "isNotdivisibleBy10": () => (/* binding */ isNotdivisibleBy10),
/* harmony export */   "isOutOfQuantityRange": () => (/* binding */ isOutOfQuantityRange),
/* harmony export */   "checkProductInput": () => (/* binding */ checkProductInput),
/* harmony export */   "checkChangeInput": () => (/* binding */ checkChangeInput),
/* harmony export */   "isOutOfChangeRange": () => (/* binding */ isOutOfChangeRange)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/utils/constants.ts");

var isOverLimitLength = function (nameInput) { return nameInput.length > _constants__WEBPACK_IMPORTED_MODULE_0__.NAME_LENGTH_LIMIT; };
var isEmptyName = function (nameInput) { return nameInput.length === 0; };
var isOutOfPriceRange = function (priceInput) {
    return priceInput < _constants__WEBPACK_IMPORTED_MODULE_0__.PRICE_RANGE.MIN || priceInput > _constants__WEBPACK_IMPORTED_MODULE_0__.PRICE_RANGE.MAX;
};
var isNotdivisibleBy10 = function (priceInput) { return priceInput % _constants__WEBPACK_IMPORTED_MODULE_0__.MONEY_DIVIDE_STANDARD !== 0; };
var isOutOfQuantityRange = function (qauntityInput) {
    return qauntityInput < _constants__WEBPACK_IMPORTED_MODULE_0__.QUANTITY_RANGE.MIN || qauntityInput > _constants__WEBPACK_IMPORTED_MODULE_0__.QUANTITY_RANGE.MAX;
};
var checkProductInput = function (_a) {
    var nameInput = _a.nameInput, priceInput = _a.priceInput, quantityInput = _a.quantityInput;
    if (isOverLimitLength(nameInput)) {
        throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MSG.NAME_OVER_LIMIT_LENGTH);
    }
    if (isEmptyName(nameInput)) {
        throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MSG.NAME_EMPTY);
    }
    if (isOutOfPriceRange(priceInput)) {
        throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MSG.PRICE_OUT_OF_RANGE);
    }
    if (isNotdivisibleBy10(priceInput)) {
        throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MSG.PRICE_NOT_DIVISIBLE_BY_10);
    }
    if (isOutOfQuantityRange(quantityInput)) {
        throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MSG.QUANTITY_OUT_OF_RANGE);
    }
    return true;
};
var checkChangeInput = function (changeInput) {
    if (isNotdivisibleBy10(changeInput)) {
        throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MSG.CHANGE_NOT_DIVISIBLE_BY_10);
    }
    if (isOutOfChangeRange(changeInput)) {
        throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MSG.CHANGE_OUT_OF_RANGE);
    }
    return true;
};
var isOutOfChangeRange = function (changeInput) {
    return changeInput < _constants__WEBPACK_IMPORTED_MODULE_0__.CHANGE_RANGE.MIN || changeInput > _constants__WEBPACK_IMPORTED_MODULE_0__.CHANGE_RANGE.MAX;
};


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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
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
/* harmony import */ var _images_empty_img_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../images/empty-img.png */ "./images/empty-img.png");
/* harmony import */ var _src_styles_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/styles/index.css */ "./src/styles/index.css");
/* harmony import */ var _src_components_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/components/index */ "./src/components/index.js");




var hashRoute = window.location.hash.replace('#', '');
var vendingMachineComponent = new _src_components_index__WEBPACK_IMPORTED_MODULE_2__["default"](hashRoute);
window.addEventListener('hashchange', function () {
    var hash = window.location.hash.replace('#', '');
    vendingMachineComponent.showSectionByRoute(hash);
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map