/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _pages_product_manage_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/product-manage.page */ "./src/js/pages/product-manage.page.js");
/* harmony import */ var _pages_changes_manage_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/changes-manage.page */ "./src/js/pages/changes-manage.page.js");
/* harmony import */ var _pages_product_purchase_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/product-purchase.page */ "./src/js/pages/product-purchase.page.js");
/* harmony import */ var _util_checkLogin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util/checkLogin */ "./src/js/util/checkLogin.js");
/* harmony import */ var _util_event__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util/event */ "./src/js/util/event.js");









var App = /*#__PURE__*/(0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(function App() {
  var _this = this;

  (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, App);

  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "onClickNavButton", function (_ref) {
    var target = _ref.target;

    if (target.classList.contains("product-management-button")) {
      _this.$page.innerHTML = "<product-manage></product-manage>";
    }

    if (target.classList.contains("changes-charge-button")) {
      _this.$page.innerHTML = "<changes-manage></changes-manage>";
    }

    if (target.classList.contains("product-purchase-button")) {
      _this.$page.innerHTML = "<product-purchase></product-purchase>";
    }
  });

  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "onChangePage", function () {
    var hash = location.hash;

    if (hash === "#!productManagement") {
      _this.$page.innerHTML = "<product-manage></product-manage>";
    }

    if (hash === "#!changesCharge") {
      _this.$page.innerHTML = "<changes-manage></changes-manage>";
    }

    if (hash === "#!productPurchase") {
      _this.$page.innerHTML = "<product-purchase></product-purchase>";
    }
  });

  this.$nav = document.querySelector("#page-tab-container");
  this.$page = document.querySelector("#page");
  (0,_util_event__WEBPACK_IMPORTED_MODULE_7__.addEvent)(this.$nav, "click", this.onClickNavButton);
  (0,_util_event__WEBPACK_IMPORTED_MODULE_7__.addEvent)(window, "hashchange", this.onChangePage);
  this.onChangePage();
});

if ((0,_util_checkLogin__WEBPACK_IMPORTED_MODULE_6__["default"])()) {
  new App();
}

/***/ }),

/***/ "./src/js/components/amount-input.js":
/*!*******************************************!*\
  !*** ./src/js/components/amount-input.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _domain_productPurchaseMachine_ts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../domain/productPurchaseMachine.ts */ "./src/js/domain/productPurchaseMachine.ts");
/* harmony import */ var _util_event__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/event */ "./src/js/util/event.js");
/* harmony import */ var _util_snackbar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/snackbar */ "./src/js/util/snackbar.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }





var AmountInput = /*#__PURE__*/function (_HTMLElement) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(AmountInput, _HTMLElement);

  var _super = _createSuper(AmountInput);

  function AmountInput() {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, AmountInput);

    _this = _super.call(this);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "onSubmit", function (e) {
      e.preventDefault();
      var money = _this.$amountInput.valueAsNumber;

      try {
        _domain_productPurchaseMachine_ts__WEBPACK_IMPORTED_MODULE_8__.productPurchaseMachine.charge(money);

        _this.renderHaveAmount();
      } catch (err) {
        (0,_util_snackbar__WEBPACK_IMPORTED_MODULE_10__["default"])(_this.$snackbar, err.message);
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "renderHaveAmount", function () {
      var amount = _domain_productPurchaseMachine_ts__WEBPACK_IMPORTED_MODULE_8__.productPurchaseMachine.getChargedMoney();
      _this.$haveAmount.innerText = "\uD22C\uC785\uB41C \uAE08\uC561: ".concat(amount, "\uC6D0");
    });

    _this.$page = document.querySelector("#page");
    _this.$snackbar = document.querySelector("#snackbar");

    _this.attachShadow({
      mode: "open"
    });

    _this.render();

    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(AmountInput, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.$amountForm = this.shadowRoot.querySelector("#amount-form");
      this.$amountInput = this.shadowRoot.querySelector("#amount-input");
      this.$haveAmount = this.shadowRoot.querySelector("#have-amount");
      (0,_util_event__WEBPACK_IMPORTED_MODULE_9__.addEvent)(this.$amountForm, "submit", this.onSubmit);
      (0,_util_event__WEBPACK_IMPORTED_MODULE_9__.addEvent)(this.$page, "@updateamount", this.renderHaveAmount);
      this.renderHaveAmount();
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      (0,_util_event__WEBPACK_IMPORTED_MODULE_9__.removeEvent)(this.$amountForm, "submit", this.onSubmit);
    }
  }, {
    key: "render",
    value: function render() {
      var template = document.querySelector("#amount-input-template").content;
      var cloneNode = template.cloneNode(true);
      this.shadowRoot.appendChild(cloneNode);
    }
  }]);

  return AmountInput;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__["default"])(HTMLElement));

customElements.define("amount-input", AmountInput);

/***/ }),

/***/ "./src/js/components/changes-input.js":
/*!********************************************!*\
  !*** ./src/js/components/changes-input.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _domain_changesProcessMachine__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../domain/changesProcessMachine */ "./src/js/domain/changesProcessMachine.ts");
/* harmony import */ var _util_event__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/event */ "./src/js/util/event.js");
/* harmony import */ var _util_snackbar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/snackbar */ "./src/js/util/snackbar.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }





var ChangesInput = /*#__PURE__*/function (_HTMLElement) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(ChangesInput, _HTMLElement);

  var _super = _createSuper(ChangesInput);

  function ChangesInput() {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ChangesInput);

    _this = _super.call(this);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "onSubmit", function (e) {
      e.preventDefault();
      var money = _this.$changesInput.valueAsNumber;

      try {
        _domain_changesProcessMachine__WEBPACK_IMPORTED_MODULE_8__.changesProcessMachine.charge(money);

        _this.renderHaveChanges();

        (0,_util_event__WEBPACK_IMPORTED_MODULE_9__.emit)(_this.$page, "@mutateChanges");
      } catch (err) {
        (0,_util_snackbar__WEBPACK_IMPORTED_MODULE_10__["default"])(_this.$snackbar, err.message);
      }
    });

    _this.$page = document.querySelector("#page");
    _this.$snackbar = document.querySelector("#snackbar");

    _this.attachShadow({
      mode: "open"
    });

    _this.render();

    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ChangesInput, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.$haveChanges = this.shadowRoot.querySelector("#have-changes");
      this.$changesForm = this.shadowRoot.querySelector("#changes-form");
      this.$changesInput = this.shadowRoot.querySelector("#changes-input");
      (0,_util_event__WEBPACK_IMPORTED_MODULE_9__.addEvent)(this.$changesForm, "submit", this.onSubmit);
      this.renderHaveChanges();
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      (0,_util_event__WEBPACK_IMPORTED_MODULE_9__.removeEvent)(this.$changesForm, "submit", this.onSubmit);
    }
  }, {
    key: "renderHaveChanges",
    value: function renderHaveChanges() {
      var changes = _domain_changesProcessMachine__WEBPACK_IMPORTED_MODULE_8__.changesProcessMachine.getTotalChanges();
      this.$haveChanges.innerText = "\uD604\uC7AC \uBCF4\uC720 \uAE08\uC561: ".concat(changes, "\uC6D0");
    }
  }, {
    key: "render",
    value: function render() {
      var template = document.querySelector("#changes-template").content;
      var cloneNode = template.cloneNode(true);
      this.shadowRoot.appendChild(cloneNode);
    }
  }]);

  return ChangesInput;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__["default"])(HTMLElement));

