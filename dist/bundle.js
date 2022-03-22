/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domain/CoinVault.ts":
/*!*********************************!*\
  !*** ./src/domain/CoinVault.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CoinVault": () => (/* binding */ CoinVault)
/* harmony export */ });
class CoinVault {
    constructor() {
        this.coinsQuantity = {
            coin500: 0,
            coin100: 0,
            coin50: 0,
            coin10: 0,
        };
        this.coinsPrice = {
            coin500: 500,
            coin100: 100,
            coin50: 50,
            coin10: 10,
        };
    }
    addCoins(coins) {
        [...Object.entries(coins)].forEach(([key, value]) => {
            this.coinsQuantity[key] += value;
        });
    }
    getCoins() {
        return this.coinsQuantity;
    }
    getBalance() {
        return [...Object.entries(this.coinsQuantity)].reduce((previous, [key, value]) => previous + this.coinsPrice[key] * value, 0);
    }
    chargeMoney(money) {
        try {
            this.validateMoney(money);
            this.addCoins(this.generateRandomCoins(money));
        }
        catch (err) {
            throw err;
        }
    }
    validateMoney(money) {
        if (money + this.getBalance() > 100000) {
            throw new Error('돈통이 가득찼어요! 100,000원 까지만 보관 가능합니다.');
        }
        if (money % 10 !== 0) {
            throw new Error('상평통보는 안 받습니다. 10원단위로 넣어주세요!');
        }
        return;
    }
    generateRandomCoins(money) {
        let balance = money;
        const generatedCoins = {
            coin500: 0,
            coin100: 0,
            coin50: 0,
            coin10: 0,
        };
        //TODO
        //uitls -> CoinObject Arr를 주는 함수
        [...Object.entries(this.coinsPrice)].forEach(([key, price]) => {
            //object(coin종류)를 순회한다
            const maxQuotient = balance / price; //coin종류에 맞는 최대 몫을 정한다
            if (price === 10) {
                //10원(마지막 요소)일때
                generatedCoins[key] = maxQuotient; //남은걸 다 때려박는다
                return;
            }
            //마지막 요소가 아닐때
            //범위 내에서 랜덤하게 정수로 뽑아주는 함수
            const randomQuantity = Math.floor(Math.random() * maxQuotient); //최대몫 미만으로 랜덤하게 뽑느다.
            balance -= price * randomQuantity; //뽑은만큼 잔액을 차감한다.
            generatedCoins[key] = randomQuantity; //뽑은 수량을 저장한다.
        });
        return generatedCoins;
    }
}


/***/ }),

/***/ "./src/domain/Product.ts":
/*!*******************************!*\
  !*** ./src/domain/Product.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Product": () => (/* binding */ Product)
/* harmony export */ });
class Product {
    constructor(name, price, quantity) {
        this.setName(name);
        this.setPrice(price);
        this.setQuantity(quantity);
    }
    setName(name) {
        try {
            this.validateName(name);
            this.name = name;
        }
        catch (err) {
            throw err;
        }
    }
    validateName(name) {
        if (name.length > 10) {
            throw new Error('10글자 미만의 이름을 넣어주세요~');
        }
        return;
    }
    setPrice(price) {
        try {
            this.validatePrice(price);
            this.price = price;
        }
        catch (err) {
            throw err;
        }
    }
    validatePrice(price) {
        if (price < 100 || price > 10000) {
            throw new Error('100원 이상, 10,000원 이하의 돈을 넣어주세요~');
        }
        if (price % 10 !== 0) {
            throw new Error('10원단위로 돈을 넣어주세요~');
        }
        return;
    }
    setQuantity(quantity) {
        try {
            this.validateQuantity(quantity);
            this.quantity = quantity;
        }
        catch (err) {
            throw err;
        }
    }
    validateQuantity(quantity) {
        if (quantity > 20) {
            throw new Error('상품수량은 최대 20개까지만 가능합니다~');
        }
        return;
    }
    getName() {
        return this.name;
    }
    getPrice() {
        return this.price;
    }
    getQuantity() {
        return this.quantity;
    }
    getAllProperties() {
        return { name: this.name, price: this.price, quantity: this.quantity };
    }
}


/***/ }),

/***/ "./src/domain/ProductCatalog.ts":
/*!**************************************!*\
  !*** ./src/domain/ProductCatalog.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProductCatalog": () => (/* binding */ ProductCatalog)
/* harmony export */ });
/* harmony import */ var _Product__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Product */ "./src/domain/Product.ts");

class ProductCatalog {
    constructor() {
        this.productList = [];
    }
    addProduct(name, price, quantity) {
        const productIndex = this.findExistingProductIndex(name);
        if (productIndex !== -1) {
            const target = this.productList[productIndex];
            target.setQuantity(target.getQuantity() + quantity);
            return;
        }
        this.productList = [...this.productList, new _Product__WEBPACK_IMPORTED_MODULE_0__.Product(name, price, quantity)];
    }
    findExistingProductIndex(name) {
        return this.productList.findIndex((product) => product.getName() === name);
    }
    deleteProductByName(name) {
        this.productList = this.productList.filter((product) => product.getName() !== name);
    }
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
/* harmony import */ var _domain_CoinVault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domain/CoinVault */ "./src/domain/CoinVault.ts");
/* harmony import */ var _domain_ProductCatalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domain/ProductCatalog */ "./src/domain/ProductCatalog.ts");


new _domain_CoinVault__WEBPACK_IMPORTED_MODULE_0__.CoinVault();
new _domain_ProductCatalog__WEBPACK_IMPORTED_MODULE_1__.ProductCatalog();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map