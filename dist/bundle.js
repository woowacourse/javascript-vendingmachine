/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/es/display/Header.js":
/*!**********************************!*\
  !*** ./src/es/display/Header.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var _Utils_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Utils/index */ "./src/es/utils/index.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Header = /*#__PURE__*/function () {
  function Header() {
    _classCallCheck(this, Header);

    _defineProperty(this, "$container", (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$)('header'));
  }

  _createClass(Header, [{
    key: "render",
    value: function render(state) {
      this.drawNavigationMenu(state);
    }
  }, {
    key: "drawNavigationMenu",
    value: function drawNavigationMenu(_ref) {
      var currentPage = _ref.currentPage;
      (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$)('.nav .selected').classList.remove('selected');
      var selectedMenu = (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$)(".nav-menu[data-route*=\"".concat(currentPage, "\"]"));
      selectedMenu.classList.add('selected');
    }
  }]);

  return Header;
}();



/***/ }),

/***/ "./src/es/display/Router.js":
/*!**********************************!*\
  !*** ./src/es/display/Router.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Router)
/* harmony export */ });
/* harmony import */ var _Utils_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Utils/index */ "./src/es/utils/index.ts");
/* harmony import */ var _Display_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Display/Header */ "./src/es/display/Header.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var Router = /*#__PURE__*/function () {
  function Router(pageList) {
    _classCallCheck(this, Router);

    _defineProperty(this, "pageHeader", new _Display_Header__WEBPACK_IMPORTED_MODULE_1__["default"]());

    _defineProperty(this, "pageList", void 0);

    this.pageList = pageList;
    this.setEvents();
    this.pageRender(window.location.search);
  }

  _createClass(Router, [{
    key: "setEvents",
    value: function setEvents() {
      var _this = this;

      (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$)('#app').addEventListener('click', function (event) {
        var routeURL = event.target.dataset.route;
        if (!routeURL) return;

        _this.pushState(routeURL);
      });
      window.addEventListener('popstate', function () {
        _this.pageRender(window.location.search);
      });
    }
  }, {
    key: "pushState",
    value: function pushState(searchUrl) {
      window.history.pushState((0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.getSearchParamsObject)(searchUrl), '', searchUrl);
      this.pageRender(searchUrl);
    }
  }, {
    key: "pageRender",
    value: function pageRender(searchUrl) {
      var _getSearchParamsObjec = (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.getSearchParamsObject)(searchUrl),
          _getSearchParamsObjec2 = _getSearchParamsObjec.page,
          page = _getSearchParamsObjec2 === void 0 ? 'product' : _getSearchParamsObjec2;

      this.pageHeader.render({
        currentPage: page
      });
      !!this.pageList[page] && this.pageList[page].loadPage();
    }
  }]);

  return Router;
}();



/***/ }),