customElements.define("changes-input", ChangesInput);

/***/ }),

/***/ "./src/js/components/changes-table.js":
/*!********************************************!*\
  !*** ./src/js/components/changes-table.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _domain_changesProcessMachine__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../domain/changesProcessMachine */ "./src/js/domain/changesProcessMachine.ts");
/* harmony import */ var _util_event__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/event */ "./src/js/util/event.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




var ChangesTable = /*#__PURE__*/function (_HTMLElement) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(ChangesTable, _HTMLElement);

  var _super = _createSuper(ChangesTable);

  function ChangesTable() {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ChangesTable);

    _this = _super.call(this);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "renderTableStatus", function () {
      var coins = _domain_changesProcessMachine__WEBPACK_IMPORTED_MODULE_8__.changesProcessMachine.getCoins();
      _this.$coin500.innerText = coins["500"];
      _this.$coin100.innerText = coins["100"];
      _this.$coin50.innerText = coins["50"];
      _this.$coin10.innerText = coins["10"];
    });

    _this.$page = document.querySelector("#page");

    _this.attachShadow({
      mode: "open"
    });

    _this.render();

    _this.init();

    _this.renderTableStatus();

    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ChangesTable, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      this.$coin500 = this.shadowRoot.querySelector("#coin-500");
      this.$coin100 = this.shadowRoot.querySelector("#coin-100");
      this.$coin50 = this.shadowRoot.querySelector("#coin-50");
      this.$coin10 = this.shadowRoot.querySelector("#coin-10");
      (0,_util_event__WEBPACK_IMPORTED_MODULE_9__.addEvent)(this.$page, "@mutateChanges", function () {
        return _this2.renderTableStatus();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var template = document.querySelector("#changes-table-template").content;
      var cloneNode = template.cloneNode(true);
      this.shadowRoot.appendChild(cloneNode);
    }
  }]);

  return ChangesTable;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__["default"])(HTMLElement));

customElements.define("changes-table", ChangesTable);

/***/ }),

/***/ "./src/js/components/page-by-login.js":
/*!********************************************!*\
  !*** ./src/js/components/page-by-login.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _util_checkLogin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/checkLogin */ "./src/js/util/checkLogin.js");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var PageByLogin = /*#__PURE__*/function (_HTMLElement) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(PageByLogin, _HTMLElement);

  var _super = _createSuper(PageByLogin);

  function PageByLogin() {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, PageByLogin);

    _this = _super.call(this);

    _this.render();

    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(PageByLogin, [{
    key: "render",
    value: function render() {
      if ((0,_util_checkLogin__WEBPACK_IMPORTED_MODULE_6__["default"])()) {
        this.renderNavButtonContainer();
        return;
      }

      this.renderPurchaseContainer();
    }
  }, {
    key: "renderPurchaseContainer",
    value: function renderPurchaseContainer() {
      this.innerHTML = "\n    <div id=\"page\">\n      <product-purchase></product-purchase>\n      <div id=\"snackbar\"></div>\n    </div>\n    ";
    }
  }, {
    key: "renderNavButtonContainer",
    value: function renderNavButtonContainer() {
      var template = document.querySelector("#nav-button-container").content;
      var cloneNode = template.cloneNode(true);
      this.appendChild(cloneNode);
    }
  }]);

  return PageByLogin;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_5__["default"])(HTMLElement));

customElements.define("page-by-login", PageByLogin);

/***/ }),

/***/ "./src/js/components/product-edit-form.js":
/*!************************************************!*\
  !*** ./src/js/components/product-edit-form.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _domain_productProcessMachine__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../domain/productProcessMachine */ "./src/js/domain/productProcessMachine.ts");
/* harmony import */ var _util_event__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/event */ "./src/js/util/event.js");
/* harmony import */ var _util_snackbar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/snackbar */ "./src/js/util/snackbar.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }





var ProductEditForm = /*#__PURE__*/function (_HTMLTableRowElement) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(ProductEditForm, _HTMLTableRowElement);

  var _super = _createSuper(ProductEditForm);

  function ProductEditForm() {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ProductEditForm);

    _this = _super.call(this);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "onEdit", function () {
      var idx = _this.getAttribute("idx");

      var updatedName = _this.$editNameInput.value;
      var updatedPrice = _this.$editPriceInput.valueAsNumber;
      var updatedCount = _this.$editCountInput.valueAsNumber;

      try {
        _domain_productProcessMachine__WEBPACK_IMPORTED_MODULE_8__.productProcessMachine.update(idx, updatedName, updatedPrice, updatedCount);
        (0,_util_event__WEBPACK_IMPORTED_MODULE_9__.emit)(_this.$page, "@update", {
          idx: idx,
          name: updatedName,
          price: updatedPrice,
          count: updatedCount
        });

        _this.classList.add("hidden");
      } catch (err) {
        (0,_util_snackbar__WEBPACK_IMPORTED_MODULE_10__["default"])(_this.$snackbar, err.message);
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "renderEditForm", function (_ref) {
      var idx = _ref.idx;

      if (idx === _this.getAttribute("idx")) {
        _this.classList.remove("hidden");
      }
    });

    _this.$page = document.querySelector("#page");
    _this.$snackbar = document.querySelector("#snackbar");
    _this.$saveButton = _this.querySelector(".save-button");
    _this.$editNameInput = _this.querySelector("#edit-name-input");
    _this.$editPriceInput = _this.querySelector("#edit-price-input");
    _this.$editCountInput = _this.querySelector("#edit-count-input");
    (0,_util_event__WEBPACK_IMPORTED_MODULE_9__.addEvent)(_this.$saveButton, "click", _this.onEdit);
    (0,_util_event__WEBPACK_IMPORTED_MODULE_9__.addEvent)(_this.$page, "@renderedit", function (e) {
      return _this.renderEditForm(e.detail);
    });
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ProductEditForm, [{
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      (0,_util_event__WEBPACK_IMPORTED_MODULE_9__.removeEvent)(this.$saveButton, "click", this.onEdit);
    }
  }]);

  return ProductEditForm;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__["default"])(HTMLTableRowElement));

customElements.define("edit-form", ProductEditForm, {
  "extends": "tr"
});

/***/ }),

/***/ "./src/js/components/product-input.js":
/*!********************************************!*\
  !*** ./src/js/components/product-input.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constant */ "./src/js/constant/index.js");
/* harmony import */ var _util_event__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/event */ "./src/js/util/event.js");
/* harmony import */ var _domain_productProcessMachine__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../domain/productProcessMachine */ "./src/js/domain/productProcessMachine.ts");
/* harmony import */ var _util_snackbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../util/snackbar */ "./src/js/util/snackbar.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






var ProductInput = /*#__PURE__*/function (_HTMLElement) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(ProductInput, _HTMLElement);

  var _super = _createSuper(ProductInput);

  function ProductInput() {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ProductInput);

    _this = _super.call(this);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "onSubmit", function (e) {
      e.preventDefault();

      try {
        _domain_productProcessMachine__WEBPACK_IMPORTED_MODULE_10__.productProcessMachine.add({
          name: _this.$productNameInput.value,
          price: _this.$productPriceInput.valueAsNumber,
          count: _this.$productCountInput.valueAsNumber
        });
        (0,_util_event__WEBPACK_IMPORTED_MODULE_9__.emit)(_this.$page, _constant__WEBPACK_IMPORTED_MODULE_8__.EVENT_TYPE.ADD, {
          name: _this.$productNameInput.value,
          price: _this.$productPriceInput.valueAsNumber,
          count: _this.$productCountInput.valueAsNumber
        });
        _this.$productNameInput.value = "";
        _this.$productPriceInput.value = "";
        _this.$productCountInput.value = "";
      } catch (err) {
        (0,_util_snackbar__WEBPACK_IMPORTED_MODULE_11__["default"])(_this.$snackbar, err.message);
      }
    });

    _this.$page = document.querySelector("#page");
    _this.$snackbar = document.querySelector("#snackbar");

    _this.attachShadow({
      mode: "open"
    });

    _this.render();

    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ProductInput, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.$addProductForm = this.shadowRoot.querySelector("#add-product-form");
      this.$productNameInput = this.shadowRoot.querySelector("#product-name-input");
      this.$productPriceInput = this.shadowRoot.querySelector("#product-price-input");
      this.$productCountInput = this.shadowRoot.querySelector("#product-count-input");
      (0,_util_event__WEBPACK_IMPORTED_MODULE_9__.addEvent)(this.$addProductForm, "submit", this.onSubmit);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.$addProductForm = this.shadowRoot.querySelector("#add-product-form");
      this.$addProductForm.removeEventListener("submit", this.onSubmit);
    }
  }, {
    key: "render",
    value: function render() {
      var template = document.querySelector("#product-input-template").content;
      var cloneNode = template.cloneNode(true);
      this.shadowRoot.appendChild(cloneNode);
    }
  }]);

  return ProductInput;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__["default"])(HTMLElement));

customElements.define("product-input", ProductInput);

/***/ }),

/***/ "./src/js/components/product-item.js":
/*!*******************************************!*\
  !*** ./src/js/components/product-item.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _util_event__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/event */ "./src/js/util/event.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var ProductItem = /*#__PURE__*/function (_HTMLTableRowElement) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(ProductItem, _HTMLTableRowElement);

  var _super = _createSuper(ProductItem);

  function ProductItem() {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ProductItem);

    _this = _super.call(this);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "updateProduct", function (_ref) {
      var name = _ref.name,
          price = _ref.price,
          count = _ref.count;
      _this.$itemName.innerText = name;
      _this.$itemPrice.innerText = price;
      _this.$itemCount.innerText = count;
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "changeItemToEditTemplate", function () {
      _this.classList.add("hidden");

      (0,_util_event__WEBPACK_IMPORTED_MODULE_8__.emit)(_this.$page, "@renderedit", {
        idx: _this.idx
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "onDelete", function () {
      _this.remove();
    });

    _this.init();

    _this.updateProduct({
      name: _this.name,
      price: _this.price,
      count: _this.count
    });

    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ProductItem, [{
    key: "init",
    value: function init() {
      this.$page = document.querySelector("#page");
      this.$itemName = this.querySelector("#item-name");
      this.$itemPrice = this.querySelector("#item-price");
      this.$itemCount = this.querySelector("#item-count");
      this.$editButton = this.querySelector(".edit-button");
      this.$deleteButton = this.querySelector(".delete-button");
      (0,_util_event__WEBPACK_IMPORTED_MODULE_8__.addEvent)(this.$editButton, "click", this.changeItemToEditTemplate);
      (0,_util_event__WEBPACK_IMPORTED_MODULE_8__.addEvent)(this.$deleteButton, "click", this.onDelete);
    }
  }, {
    key: "name",
    get: function get() {
      return this.getAttribute("name");
    }
  }, {
    key: "price",
    get: function get() {
      return this.getAttribute("price");
    }
  }, {
    key: "count",
    get: function get() {
      return this.getAttribute("count");
    }
  }, {
    key: "idx",
    get: function get() {
      return this.getAttribute("idx");
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      (0,_util_event__WEBPACK_IMPORTED_MODULE_8__.addEvent)(this.$page, "@update", function (e) {
        if (e.detail.idx === _this2.idx) {
          _this2.classList.remove("hidden");

          _this2.updateProduct(e.detail);
        }
      });
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.$editButton = this.querySelector(".edit-button");
      this.$deleteButton = this.querySelector(".delete-button");
      (0,_util_event__WEBPACK_IMPORTED_MODULE_8__.removeEvent)(this.$editButton, "click", this.changeItemToEditTemplate);
      (0,_util_event__WEBPACK_IMPORTED_MODULE_8__.removeEvent)(this.$deleteButton, "click", this.onDelete);
    }
  }]);

  return ProductItem;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__["default"])(HTMLTableRowElement));

customElements.define("product-item", ProductItem, {
  "extends": "tr"
});

/***/ }),

/***/ "./src/js/components/product-purchase-item.js":
/*!****************************************************!*\
  !*** ./src/js/components/product-purchase-item.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _domain_productProcessMachine__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../domain/productProcessMachine */ "./src/js/domain/productProcessMachine.ts");
/* harmony import */ var _domain_productPurchaseMachine__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../domain/productPurchaseMachine */ "./src/js/domain/productPurchaseMachine.ts");
/* harmony import */ var _util_event__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/event */ "./src/js/util/event.js");
/* harmony import */ var _util_snackbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../util/snackbar */ "./src/js/util/snackbar.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






var ProductPurchaseItem = /*#__PURE__*/function (_HTMLTableRowElement) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(ProductPurchaseItem, _HTMLTableRowElement);

  var _super = _createSuper(ProductPurchaseItem);

  function ProductPurchaseItem() {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ProductPurchaseItem);

    _this = _super.call(this);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "purchaseProduct", function () {
      var itemName = _this.$itemName.innerText;
      var itemPrice = Number(_this.$itemPrice.innerText);
      var itemCount = Number(_this.$itemCount.innerText);

      try {
        _domain_productPurchaseMachine__WEBPACK_IMPORTED_MODULE_9__.productPurchaseMachine.spend(itemPrice, itemCount);
        var updatedProduct = _domain_productProcessMachine__WEBPACK_IMPORTED_MODULE_8__.productProcessMachine.buy(itemName);

        _this.updatedProduct(updatedProduct);

        (0,_util_event__WEBPACK_IMPORTED_MODULE_10__.emit)(_this.$page, "@updateamount");
      } catch (err) {
        (0,_util_snackbar__WEBPACK_IMPORTED_MODULE_11__["default"])(_this.$snackbar, err.message);
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "updatedProduct", function (_ref) {
      var name = _ref.name,
          price = _ref.price,
          count = _ref.count;
      _this.$itemName.innerText = name;
      _this.$itemPrice.innerText = price;
      _this.$itemCount.innerText = count;
    });

    _this.init();

    _this.$page = document.querySelector("#page");
    _this.$snackbar = document.querySelector("#snackbar");

    _this.updatedProduct({
      name: _this.name,
      price: _this.price,
      count: _this.count
    });

    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ProductPurchaseItem, [{
    key: "name",
    get: function get() {
      return this.getAttribute("name");
    }
  }, {
    key: "price",
    get: function get() {
      return this.getAttribute("price");
    }
  }, {
    key: "count",
    get: function get() {
      return this.getAttribute("count");
    }
  }, {
    key: "init",
    value: function init() {
      this.$itemName = this.querySelector("#item-name");
      this.$itemPrice = this.querySelector("#item-price");
      this.$itemCount = this.querySelector("#item-count");
      this.$purchaseButton = this.querySelector("#purchase-button");
      (0,_util_event__WEBPACK_IMPORTED_MODULE_10__.addEvent)(this.$purchaseButton, "click", this.purchaseProduct);
    }
  }]);

  return ProductPurchaseItem;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__["default"])(HTMLTableRowElement));