/***/ "./src/es/display/pages/HoldingAmountPage.js":
/*!***************************************************!*\
  !*** ./src/es/display/pages/HoldingAmountPage.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HoldingAmountPage)
/* harmony export */ });
/* harmony import */ var _Utils_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Utils/index */ "./src/es/utils/index.ts");
/* harmony import */ var _Utils_VendingMachine_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Utils/VendingMachine/validator */ "./src/es/utils/VendingMachine/validator.ts");
/* harmony import */ var _Store_HoldingAmountStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Store/HoldingAmountStore */ "./src/es/Store/HoldingAmountStore.ts");
/* harmony import */ var _Display_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Display/template */ "./src/es/display/template.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var HoldingAmountPage = /*#__PURE__*/function () {
  function HoldingAmountPage() {
    var _this = this;

    _classCallCheck(this, HoldingAmountPage);

    _defineProperty(this, "renderMethodList", void 0);

    _defineProperty(this, "$addFormSection", void 0);

    _defineProperty(this, "$addForm", void 0);

    _defineProperty(this, "$tableSection", void 0);

    _defineProperty(this, "$table", void 0);

    _defineProperty(this, "loadPage", function () {
      (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$)('main').innerHTML = _Display_template__WEBPACK_IMPORTED_MODULE_3__.template.holdingAmountPage;

      _this.setDom();

      _this.render({
        state: _Store_HoldingAmountStore__WEBPACK_IMPORTED_MODULE_2__["default"].getState(),
        changeStates: Object.keys(_this.renderMethodList)
      });

      _this.setEvents();
    });

    _defineProperty(this, "render", function (_ref) {
      var state = _ref.state,
          changeStates = _ref.changeStates;
      changeStates.forEach(function (stateKey) {
        _this.renderMethodList[stateKey].forEach(function (renderMethod) {
          return renderMethod(state);
        });
      });
    });

    _defineProperty(this, "drawTotalHoldingAmount", function () {
      var totalAmount = _Store_HoldingAmountStore__WEBPACK_IMPORTED_MODULE_2__["default"].getTotalAmount();
      (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$)('#total-holding-amount', _this.$addFormSection).innerText = "".concat(totalAmount.toLocaleString(), "\uC6D0");
    });

    _defineProperty(this, "drawHoldingAmountList", function (_ref2) {
      var coins = _ref2.coins;
      (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$)('tbody', _this.$table).innerHTML = _Display_template__WEBPACK_IMPORTED_MODULE_3__.template.holdingAmountTableRows(coins);
    });

    _Store_HoldingAmountStore__WEBPACK_IMPORTED_MODULE_2__["default"].addSubscriber(this.render);
    this.setRenderMethodList();
  }

  _createClass(HoldingAmountPage, [{
    key: "setDom",
    value: function setDom() {
      this.$addFormSection = (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$)('#add-holding-amount-form-section');
      this.$addForm = (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$)('#add-holding-amount-form', this.$addFormSection);
      this.$tableSection = (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$)('#holding-amount-table-section');
      this.$table = (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$)('#holding-amount-table', this.$tableSection);
    }
  }, {
    key: "setRenderMethodList",
    value: function setRenderMethodList() {
      this.renderMethodList = {
        coins: [this.drawTotalHoldingAmount, this.drawHoldingAmountList]
      };
    }
  }, {
    key: "setEvents",
    value: function setEvents() {
      this.$addForm.addEventListener('submit', this.onSubmitAddHoldingAmountForm);
    }
  }, {
    key: "onSubmitAddHoldingAmountForm",
    value: function onSubmitAddHoldingAmountForm(event) {
      event.preventDefault();
      var $input = (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$)('input[name="add-holding-amount"]', event.target);
      var totalAmount = _Store_HoldingAmountStore__WEBPACK_IMPORTED_MODULE_2__["default"].getTotalAmount();

      try {
        (0,_Utils_VendingMachine_validator__WEBPACK_IMPORTED_MODULE_1__.validateHoldingAmountToAdd)(Number($input.value), totalAmount);
      } catch (error) {
        alert(error.message);
        return;
      }

      _Store_HoldingAmountStore__WEBPACK_IMPORTED_MODULE_2__["default"].addAmount($input.value);
      $input.value = '';
    }
  }]);

  return HoldingAmountPage;
}();



/***/ }),