customElements.define("product-purchase-item", ProductPurchaseItem, {
  "extends": "tr"
});

/***/ }),

/***/ "./src/js/components/product-purchase-table.js":
/*!*****************************************************!*\
  !*** ./src/js/components/product-purchase-table.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _domain_productProcessMachine__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../domain/productProcessMachine */ "./src/js/domain/productProcessMachine.ts");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var ProductPurchaseTable = /*#__PURE__*/function (_HTMLElement) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(ProductPurchaseTable, _HTMLElement);

  var _super = _createSuper(ProductPurchaseTable);

  function ProductPurchaseTable() {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ProductPurchaseTable);

    _this = _super.call(this);

    _this.attachShadow({
      mode: "open"
    });

    _this.render();

    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ProductPurchaseTable, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      this.$productPurchaseTableBody = this.shadowRoot.querySelector("#product-purchase-table-body");
      this.idx = 0;
      var products = _domain_productProcessMachine__WEBPACK_IMPORTED_MODULE_6__.productProcessMachine.getProducts();
      products.forEach(function (_ref) {
        var name = _ref.name,
            price = _ref.price,
            count = _ref.count;

        _this2.addProductPurchaseItem({
          name: name,
          price: price,
          count: count
        });
      });
    }
  }, {
    key: "addProductPurchaseItem",
    value: function addProductPurchaseItem(_ref2) {
      var name = _ref2.name,
          price = _ref2.price,
          count = _ref2.count;
      var template = document.querySelector("#product-purchase-item-template").content.children[0];
      template.setAttribute("idx", this.idx);
      template.setAttribute("name", name);
      template.setAttribute("price", price);
      template.setAttribute("count", count);
      this.idx += 1;
      var cloneNode = template.cloneNode(true);
      this.$productPurchaseTableBody.insertAdjacentElement("beforeend", cloneNode);
    }
  }, {
    key: "render",
    value: function render() {
      var template = document.querySelector("#product-purchase-template").content;
      var cloneNode = template.cloneNode(true);
      this.shadowRoot.appendChild(cloneNode);
    }
  }]);

  return ProductPurchaseTable;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_5__["default"])(HTMLElement));

customElements.define("product-purchase-table", ProductPurchaseTable);

/***/ }),

/***/ "./src/js/components/product-table.js":
/*!********************************************!*\
  !*** ./src/js/components/product-table.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _util_event__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/event */ "./src/js/util/event.js");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constant */ "./src/js/constant/index.js");
/* harmony import */ var _domain_productProcessMachine__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../domain/productProcessMachine */ "./src/js/domain/productProcessMachine.ts");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }





var ProductTable = /*#__PURE__*/function (_HTMLElement) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(ProductTable, _HTMLElement);

  var _super = _createSuper(ProductTable);

  function ProductTable() {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ProductTable);

    _this = _super.call(this);
    _this.$page = document.querySelector("#page");

    _this.attachShadow({
      mode: "open"
    });

    _this.render();

    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ProductTable, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      this.$productTableBody = this.shadowRoot.querySelector("#product-table-body");
      this.idx = 0;
      (0,_util_event__WEBPACK_IMPORTED_MODULE_6__.addEvent)(this.$page, _constant__WEBPACK_IMPORTED_MODULE_7__.EVENT_TYPE.ADD, function (e) {
        return _this2.onAddItem(e.detail);
      });
      var products = _domain_productProcessMachine__WEBPACK_IMPORTED_MODULE_8__.productProcessMachine.getProducts();
      products.forEach(function (_ref) {
        var name = _ref.name,
            price = _ref.price,
            count = _ref.count;

        _this2.onAddItem({
          name: name,
          price: price,
          count: count
        });
      });
    }
  }, {
    key: "onAddItem",
    value: function onAddItem(_ref2) {
      var name = _ref2.name,
          price = _ref2.price,
          count = _ref2.count;
      this.addProductItem({
        name: name,
        price: price,
        count: count
      });
      this.addEditForm();
      this.idx += 1;
    }
  }, {
    key: "addProductItem",
    value: function addProductItem(_ref3) {
      var name = _ref3.name,
          price = _ref3.price,
          count = _ref3.count;
      var template = document.querySelector("#product-item-template").content.children[0];
      template.setAttribute("idx", this.idx);
      template.setAttribute("name", name);
      template.setAttribute("price", price);
      template.setAttribute("count", count);
      var cloneNode = template.cloneNode(true);
      this.$productTableBody.insertAdjacentElement("beforeend", cloneNode);
    }
  }, {
    key: "addEditForm",
    value: function addEditForm() {
      var template = document.querySelector("#edit-form-template").content.children[0];
      template.setAttribute("idx", this.idx);
      var cloneNode = template.cloneNode(true);
      cloneNode.classList.add("hidden");
      this.$productTableBody.insertAdjacentElement("beforeend", cloneNode);
    }
  }, {
    key: "render",
    value: function render() {
      var template = document.querySelector("#product-table-template").content;
      var cloneNode = template.cloneNode(true);
      this.shadowRoot.appendChild(cloneNode);
    }
  }]);

  return ProductTable;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_5__["default"])(HTMLElement));

customElements.define("product-table", ProductTable);

/***/ }),

/***/ "./src/js/components/return-table.js":
/*!*******************************************!*\
  !*** ./src/js/components/return-table.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _domain_changesProcessMachine__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../domain/changesProcessMachine */ "./src/js/domain/changesProcessMachine.ts");
/* harmony import */ var _domain_productPurchaseMachine__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../domain/productPurchaseMachine */ "./src/js/domain/productPurchaseMachine.ts");
/* harmony import */ var _util_event__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/event */ "./src/js/util/event.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }





var ReturnTable = /*#__PURE__*/function (_HTMLElement) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(ReturnTable, _HTMLElement);

  var _super = _createSuper(ReturnTable);

  function ReturnTable() {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ReturnTable);

    _this = _super.call(this);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "onClickReturnButton", function () {
      var chargedUserMoney = _domain_productPurchaseMachine__WEBPACK_IMPORTED_MODULE_9__.productPurchaseMachine.getChargedMoney();
      var returnedCoins = _domain_changesProcessMachine__WEBPACK_IMPORTED_MODULE_8__.changesProcessMachine["return"](chargedUserMoney);
      _domain_productPurchaseMachine__WEBPACK_IMPORTED_MODULE_9__.productPurchaseMachine.returned(returnedCoins);

      _this.updateReturnCoins(returnedCoins);

      (0,_util_event__WEBPACK_IMPORTED_MODULE_10__.emit)(_this.$page, "@updateamount");
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "updateReturnCoins", function (returnedCoins) {
      _this.$returnCoin500.innerText = "".concat(returnedCoins["500"], "\uAC1C");
      _this.$returnCoin100.innerText = "".concat(returnedCoins["100"], "\uAC1C");
      _this.$returnCoin50.innerText = "".concat(returnedCoins["50"], "\uAC1C");
      _this.$returnCoin10.innerText = "".concat(returnedCoins["10"], "\uAC1C");
    });

    _this.$page = document.querySelector("#page");

    _this.attachShadow({
      mode: "open"
    });

    _this.render();

    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ReturnTable, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.$returnCoin500 = this.shadowRoot.querySelector("#return-coin-500");
      this.$returnCoin100 = this.shadowRoot.querySelector("#return-coin-100");
      this.$returnCoin50 = this.shadowRoot.querySelector("#return-coin-50");
      this.$returnCoin10 = this.shadowRoot.querySelector("#return-coin-10");
      this.$returnButton = this.shadowRoot.querySelector("#return-button");
      (0,_util_event__WEBPACK_IMPORTED_MODULE_10__.addEvent)(this.$returnButton, "click", this.onClickReturnButton);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      (0,_util_event__WEBPACK_IMPORTED_MODULE_10__.removeEvent)(this.$returnButton, "click", this.onClickReturnButton);
    }
  }, {
    key: "render",
    value: function render() {
      var template = document.querySelector("#coin-return-table").content;
      var cloneNode = template.cloneNode(true);
      this.shadowRoot.appendChild(cloneNode);
    }
  }]);

  return ReturnTable;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__["default"])(HTMLElement));

customElements.define("return-table", ReturnTable);

/***/ }),

/***/ "./src/js/components/user-profile.js":
/*!*******************************************!*\
  !*** ./src/js/components/user-profile.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _util_event__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/event */ "./src/js/util/event.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var LoginStatus = /*#__PURE__*/function (_HTMLElement) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(LoginStatus, _HTMLElement);

  var _super = _createSuper(LoginStatus);

  function LoginStatus() {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, LoginStatus);

    _this = _super.call(this);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "onClickProfile", function () {
      _this.$userMenuList.classList.toggle("hidden");
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "logOut", function () {
      localStorage.removeItem("user-info");
      location.reload();
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "checkLogin", function () {
      return _this.user && _this.user.key;
    });

    _this.attachShadow({
      mode: "open"
    });

    _this.user = JSON.parse(localStorage.getItem("user-info"));

    _this.render();

    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(LoginStatus, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      if (this.checkLogin()) {
        this.$userProfile = this.shadowRoot.querySelector("#user-profile");
        this.$userMenuList = this.shadowRoot.querySelector(".user-menu-list");
        this.$logOutButton = this.shadowRoot.querySelector("#logout-button");
        this.setUserProfileThumbnail();
        (0,_util_event__WEBPACK_IMPORTED_MODULE_8__.addEvent)(this.$userProfile, "click", this.onClickProfile);
        (0,_util_event__WEBPACK_IMPORTED_MODULE_8__.addEvent)(this.$logOutButton, "click", this.logOut);
      }
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      (0,_util_event__WEBPACK_IMPORTED_MODULE_8__.removeEvent)(this.$userProfile, "click", this.onClickProfile);
      (0,_util_event__WEBPACK_IMPORTED_MODULE_8__.removeEvent)(this.$logOutButton, "click", this.logOut);
    }
  }, {
    key: "setUserProfileThumbnail",
    value: function setUserProfileThumbnail() {
      this.$userProfile.innerText = this.user.name[0];
    }
  }, {
    key: "render",
    value: function render() {
      if (this.checkLogin()) {
        this.renderUserProfile();
        return;
      }

      this.renderLoginNavButton();
    }
  }, {
    key: "renderLoginNavButton",
    value: function renderLoginNavButton() {
      var template = document.querySelector("#login-menu-button-template").content;
      var cloneNode = template.cloneNode(true);
      this.shadowRoot.appendChild(cloneNode);
    }
  }, {
    key: "renderUserProfile",
    value: function renderUserProfile() {
      var template = document.querySelector("#user-profile-template").content;
      var cloneNode = template.cloneNode(true);
      this.shadowRoot.appendChild(cloneNode);
    }
  }]);

  return LoginStatus;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__["default"])(HTMLElement));

customElements.define("login-status", LoginStatus);

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
  MINIMUM_CHANGES: "금액은 0원보다 높아야합니다.",
  MAXIMUM_USER_INPUT: "금액은 최대 10000원까지 투입할수 있습니다",
  NO_PRODUCT: "상품의 재고가 없습니다",
  LACK_OF_BALANCE: "잔액이 부족합니다",
  MUST_LOGIN: "로그인후 이용해주세요",
  ALREADY_LOGIN: "이미 로그인이 되어있습니다",
  VALID_PASSWORD: "비밀번호는 8 ~ 15자 사이에 문자,숫자,특수문자를 하나 포함해야합니다.",
  VALID_NAME: "이름은 2 ~ 6글자만 가능합니다",
  NOT_MATCH_PASSWORD: "비밀번호 확인이 비밀번호와 일치하지 않습니다"
};
var VENDING_MACHINE_NUMBER = {
  MAXIMUM_CHANGES: 100000,
  MAXIMUM_USER_INPUT: 10000,
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

/***/ "./src/js/pages/changes-manage.page.js":
/*!*********************************************!*\
  !*** ./src/js/pages/changes-manage.page.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _components_changes_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/changes-input */ "./src/js/components/changes-input.js");
/* harmony import */ var _components_changes_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/changes-table */ "./src/js/components/changes-table.js");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




var ChangesManage = /*#__PURE__*/function (_HTMLElement) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(ChangesManage, _HTMLElement);

  var _super = _createSuper(ChangesManage);

  function ChangesManage() {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ChangesManage);

    _this = _super.call(this);

    _this.attachShadow({
      mode: "open"
    });

    _this.render();

    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ChangesManage, [{
    key: "render",
    value: function render() {
      this.shadowRoot.innerHTML = "\n      <changes-input></changes-input>\n      <changes-table></changes-table>\n    ";
    }
  }]);

  return ChangesManage;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_5__["default"])(HTMLElement));

customElements.define("changes-manage", ChangesManage);

/***/ }),

/***/ "./src/js/pages/product-manage.page.js":
/*!*********************************************!*\
  !*** ./src/js/pages/product-manage.page.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _components_product_edit_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/product-edit-form */ "./src/js/components/product-edit-form.js");
/* harmony import */ var _components_product_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/product-input */ "./src/js/components/product-input.js");
/* harmony import */ var _components_product_item__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/product-item */ "./src/js/components/product-item.js");
/* harmony import */ var _components_product_table__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/product-table */ "./src/js/components/product-table.js");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






var ProductManage = /*#__PURE__*/function (_HTMLElement) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(ProductManage, _HTMLElement);

  var _super = _createSuper(ProductManage);

  function ProductManage() {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ProductManage);

    _this = _super.call(this);

    _this.attachShadow({
      mode: "open"
    });

    _this.render();

    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ProductManage, [{
    key: "render",
    value: function render() {
      this.shadowRoot.innerHTML = "\n      <product-input></product-input>\n      <product-table></product-table>\n    ";
    }
  }]);

  return ProductManage;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_5__["default"])(HTMLElement));

customElements.define("product-manage", ProductManage);

/***/ }),

/***/ "./src/js/pages/product-purchase.page.js":
/*!***********************************************!*\
  !*** ./src/js/pages/product-purchase.page.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _components_amount_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/amount-input */ "./src/js/components/amount-input.js");
/* harmony import */ var _components_product_purchase_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/product-purchase-table */ "./src/js/components/product-purchase-table.js");
/* harmony import */ var _components_product_purchase_item__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/product-purchase-item */ "./src/js/components/product-purchase-item.js");
/* harmony import */ var _components_return_table__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/return-table */ "./src/js/components/return-table.js");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