/***/ "./src/es/display/pages/ProductPage.js":
/*!*********************************************!*\
  !*** ./src/es/display/pages/ProductPage.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductPage)
/* harmony export */ });
/* harmony import */ var _Utils_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Utils/index */ "./src/es/utils/index.ts");
/* harmony import */ var _Utils_VendingMachine_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Utils/VendingMachine/validator */ "./src/es/utils/VendingMachine/validator.ts");
/* harmony import */ var _Store_ProductStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Store/ProductStore */ "./src/es/Store/ProductStore.ts");
/* harmony import */ var _Display_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Display/template */ "./src/es/display/template.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var ProductPage = /*#__PURE__*/function () {
  function ProductPage() {
    var _this = this;

    _classCallCheck(this, ProductPage);

    _defineProperty(this, "renderMethodList", void 0);

    _defineProperty(this, "$addFormSection", void 0);

    _defineProperty(this, "$addForm", void 0);

    _defineProperty(this, "$tableSection", void 0);

    _defineProperty(this, "$table", void 0);

    _defineProperty(this, "loadPage", function () {
      (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$)('main').innerHTML = _Display_template__WEBPACK_IMPORTED_MODULE_3__.template.productPage;

      _this.setDom();

      _this.render({
        state: _Store_ProductStore__WEBPACK_IMPORTED_MODULE_2__["default"].getState(),
        changeStates: Object.keys(_this.renderMethodList)
      });

      _this.setEvents();
    });

    _defineProperty(this, "render", function (_ref) {
      var state = _ref.state,
          changeStates = _ref.changeStates;
      changeStates.forEach(function (stateKey) {
        _this.renderMethodList[stateKey].forEach(function (renderMethod) {
          return renderMethod(state);
        });
      });
    });

    _defineProperty(this, "drawProductList", function (_ref2) {
      var products = _ref2.products;
      var productItem = _Display_template__WEBPACK_IMPORTED_MODULE_3__.template.productTableRows(products);
      (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$)('tbody', _this.$table).innerHTML = productItem;
    });

    _Store_ProductStore__WEBPACK_IMPORTED_MODULE_2__["default"].addSubscriber(this.render);
    this.setRenderMethodList();
  }

  _createClass(ProductPage, [{
    key: "setDom",
    value: function setDom() {
      this.$addFormSection = (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$)('#add-product-form-section');
      this.$addForm = (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$)('#add-product-form', this.$addFormSection);
      this.$tableSection = (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$)('#product-table-section');
      this.$table = (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$)('#product-table', this.$tableSection);
    }
  }, {
    key: "setRenderMethodList",
    value: function setRenderMethodList() {
      this.renderMethodList = {
        products: [this.drawProductList]
      };
    }
  }, {
    key: "setEvents",
    value: function setEvents() {
      var _this2 = this;

      this.$addForm.addEventListener('submit', this.onSubmitAddProductForm);
      this.$table.addEventListener('click', function (event) {
        if (event.target.classList.contains('product-update-button')) {
          _this2.onClickUpdateButton(event);
        }

        if (event.target.classList.contains('product-update-confirm-button')) {
          _this2.onClickUpdateConfirmButton(event);
        }

        if (event.target.classList.contains('product-update-cancel-button')) {
          _this2.onClickUpdateCancelButton(event);
        }

        if (event.target.classList.contains('product-delete-button')) {
          _this2.onClickDeleteButton(event);
        }
      });
    }
  }, {
    key: "onSubmitAddProductForm",
    value: function onSubmitAddProductForm(event) {
      event.preventDefault();
      var $$inputs = (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$$)('input', event.target);
      var product = Array.from($$inputs).reduce(function (previous, inputElement) {
        previous[inputElement.name] = inputElement.type === 'number' ? Number(inputElement.value) : inputElement.value;
        return previous;
      }, {});

      try {
        (0,_Utils_VendingMachine_validator__WEBPACK_IMPORTED_MODULE_1__.validateProduct)(product);
      } catch (error) {
        alert(error.message);
        return;
      }

      var productIndex = _Store_ProductStore__WEBPACK_IMPORTED_MODULE_2__["default"].findProductIndexByName(product.name);

      if (productIndex === -1) {
        _Store_ProductStore__WEBPACK_IMPORTED_MODULE_2__["default"].addProduct(product);
        $$inputs.forEach(function ($input) {
          return $input.value = '';
        });
        return;
      }

      if (confirm('이미 존재하는 상품입니다.\n기존 상품 목록에서 덮어씌우시겠습니까?')) {
        _Store_ProductStore__WEBPACK_IMPORTED_MODULE_2__["default"].updateProduct(productIndex, product);
      }
    }
  }, {
    key: "onClickUpdateButton",
    value: function onClickUpdateButton(_ref3) {
      var $target = _ref3.target;
      var $tableRow = $target.closest('tr[data-primary-key]');
      if (!$tableRow) return;
      var productIndex = $tableRow.dataset.primaryKey;

      var _ProductStore$getStat = _Store_ProductStore__WEBPACK_IMPORTED_MODULE_2__["default"].getState(),
          products = _ProductStore$getStat.products;

      $tableRow.innerHTML = _Display_template__WEBPACK_IMPORTED_MODULE_3__.template.productTableRowUpdate(products[productIndex]);
    }
  }, {
    key: "onClickUpdateConfirmButton",
    value: function onClickUpdateConfirmButton(_ref4) {
      var $target = _ref4.target;
      var $tableRow = $target.closest('tr[data-primary-key]');
      if (!$tableRow) return;
      var productIndex = $tableRow.dataset.primaryKey;
      var product = Array.from((0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.$$)('input', $tableRow)).reduce(function (previous, inputElement) {
        previous[inputElement.name] = inputElement.type === 'number' ? Number(inputElement.value) : inputElement.value;
        return previous;
      }, {});

      try {
        (0,_Utils_VendingMachine_validator__WEBPACK_IMPORTED_MODULE_1__.validateProduct)(product);
      } catch (error) {
        alert(error.message);
        return;
      }

      _Store_ProductStore__WEBPACK_IMPORTED_MODULE_2__["default"].updateProduct(productIndex, product);
    }
  }, {
    key: "onClickUpdateCancelButton",
    value: function onClickUpdateCancelButton(_ref5) {
      var $target = _ref5.target;
      var $tableRow = $target.closest('tr[data-primary-key]');
      if (!$tableRow) return;
      var productIndex = $tableRow.dataset.primaryKey;

      var _ProductStore$getStat2 = _Store_ProductStore__WEBPACK_IMPORTED_MODULE_2__["default"].getState(),
          products = _ProductStore$getStat2.products;

      $tableRow.innerHTML = _Display_template__WEBPACK_IMPORTED_MODULE_3__.template.productTableRowInners(products[productIndex]);
    }
  }, {
    key: "onClickDeleteButton",
    value: function onClickDeleteButton(_ref6) {
      var $target = _ref6.target;
      if (!confirm('정말 해당 상품을 삭제하시겠습니까?')) return;
      var $tableRow = $target.closest('tr[data-primary-key]');
      if (!$tableRow) return;
      var productIndex = $tableRow.dataset.primaryKey;
      _Store_ProductStore__WEBPACK_IMPORTED_MODULE_2__["default"].removeProductByIndex(productIndex);
    }
  }]);

  return ProductPage;
}();