var ProductPurchase = /*#__PURE__*/function (_HTMLElement) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(ProductPurchase, _HTMLElement);

  var _super = _createSuper(ProductPurchase);

  function ProductPurchase() {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ProductPurchase);

    _this = _super.call(this);

    _this.attachShadow({
      mode: "open"
    });

    _this.render();

    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ProductPurchase, [{
    key: "render",
    value: function render() {
      this.shadowRoot.innerHTML = "\n      <amount-input></amount-input>\n      <product-purchase-table></product-purchase-table>\n      <return-table></return-table>\n    ";
    }
  }]);

  return ProductPurchase;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_5__["default"])(HTMLElement));

customElements.define("product-purchase", ProductPurchase);

/***/ }),

/***/ "./src/js/util/checkLogin.js":
/*!***********************************!*\
  !*** ./src/js/util/checkLogin.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage */ "./src/js/util/localStorage.js");


var isLogin = function isLogin() {
  var user = (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.getLocalStorage)("user-info");
  return !!user;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isLogin);

/***/ }),

/***/ "./src/js/util/event.js":
/*!******************************!*\
  !*** ./src/js/util/event.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addEvent": () => (/* binding */ addEvent),
/* harmony export */   "emit": () => (/* binding */ emit),
/* harmony export */   "removeEvent": () => (/* binding */ removeEvent)
/* harmony export */ });
var _addEvent$emit$remove = {
  addEvent: function addEvent(element, eventName, callback) {
    element.addEventListener(eventName, callback);
  },
  emit: function emit(element, eventName) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var customEvent = new CustomEvent(eventName, {
      detail: data
    });
    element.dispatchEvent(customEvent);
  },
  removeEvent: function removeEvent(element, eventName, callback) {
    element.removeEventListener(eventName, callback);
  }
},
    addEvent = _addEvent$emit$remove.addEvent,
    emit = _addEvent$emit$remove.emit,
    removeEvent = _addEvent$emit$remove.removeEvent;


/***/ }),

/***/ "./src/js/util/localStorage.js":
/*!*************************************!*\
  !*** ./src/js/util/localStorage.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setLocalStorage": () => (/* binding */ setLocalStorage),
/* harmony export */   "getLocalStorage": () => (/* binding */ getLocalStorage)
/* harmony export */ });
var setLocalStorage = function setLocalStorage(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
};
var getLocalStorage = function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
};

/***/ }),