/***/ }),

/***/ "./src/es/display/template.js":
/*!************************************!*\
  !*** ./src/es/display/template.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "template": () => (/* binding */ template)
/* harmony export */ });
/* harmony import */ var _Constants_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Constants/index */ "./src/es/constants/index.ts");

var template = {
  productPage: "\n  <section id=\"add-product-form-section\" class=\"form-section\">\n    <form id=\"add-product-form\">\n        <label form=\"add-product-form\">\uCD94\uAC00\uD560 \uC0C1\uD488 \uC815\uBCF4\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.</label>\n        <div class=\"add-product-input-wrap\">\n            <input type=\"text\" name=\"name\" placeholder=\"\uC0C1\uD488\uBA85\" form=\"add-product-form\" required>\n            <input type=\"number\" name=\"price\" placeholder=\"\uAC00\uACA9\" form=\"add-product-form\" required>\n            <input type=\"number\" name=\"quantity\" placeholder=\"\uC218\uB7C9\" form=\"add-product-form\" required>\n            <button id=\"add-product-submit-button\" class=\"button accent\">\uCD94\uAC00</button>\n        </div>\n    </form>\n  </section>\n  <section id=\"product-table-section\" class=\"table-section\">\n    <table id=\"product-table\" class=\"table\">\n        <caption>\uC0C1\uD488 \uD604\uD669</caption>\n        <thead>\n            <tr>\n                <th width=\"22%\">\uC0C1\uD488\uBA85</th>\n                <th width=\"22%\">\uAC00\uACA9</th>\n                <th width=\"22%\">\uC218\uB7C9</th>\n                <th width=\"34%\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n            </tr>\n        </tbody>\n    </table>\n  </section>\n  ",
  holdingAmountPage: "\n  <section id=\"add-holding-amount-form-section\" class=\"form-section\">\n    <form id=\"add-holding-amount-form\">\n        <label form=\"add-holding-amount-form\">\uC790\uD310\uAE30\uAC00 \uBCF4\uC720\uD560 \uAE08\uC561\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694</label>\n        <div class=\"add-holding-amount-wrap\">\n            <input type=\"number\" name=\"add-holding-amount\" placeholder=\"\uAE08\uC561\" form=\"add-holding-amount-form\" required>\n            <button id=\"add-holding-amount-submit-button\" class=\"button accent\">\uCD94\uAC00</button>\n        </div>\n    </form>\n    <p class=\"holding-amount\">\uD604\uC7AC \uBCF4\uC720 \uAE08\uC561: <span id=\"total-holding-amount\">0\uC6D0</span></p>\n  </section>\n  <section id=\"holding-amount-table-section\" class=\"table-section\">\n    <table id=\"holding-amount-table\" class=\"table\">\n        <caption>\uC790\uD310\uAE30\uAC00 \uBCF4\uC720\uD55C \uB3D9\uC804</caption>\n        <thead>\n            <tr><th>\uB3D9\uC804</th><th>\uAC1C\uC218</th></tr>\n        </thead>\n        <tbody>\n            <tr><td>500\uC6D0</td><td>0\uAC1C</td></tr>\n            <tr><td>100\uC6D0</td><td>0\uAC1C</td></tr>\n            <tr><td>50\uC6D0</td><td>0\uAC1C</td></tr>\n            <tr><td>10\uC6D0</td><td>0\uAC1C</td></tr>\n        </tbody>\n    </table>\n  </section>\n  ",
  productTableRowInners: function productTableRowInners(_ref) {
    var name = _ref.name,
        price = _ref.price,
        quantity = _ref.quantity;
    return "\n    <td>".concat(name, "</td>\n    <td>").concat(price.toLocaleString(), "</td>\n    <td>").concat(quantity, "</td>\n    <td>\n      <div class=\"button-group\">\n        <button class=\"button product-update-button\" type=\"button\">\uC218\uC815</button>\n        <button class=\"button product-delete-button\" type=\"button\">\uC0AD\uC81C</button>\n      </div>\n    </td>\n  ");
  },
  productTableRows: function productTableRows(products) {
    return products.map(function (_ref2, index) {
      var name = _ref2.name,
          price = _ref2.price,
          quantity = _ref2.quantity;
      return "\n        <tr data-primary-key=\"".concat(index, "\">\n          ").concat(template.productTableRowInners({
        name: name,
        price: price,
        quantity: quantity
      }), "\n        </tr>");
    }).join('');
  },
  productTableRowUpdate: function productTableRowUpdate(_ref3) {
    var name = _ref3.name,
        price = _ref3.price,
        quantity = _ref3.quantity;
    return "\n    <td><input type=\"text\" name=\"name\" placeholder=\"\uC0C1\uD488\uBA85\" value=\"".concat(name, "\"></td>\n    <td><input type=\"number\" name=\"price\" placeholder=\"\uAC00\uACA9\" value=\"").concat(price.toLocaleString(), "\"></td>\n    <td><input type=\"number\" name=\"quantity\" placeholder=\"\uC218\uB7C9\" value=\"").concat(quantity, "\"></td>\n    <td>\n      <div class=\"button-group\">\n        <button class=\"button product-update-confirm-button\" type=\"button\">\uD655\uC778</button>\n        <button class=\"button product-update-cancel-button\" type=\"button\">\uCDE8\uC18C</button>\n      </div>\n    </td>\n");
  },
  holdingAmountTableRows: function holdingAmountTableRows(coins) {
    return coins.map(function (coin, index) {
      return "\n      <tr>\n        <td>".concat(_Constants_index__WEBPACK_IMPORTED_MODULE_0__.COIN_TYPE[index], "\uC6D0</td>\n        <td>").concat(coin.toLocaleString(), "\uAC1C</td>\n      </tr>");
    }).join('');
  }
};

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/es/Store/HoldingAmountStore.ts":
/*!********************************************!*\
  !*** ./src/es/Store/HoldingAmountStore.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Utils_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Utils/index */ "./src/es/utils/index.ts");
/* harmony import */ var _Constants_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Constants/index */ "./src/es/constants/index.ts");
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


var HoldingAmountStore = /** @class */ (function () {
    function HoldingAmountStore() {
        this.state = {
            coins: [0, 0, 0, 0]
        };
        this.subscribers = [];
    }
    HoldingAmountStore.prototype.addSubscriber = function (subscriber) {
        this.subscribers.push(subscriber);
    };
    HoldingAmountStore.prototype.setState = function (newState) {
        var _this = this;
        var changeStates = Object.entries(newState).map(function (_a) {
            var key = _a[0];
            return key;
        });
        this.state = __assign(__assign({}, this.state), newState);
        this.subscribers.forEach(function (renderMethod) { return renderMethod({ state: _this.state, changeStates: changeStates }); });
    };
    HoldingAmountStore.prototype.getState = function () {
        return __assign({}, this.state);
    };
    HoldingAmountStore.prototype.getTotalAmount = function () {
        return this.state.coins.reduce(function (previous, coin, index) { return (previous += _Constants_index__WEBPACK_IMPORTED_MODULE_1__.COIN_TYPE[index] * coin); }, 0);
    };
    HoldingAmountStore.prototype.getMaxCoinIndex = function (baseAmount) {
        return _Constants_index__WEBPACK_IMPORTED_MODULE_1__.COIN_TYPE.findIndex(function (coin) { return baseAmount >= coin; });
    };
    HoldingAmountStore.prototype.getRandomCoinsFromAmount = function (amount) {
        var leftAmount = amount;
        var returnCoins = [0, 0, 0, 0];
        while (leftAmount > 0) {
            var coinIndex = (0,_Utils_index__WEBPACK_IMPORTED_MODULE_0__.getRandomNumber)(this.getMaxCoinIndex(leftAmount), _Constants_index__WEBPACK_IMPORTED_MODULE_1__.COIN_TYPE.length - 1);
            var randomCoin = _Constants_index__WEBPACK_IMPORTED_MODULE_1__.COIN_TYPE[coinIndex];
            returnCoins[coinIndex] += 1;
            leftAmount -= randomCoin;
        }
        return returnCoins;
    };
    HoldingAmountStore.prototype.addAmount = function (amount) {
        var coinsToAdd = this.getRandomCoinsFromAmount(amount);
        var totalCoins = this.state.coins.map(function (value, index) { return value + coinsToAdd[index]; });
        this.setState({
            coins: totalCoins
        });
    };
    return HoldingAmountStore;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new HoldingAmountStore());


/***/ }),