/***/ "./src/js/util/snackbar.js":
/*!*********************************!*\
  !*** ./src/js/util/snackbar.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var showSnackbar = function showSnackbar(container, message) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  container.innerText = message;
  container.classList.toggle("show");
  setTimeout(function () {
    container.classList.toggle("show");
    callback();
  }, 1000);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showSnackbar);

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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  padding: 0;\n}\n\n:root {\n  --nav-button-color: #f5f5f5;\n  --nav-button-hover-color: rgba(0, 188, 212, 0.25);\n  --input-border-color: #b4b4b4;\n  --default-button-color: #00bcd4;\n  --hover-button-color: #80deea;\n  --table-border-color: #dcdcdc;\n  --process-button-color: #f5f5f5;\n}\n\na {\n  text-decoration: none;\n  color: black;\n  line-height: 40px;\n}\n\n#app {\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n}\n\n#page-tab-container {\n  display: flex;\n  justify-content: center;\n  width: 100%;\n  gap: 20px;\n  margin-top: 40px;\n  margin-bottom: 70px;\n}\n\n.input {\n  height: 36px;\n  border-radius: 4px;\n  padding-left: 8px;\n  border: 1px solid var(--input-border-color);\n}\n\n.form {\n  text-align: left;\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n\n.input-container {\n  display: flex;\n  gap: 6px;\n}\n\n.edit-input-container {\n  display: flex;\n  gap: 5px;\n}\n\n.product-edit-input {\n  width: 90px;\n  height: 30px;\n}\n\n.button {\n  color: white;\n  background-color: var(--default-button-color);\n  width: 56px;\n  height: 38px;\n  padding: 0;\n  margin-left: 10px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n\n.button:hover {\n  background-color: var(--hover-button-color);\n}\n\ntable {\n  width: 470px;\n  border-collapse: collapse;\n}\n\ntr {\n  height: 40px;\n  border-top: 1px solid var(--table-border-color);\n}\n\n.process-button {\n  background-color: var(--process-button-color);\n  width: 50px;\n  height: 32px;\n  border-radius: 4px;\n  border: none;\n  margin-right: 5px;\n  cursor: pointer;\n}\n\n.process-button:hover {\n  background-color: var(--nav-button-hover-color);\n}\n\n#changes-input {\n  width: 300px;\n}\n\n#changes-form {\n  width: 400px;\n  margin: 0 auto;\n}\n\n#have-changes {\n  margin-top: 5px;\n}\n\n.login-menu-button {\n  position: absolute;\n  right: 40px;\n  top: 20px;\n}\n\n.nav-button {\n  background-color: var(--nav-button-color);\n  width: 117px;\n  height: 36px;\n  cursor: pointer;\n  border: none;\n  border-radius: 4px;\n}\n\n.nav-button:hover {\n  background-color: var(--nav-button-hover-color);\n}\n\n.hidden {\n  display: none;\n}\n\n#snackbar {\n  visibility: hidden;\n  min-width: 250px;\n  margin-left: -125px;\n  background-color: #333;\n  color: #fff;\n  text-align: center;\n  border-radius: 2px;\n  padding: 16px;\n  position: fixed;\n  z-index: 1;\n  left: 50%;\n  bottom: 0;\n}\n\n.show {\n  visibility: visible !important; /* Show the snackbar */\n  -webkit-animation: fadein 0.5s, fadeout 0.5s 0.9s;\n  animation: fadein 0.5s, fadeout 0.5s 0.9s;\n}\n\n@-webkit-keyframes fadein {\n  from {\n    bottom: 0;\n    opacity: 0;\n  }\n  to {\n    bottom: 30px;\n    opacity: 1;\n  }\n}\n\n@keyframes fadein {\n  from {\n    bottom: 0;\n    opacity: 0;\n  }\n  to {\n    bottom: 0;\n    opacity: 1;\n  }\n}\n\n@-webkit-keyframes fadeout {\n  from {\n    bottom: 0;\n    opacity: 1;\n  }\n  to {\n    bottom: -30px;\n    opacity: 0;\n  }\n}\n\n@keyframes fadeout {\n  from {\n    bottom: 0;\n    opacity: 1;\n  }\n  to {\n    bottom: -30px;\n    opacity: 0;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/css/index.css"],"names":[],"mappings":"AAAA;EACE,UAAU;AACZ;;AAEA;EACE,2BAA2B;EAC3B,iDAAiD;EACjD,6BAA6B;EAC7B,+BAA+B;EAC/B,6BAA6B;EAC7B,6BAA6B;EAC7B,+BAA+B;AACjC;;AAEA;EACE,qBAAqB;EACrB,YAAY;EACZ,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,WAAW;EACX,SAAS;EACT,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,iBAAiB;EACjB,2CAA2C;AAC7C;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,QAAQ;AACV;;AAEA;EACE,aAAa;EACb,QAAQ;AACV;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,6CAA6C;EAC7C,WAAW;EACX,YAAY;EACZ,UAAU;EACV,iBAAiB;EACjB,YAAY;EACZ,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,2CAA2C;AAC7C;;AAEA;EACE,YAAY;EACZ,yBAAyB;AAC3B;;AAEA;EACE,YAAY;EACZ,+CAA+C;AACjD;;AAEA;EACE,6CAA6C;EAC7C,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,+CAA+C;AACjD;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,cAAc;AAChB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,SAAS;AACX;;AAEA;EACE,yCAAyC;EACzC,YAAY;EACZ,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,+CAA+C;AACjD;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,mBAAmB;EACnB,sBAAsB;EACtB,WAAW;EACX,kBAAkB;EAClB,kBAAkB;EAClB,aAAa;EACb,eAAe;EACf,UAAU;EACV,SAAS;EACT,SAAS;AACX;;AAEA;EACE,8BAA8B,EAAE,sBAAsB;EACtD,iDAAiD;EACjD,yCAAyC;AAC3C;;AAEA;EACE;IACE,SAAS;IACT,UAAU;EACZ;EACA;IACE,YAAY;IACZ,UAAU;EACZ;AACF;;AAEA;EACE;IACE,SAAS;IACT,UAAU;EACZ;EACA;IACE,SAAS;IACT,UAAU;EACZ;AACF;;AAEA;EACE;IACE,SAAS;IACT,UAAU;EACZ;EACA;IACE,aAAa;IACb,UAAU;EACZ;AACF;;AAEA;EACE;IACE,SAAS;IACT,UAAU;EACZ;EACA;IACE,aAAa;IACb,UAAU;EACZ;AACF","sourcesContent":["* {\n  padding: 0;\n}\n\n:root {\n  --nav-button-color: #f5f5f5;\n  --nav-button-hover-color: rgba(0, 188, 212, 0.25);\n  --input-border-color: #b4b4b4;\n  --default-button-color: #00bcd4;\n  --hover-button-color: #80deea;\n  --table-border-color: #dcdcdc;\n  --process-button-color: #f5f5f5;\n}\n\na {\n  text-decoration: none;\n  color: black;\n  line-height: 40px;\n}\n\n#app {\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n}\n\n#page-tab-container {\n  display: flex;\n  justify-content: center;\n  width: 100%;\n  gap: 20px;\n  margin-top: 40px;\n  margin-bottom: 70px;\n}\n\n.input {\n  height: 36px;\n  border-radius: 4px;\n  padding-left: 8px;\n  border: 1px solid var(--input-border-color);\n}\n\n.form {\n  text-align: left;\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n\n.input-container {\n  display: flex;\n  gap: 6px;\n}\n\n.edit-input-container {\n  display: flex;\n  gap: 5px;\n}\n\n.product-edit-input {\n  width: 90px;\n  height: 30px;\n}\n\n.button {\n  color: white;\n  background-color: var(--default-button-color);\n  width: 56px;\n  height: 38px;\n  padding: 0;\n  margin-left: 10px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n\n.button:hover {\n  background-color: var(--hover-button-color);\n}\n\ntable {\n  width: 470px;\n  border-collapse: collapse;\n}\n\ntr {\n  height: 40px;\n  border-top: 1px solid var(--table-border-color);\n}\n\n.process-button {\n  background-color: var(--process-button-color);\n  width: 50px;\n  height: 32px;\n  border-radius: 4px;\n  border: none;\n  margin-right: 5px;\n  cursor: pointer;\n}\n\n.process-button:hover {\n  background-color: var(--nav-button-hover-color);\n}\n\n#changes-input {\n  width: 300px;\n}\n\n#changes-form {\n  width: 400px;\n  margin: 0 auto;\n}\n\n#have-changes {\n  margin-top: 5px;\n}\n\n.login-menu-button {\n  position: absolute;\n  right: 40px;\n  top: 20px;\n}\n\n.nav-button {\n  background-color: var(--nav-button-color);\n  width: 117px;\n  height: 36px;\n  cursor: pointer;\n  border: none;\n  border-radius: 4px;\n}\n\n.nav-button:hover {\n  background-color: var(--nav-button-hover-color);\n}\n\n.hidden {\n  display: none;\n}\n\n#snackbar {\n  visibility: hidden;\n  min-width: 250px;\n  margin-left: -125px;\n  background-color: #333;\n  color: #fff;\n  text-align: center;\n  border-radius: 2px;\n  padding: 16px;\n  position: fixed;\n  z-index: 1;\n  left: 50%;\n  bottom: 0;\n}\n\n.show {\n  visibility: visible !important; /* Show the snackbar */\n  -webkit-animation: fadein 0.5s, fadeout 0.5s 0.9s;\n  animation: fadein 0.5s, fadeout 0.5s 0.9s;\n}\n\n@-webkit-keyframes fadein {\n  from {\n    bottom: 0;\n    opacity: 0;\n  }\n  to {\n    bottom: 30px;\n    opacity: 1;\n  }\n}\n\n@keyframes fadein {\n  from {\n    bottom: 0;\n    opacity: 0;\n  }\n  to {\n    bottom: 0;\n    opacity: 1;\n  }\n}\n\n@-webkit-keyframes fadeout {\n  from {\n    bottom: 0;\n    opacity: 1;\n  }\n  to {\n    bottom: -30px;\n    opacity: 0;\n  }\n}\n\n@keyframes fadeout {\n  from {\n    bottom: 0;\n    opacity: 1;\n  }\n  to {\n    bottom: -30px;\n    opacity: 0;\n  }\n}\n"],"sourceRoot":""}]);
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
/* harmony export */   "ChangesProcessMachine": () => (/* binding */ ChangesProcessMachine),
/* harmony export */   "changesProcessMachine": () => (/* binding */ changesProcessMachine)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constant */ "./src/js/constant/index.js");
/* harmony import */ var _util_localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/localStorage */ "./src/js/util/localStorage.js");
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
        this.initCoins = function () { var _a; return (_a = (0,_util_localStorage__WEBPACK_IMPORTED_MODULE_1__.getLocalStorage)("coins")) !== null && _a !== void 0 ? _a : { 500: 0, 100: 0, 50: 0, 10: 0 }; };
        this.charge = function (money) {
            _this.checkDividedByMinimumCoin(money);
            _this.checkMoneyOverMaximum(money);
            _this.checkMoenyUnderZero(money);
            var newCoins = _this.generateCoins(money);
            _this.accumulateCoins(newCoins);
            _this.setCoins(_this.coins);
        };
        this.setCoins = function (data) {
            (0,_util_localStorage__WEBPACK_IMPORTED_MODULE_1__.setLocalStorage)("coins", data);
        };
        this["return"] = function (money) {
            var returnedCoins = _this.returnCoins(money);
            _this.decreaseChargedCoins(returnedCoins);
            _this.setCoins(_this.coins);
            return returnedCoins;
        };
        this.decreaseChargedCoins = function (returnCoins) {
            Object.entries(returnCoins).forEach(function (_a) {
                var coin = _a[0], amount = _a[1];
                _this.coins[coin] -= amount;
            });
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
        this.returnCoins = function (amount) {
            var remainingAmount = amount;
            var sortedCoin = Object.keys(_this.coins).sort(function (a, b) { return Number(b) - Number(a); });
            return sortedCoin.reduce(function (acc, coin) {
                var _a;
                var maxAvailableAmount = Math.floor(remainingAmount / Number(coin));
                var coinAmount = _this.coins[coin];
                var amount = _this.calculateAvailableAmount(maxAvailableAmount, coinAmount);
                remainingAmount -= amount * Number(coin);
                return __assign(__assign({}, acc), (_a = {}, _a[coin] = amount, _a));
            }, {});
        };
        this.calculateAvailableAmount = function (maxAvailableAmount, coinAmount) {
            if (coinAmount > maxAvailableAmount) {
                return maxAvailableAmount;
            }
            return coinAmount;
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
        this.coins = this.initCoins();
    }
    return ChangesProcessMachine;
}());