/***/ "./src/es/Store/ProductStore.ts":
/*!**************************************!*\
  !*** ./src/es/Store/ProductStore.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
var ProductStore = /** @class */ (function () {
    function ProductStore() {
        this.state = {
            products: []
        };
        this.subscribers = [];
    }
    ProductStore.prototype.addSubscriber = function (subscriber) {
        this.subscribers.push(subscriber);
    };
    ProductStore.prototype.setState = function (newState) {
        var _this = this;
        var changeStates = Object.entries(newState).map(function (_a) {
            var key = _a[0];
            return key;
        });
        this.state = __assign(__assign({}, this.state), newState);
        this.subscribers.forEach(function (renderMethod) { return renderMethod({ state: _this.state, changeStates: changeStates }); });
    };
    ProductStore.prototype.getState = function () {
        return __assign({}, this.state);
    };
    ProductStore.prototype.addProduct = function (product) {
        this.setState({
            products: __spreadArray(__spreadArray([], this.state.products, true), [product], false)
        });
    };
    ProductStore.prototype.updateProduct = function (index, product) {
        var updateProducts = __spreadArray([], this.state.products, true);
        updateProducts.splice(index, 1, product);
        this.setState({
            products: updateProducts
        });
    };
    ProductStore.prototype.removeProductByIndex = function (index) {
        var updateProducts = __spreadArray([], this.state.products, true);
        updateProducts.splice(index, 1);
        this.setState({
            products: updateProducts
        });
    };
    ProductStore.prototype.findProductIndexByName = function (name) {
        return this.state.products.findIndex(function (product) { return product.name === name; });
    };
    return ProductStore;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new ProductStore());


/***/ }),

/***/ "./src/es/constants/index.ts":
/*!***********************************!*\
  !*** ./src/es/constants/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COIN_TYPE": () => (/* binding */ COIN_TYPE),
/* harmony export */   "VENDING_MACHINE": () => (/* binding */ VENDING_MACHINE),
/* harmony export */   "ERROR_MESSAGE": () => (/* binding */ ERROR_MESSAGE)
/* harmony export */ });
var COIN_TYPE = [500, 100, 50, 10].sort(function (a, b) { return b - a; });
var VENDING_MACHINE = {
    MIN_PRODUCT_NAME: 1,
    MAX_PRODUCT_NAME: 10,
    MIN_PRODUCT_PRICE: 100,
    MAX_PRODUCT_PRICE: 10000,
    MIN_PRODUCT_QUANTITY: 1,
    MAX_PRODUCT_QUANTITY: 10,
    MAX_HOLDING_AMOUNT: 100000,
    MONEY_UNIT: 10
};
var ERROR_MESSAGE = {
    PRODUCT_NAME_REQUIRED: '상품명을 입력해주세요.',
    PRODUCT_NAME_LENGTH: "\uC0C1\uD488\uBA85\uC740 ".concat(VENDING_MACHINE.MIN_PRODUCT_NAME, "\uC790\uC5D0\uC11C ").concat(VENDING_MACHINE.MAX_PRODUCT_NAME, "\uC790\uAE4C\uC9C0 \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."),
    PRODUCT_PRICE_ONLY_NUMBER: '상품 가격은 숫자만 입력할 수 있습니다.',
    PRODUCT_PRICE_WRONG_RANGE: "\uC0C1\uD488 \uAC00\uACA9\uC740 ".concat(VENDING_MACHINE.MIN_PRODUCT_PRICE, "\uC6D0\uC5D0\uC11C ").concat(VENDING_MACHINE.MAX_PRODUCT_PRICE, "\uC6D0\uAE4C\uC9C0 \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."),
    PRODUCT_PRICE_WRONG_UNIT: "\uC0C1\uD488 \uAC00\uACA9\uC740 ".concat(VENDING_MACHINE.MONEY_UNIT, "\uC6D0 \uB2E8\uC704\uB85C \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."),
    PRODUCT_QUANTITY_ONLY_NUMBER: '상품 수량은 숫자만 입력할 수 있습니다.',
    PRODUCT_QUANTITY_WRONG_RANGE: "\uC0C1\uD488 \uC218\uB7C9\uC740 ".concat(VENDING_MACHINE.MIN_PRODUCT_QUANTITY, "\uAC1C\uC5D0\uC11C \uCD5C\uB300 ").concat(VENDING_MACHINE.MAX_PRODUCT_QUANTITY, "\uAC1C\uAE4C\uC9C0\uB9CC \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."),
    HOLDING_AMOUNT_ONLY_NUMBER: '추가할 보유 금액은 숫자만 입력할 수 있습니다.',
    HOLDING_AMOUNT_WRONG_UNIT: "\uCD94\uAC00\uD560 \uC790\uD310\uAE30 \uBCF4\uC720 \uAE08\uC561\uC740 ".concat(VENDING_MACHINE.MONEY_UNIT, "\uC6D0 \uB2E8\uC704\uB85C \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."),
    HOLDING_AMOUNT_WRONG_LIMIT: "\uC790\uD310\uAE30 \uBCF4\uC720 \uAE08\uC561\uC740 ".concat(VENDING_MACHINE.MAX_HOLDING_AMOUNT, "\uC6D0\uAE4C\uC9C0 \uCDA9\uC804\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.")
};


/***/ }),

/***/ "./src/es/utils/VendingMachine/validator.ts":
/*!**************************************************!*\
  !*** ./src/es/utils/VendingMachine/validator.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validateProduct": () => (/* binding */ validateProduct),
/* harmony export */   "validateHoldingAmountToAdd": () => (/* binding */ validateHoldingAmountToAdd)
/* harmony export */ });
/* harmony import */ var _Constants_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Constants/index */ "./src/es/constants/index.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index */ "./src/es/utils/index.ts");