var changesProcessMachine = new ChangesProcessMachine();


/***/ }),

/***/ "./src/js/domain/productProcessMachine.ts":
/*!************************************************!*\
  !*** ./src/js/domain/productProcessMachine.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProductProcessMachine": () => (/* binding */ ProductProcessMachine),
/* harmony export */   "productProcessMachine": () => (/* binding */ productProcessMachine)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constant */ "./src/js/constant/index.js");
/* harmony import */ var _util_localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/localStorage */ "./src/js/util/localStorage.js");


var ProductProcessMachine = /** @class */ (function () {
    function ProductProcessMachine() {
        var _this = this;
        var _a;
        this.setProducts = function (data) {
            (0,_util_localStorage__WEBPACK_IMPORTED_MODULE_1__.setLocalStorage)("products", data);
        };
        this.add = function (newProduct) {
            _this.checkDuplicatedName(newProduct.name);
            _this.checkNameLength(newProduct.name);
            _this.checkValidPrice(newProduct.price);
            _this.checkValidCount(newProduct.count);
            _this.products.push(newProduct);
            _this.setProducts(_this.products);
        };
        this.getProducts = function () {
            return _this.products;
        };
        this.update = function (idx, name, price, count) {
            _this.checkDuplicatedName(name, idx);
            name && _this.checkNameLength(name);
            price && _this.checkValidPrice(price);
            count && _this.checkValidCount(count);
            _this.updateStatus(idx, name, "name");
            _this.updateStatus(idx, price, "price");
            _this.updateStatus(idx, count, "count");
            _this.setProducts(_this.products);
        };
        this["delete"] = function (idx) {
            _this.products.splice(idx, 1);
            _this.setProducts(_this.products);
        };
        this.buy = function (name) {
            var targetProduct = _this.findProductByName(name);
            targetProduct.count -= 1;
            _this.setProducts(_this.products);
            return targetProduct;
        };
        this.findProductByName = function (name) {
            return _this.products.find(function (product) { return product.name === name; });
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
        this.products = (_a = (0,_util_localStorage__WEBPACK_IMPORTED_MODULE_1__.getLocalStorage)("products")) !== null && _a !== void 0 ? _a : [];
    }
    return ProductProcessMachine;
}());

var productProcessMachine = new ProductProcessMachine();


/***/ }),

/***/ "./src/js/domain/productPurchaseMachine.ts":
/*!*************************************************!*\
  !*** ./src/js/domain/productPurchaseMachine.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProductPurchaseMachine": () => (/* binding */ ProductPurchaseMachine),
/* harmony export */   "productPurchaseMachine": () => (/* binding */ productPurchaseMachine)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constant */ "./src/js/constant/index.js");
/* harmony import */ var _util_localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/localStorage */ "./src/js/util/localStorage.js");


var ProductPurchaseMachine = /** @class */ (function () {
    function ProductPurchaseMachine() {
        var _this = this;
        var _a;
        this.charge = function (money) {
            _this.checkDividedByMinimumCoin(money);
            _this.checkMaxMoneyInput(money);
            _this.checkMoenyUnderZero(money);
            _this.chargedMoney += money;
            _this.setChargedMoney(_this.chargedMoney);
        };
        this.spend = function (price, quantity) {
            _this.checkValidProductQuantity(quantity);
            _this.checkValidChargedMoney(price, _this.chargedMoney);
            _this.chargedMoney -= price;
            _this.setChargedMoney(_this.chargedMoney);
        };
        this.returned = function (returnedCoins) {
            var returnedMoney = _this.getTotalReturned(returnedCoins);
            _this.chargedMoney -= returnedMoney;
            _this.setChargedMoney(_this.chargedMoney);
        };
        this.getTotalReturned = function (returnedCoins) {
            return Object.entries(returnedCoins).reduce(function (sum, _a) {
                var coin = _a[0], quantity = _a[1];
                return sum + Number(coin) * quantity;
            }, 0);
        };
        this.checkValidProductQuantity = function (quantity) {
            if (quantity <= 0) {
                throw new Error(_constant__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.NO_PRODUCT);
            }
        };
        this.checkValidChargedMoney = function (price, chargedMoney) {
            if (price > chargedMoney) {
                throw new Error(_constant__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.LACK_OF_BALANCE);
            }
        };
        this.checkDividedByMinimumCoin = function (money) {
            if (money % _constant__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE_NUMBER.MINIMUM_COIN !== 0) {
                throw new Error(_constant__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.DIVIDED_BY_MINIMUM_COIN);
            }
        };
        this.checkMoenyUnderZero = function (money) {
            if (money <= 0) {
                throw new Error(_constant__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.MINIMUM_CHANGES);
            }
        };
        this.checkMaxMoneyInput = function (money) {
            if (money > _constant__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE_NUMBER.MAXIMUM_USER_INPUT) {
                throw new Error(_constant__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.MAXIMUM_USER_INPUT);
            }
        };
        this.chargedMoney = (_a = (0,_util_localStorage__WEBPACK_IMPORTED_MODULE_1__.getLocalStorage)("charged")) !== null && _a !== void 0 ? _a : 0;
    }
    ProductPurchaseMachine.prototype.setChargedMoney = function (data) {
        (0,_util_localStorage__WEBPACK_IMPORTED_MODULE_1__.setLocalStorage)("charged", data);
    };
    ProductPurchaseMachine.prototype.getChargedMoney = function () {
        return this.chargedMoney;
    };
    return ProductPurchaseMachine;
}());

var productPurchaseMachine = new ProductPurchaseMachine();


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _assertThisInitialized)
/* harmony export */ });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/construct.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/construct.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _construct)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");
/* harmony import */ var _isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isNativeReflectConstruct.js */ "./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js");


function _construct(Parent, args, Class) {
  if ((0,_isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_1__["default"])()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _getPrototypeOf)
/* harmony export */ });
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inherits.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inherits.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inherits)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/isNativeFunction.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/isNativeFunction.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isNativeFunction)
/* harmony export */ });
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isNativeReflectConstruct)
/* harmony export */ });
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _possibleConstructorReturn)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized.js */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");


function _possibleConstructorReturn(self, call) {
  if (call && ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return (0,_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__["default"])(self);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _wrapNativeSuper)
/* harmony export */ });
/* harmony import */ var _getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");
/* harmony import */ var _isNativeFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isNativeFunction.js */ "./node_modules/@babel/runtime/helpers/esm/isNativeFunction.js");
/* harmony import */ var _construct_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./construct.js */ "./node_modules/@babel/runtime/helpers/esm/construct.js");




function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !(0,_isNativeFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return (0,_construct_js__WEBPACK_IMPORTED_MODULE_3__["default"])(Class, arguments, (0,_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

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
/* harmony import */ var _js_components_user_profile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/components/user-profile */ "./src/js/components/user-profile.js");
/* harmony import */ var _js_components_page_by_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/components/page-by-login */ "./src/js/components/page-by-login.js");
/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/app */ "./src/js/app.js");






})();

/******/ })()
;
//# sourceMappingURL=index.bundle.js.map