var validateProduct = function (product) {
    var name = product.name, price = product.price, quantity = product.quantity;
    var MIN_PRODUCT_NAME = _Constants_index__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE.MIN_PRODUCT_NAME, MAX_PRODUCT_NAME = _Constants_index__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE.MAX_PRODUCT_NAME, MIN_PRODUCT_PRICE = _Constants_index__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE.MIN_PRODUCT_PRICE, MAX_PRODUCT_PRICE = _Constants_index__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE.MAX_PRODUCT_PRICE, MONEY_UNIT = _Constants_index__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE.MONEY_UNIT, MIN_PRODUCT_QUANTITY = _Constants_index__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE.MIN_PRODUCT_QUANTITY, MAX_PRODUCT_QUANTITY = _Constants_index__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE.MAX_PRODUCT_QUANTITY;
    if (name === '')
        throw new Error(_Constants_index__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.PRODUCT_NAME_REQUIRED);
    if (!(0,_index__WEBPACK_IMPORTED_MODULE_1__.isStringLengthInRange)(name, MIN_PRODUCT_NAME, MAX_PRODUCT_NAME))
        throw new Error(_Constants_index__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.PRODUCT_NAME_LENGTH);
    if (!Number.isInteger(price))
        throw new Error(_Constants_index__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.PRODUCT_PRICE_ONLY_NUMBER);
    if (!(0,_index__WEBPACK_IMPORTED_MODULE_1__.isNumberInRange)(price, MIN_PRODUCT_PRICE, MAX_PRODUCT_PRICE))
        throw new Error(_Constants_index__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.PRODUCT_PRICE_WRONG_RANGE);
    if (!(0,_index__WEBPACK_IMPORTED_MODULE_1__.isCorrectNumberUnit)(price, MONEY_UNIT))
        throw new Error(_Constants_index__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.PRODUCT_PRICE_WRONG_UNIT);
    if (!Number.isInteger(quantity))
        throw new Error(_Constants_index__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.PRODUCT_QUANTITY_ONLY_NUMBER);
    if (!(0,_index__WEBPACK_IMPORTED_MODULE_1__.isNumberInRange)(quantity, MIN_PRODUCT_QUANTITY, MAX_PRODUCT_QUANTITY))
        throw new Error(_Constants_index__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.PRODUCT_QUANTITY_WRONG_RANGE);
    return true;
};
var validateHoldingAmountToAdd = function (holdingAmountToAdd, totalAmount) {
    var MAX_HOLDING_AMOUNT = _Constants_index__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE.MAX_HOLDING_AMOUNT, MONEY_UNIT = _Constants_index__WEBPACK_IMPORTED_MODULE_0__.VENDING_MACHINE.MONEY_UNIT;
    if (!Number.isInteger(holdingAmountToAdd))
        throw new Error(_Constants_index__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.HOLDING_AMOUNT_ONLY_NUMBER);
    if (!(0,_index__WEBPACK_IMPORTED_MODULE_1__.isCorrectNumberUnit)(holdingAmountToAdd, MONEY_UNIT))
        throw new Error(_Constants_index__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.HOLDING_AMOUNT_WRONG_UNIT);
    if (holdingAmountToAdd + totalAmount > MAX_HOLDING_AMOUNT)
        throw new Error(_Constants_index__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.HOLDING_AMOUNT_WRONG_LIMIT);
    return true;
};


/***/ }),

/***/ "./src/es/utils/index.ts":
/*!*******************************!*\
  !*** ./src/es/utils/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ $),
/* harmony export */   "$$": () => (/* binding */ $$),
/* harmony export */   "getRandomNumber": () => (/* binding */ getRandomNumber),
/* harmony export */   "isNumberInRange": () => (/* binding */ isNumberInRange),
/* harmony export */   "isStringLengthInRange": () => (/* binding */ isStringLengthInRange),
/* harmony export */   "isCorrectNumberUnit": () => (/* binding */ isCorrectNumberUnit),
/* harmony export */   "getSearchParamsObject": () => (/* binding */ getSearchParamsObject)
/* harmony export */ });
var $ = function (selector, node) {
    if (node === void 0) { node = document; }
    return node.querySelector(selector);
};
var $$ = function (selector, node) {
    if (node === void 0) { node = document; }
    return node.querySelectorAll(selector);
};
var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
var isNumberInRange = function (value, min, max) {
    return value >= min && value <= max;
};
var isStringLengthInRange = function (value, min, max) {
    return value.length >= min && value.length <= max;
};
var isCorrectNumberUnit = function (value, unit) { return value % unit === 0; };
var getSearchParamsObject = function (searchUrl) {
    if (searchUrl === void 0) { searchUrl = ''; }
    var searchString = "?".concat(searchUrl.split('?')[1]);
    var searchParams = new URLSearchParams(searchString);
    return Array.from(searchParams.keys()).reduce(function (previous, key) {
        previous[key] = searchParams.get(key);
        return previous;
    }, {});
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
/******/ 			// no module.id needed
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
/* harmony import */ var _Styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Styles */ "./src/styles/index.scss");
/* harmony import */ var _Display_Router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Display/Router */ "./src/es/display/Router.js");
/* harmony import */ var _Display_pages_ProductPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Display/pages/ProductPage */ "./src/es/display/pages/ProductPage.js");
/* harmony import */ var _Display_pages_HoldingAmountPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Display/pages/HoldingAmountPage */ "./src/es/display/pages/HoldingAmountPage.js");




new _Display_Router__WEBPACK_IMPORTED_MODULE_1__["default"]({
    product: new _Display_pages_ProductPage__WEBPACK_IMPORTED_MODULE_2__["default"](),
    holding_amount: new _Display_pages_HoldingAmountPage__WEBPACK_IMPORTED_MODULE_3__["default"]()
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map