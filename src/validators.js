import ProductStoreInstance from './domains/stores/ProductStore';
import CoinStoreInstance from './domains/stores/CoinStore';
import { ERROR_MESSAGE, MONEY, PASSWORD, PRODUCT } from './constants';

const validator = (conditions) => {
  conditions.forEach(({ checker, errorMsg }) => {
    if (checker()) throw new Error(errorMsg);
  });
};

const isBlank = (value) => value === '';

const isNotInteger = (number) => !Number.isInteger(number);

const cannotDividedByTen = (number) => number % 10;

const isOverMaxProductNameLength = (name) => name.length > PRODUCT.NAME.MAX_LENGTH;

const isAlreadyExistProduct = (name) => {
  const products = ProductStoreInstance.products ?? [];
  const existProductNames = products.map((product) => product.name);

  return existProductNames.includes(name);
};

const isUnderMinPrice = (price) => price < PRODUCT.PRICE.MIN;

const isOverMaxPrice = (price) => price > PRODUCT.PRICE.MAX;

const isOverPurchaseInputMaxPrice = (price) => price > PRODUCT.PRICE.PURCHASE_INPUT_MAX;

const isUnderMinQuantity = (quantity) => quantity < PRODUCT.QUANTITY.MIN;

const isOverMaxQuantity = (quantity) => quantity > PRODUCT.QUANTITY.MAX;

const isOverMaxMoney = (inputMoney) => {
  const currentMoney = CoinStoreInstance.money;

  return currentMoney + inputMoney > MONEY.MAX;
};

const isProductPriceMoreExpensive = (moneyInput, productPrice) => productPrice > moneyInput;

const isUnderMinPasswordLength = (password) => {
  return password.length < PASSWORD.MIN_LENGTH;
};

const isUnderMinCombinationCount = (password) => {
  let upperCaseExists = false;
  let lowerCaseExists = false;
  let numberExists = false;

  password.split('').forEach((word) => {
    if (word.match(/[A-Z]/g)) {
      upperCaseExists = true;
      return;
    }
    if (word.match(/[a-z]/g)) {
      lowerCaseExists = true;
      return;
    }
    if (word.match(/[0-9]/g)) {
      numberExists = true;
    }
  });

  return upperCaseExists + lowerCaseExists + numberExists < PASSWORD.MIN_COMBINATION_COUNT;
};

const isNotCorrectedPassword = (password) => {
  return isUnderMinPasswordLength(password) || isUnderMinCombinationCount(password);
};

const isNotMatchedPassword = (password, passwordConfirm) => {
  return password !== passwordConfirm;
};

export const checkProductValidation = ({ name, price, quantity }) => {
  validator([
    {
      checker: () => isBlank(name),
      errorMsg: ERROR_MESSAGE.IS_BLANK_PRODUCT_NAME,
    },
    {
      checker: () => isOverMaxProductNameLength(name),
      errorMsg: ERROR_MESSAGE.IS_OVER_MAX_PRODUCT_NAME_LENGTH,
    },
    {
      checker: () => isNotInteger(price),
      errorMsg: ERROR_MESSAGE.IS_NOT_INTEGER_PRICE,
    },
    {
      checker: () => isUnderMinPrice(price),
      errorMsg: ERROR_MESSAGE.IS_UNDER_MIN_PRICE,
    },
    {
      checker: () => isOverMaxPrice(price),
      errorMsg: ERROR_MESSAGE.IS_OVER_MAX_PRICE,
    },
    {
      checker: () => cannotDividedByTen(price),
      errorMsg: ERROR_MESSAGE.PRICE_CANNOT_DIVIDED_BY_TEN,
    },
    {
      checker: () => isNotInteger(quantity),
      errorMsg: ERROR_MESSAGE.IS_NOT_INTEGER_QUANTITY,
    },
    {
      checker: () => isUnderMinQuantity(quantity),
      errorMsg: ERROR_MESSAGE.IS_UNDER_MIN_QUANTITY,
    },
    {
      checker: () => isOverMaxQuantity(quantity),
      errorMsg: ERROR_MESSAGE.IS_OVER_MAX_QUANTITY,
    },
  ]);
};

export const checkProductAddValidation = (product) => {
  validator([
    {
      checker: () => isAlreadyExistProduct(product.name),
      errorMsg: ERROR_MESSAGE.IS_ALREADY_EXIST_PRODUCT_WHEN_ADD,
    },
  ]);

  checkProductValidation(product);
};

export const checkDuplicateProductWhenModify = (product) => {
  validator([
    {
      checker: () => isAlreadyExistProduct(product.name),
      errorMsg: RROR_MESSAGE.IS_ALREADY_EXIST_PRODUCT_WHEN_MODIFY,
    },
  ]);
};

export const checkCoinValidation = (coinInputValue) => {
  validator([
    {
      checker: () => isOverMaxMoney(coinInputValue),
      errorMsg: ERROR_MESSAGE.IS_OVER_MAX_MONEY,
    },
    {
      checker: () => cannotDividedByTen(coinInputValue),
      errorMsg: ERROR_MESSAGE.MONEY_CANNOT_DIVIDED_BY_TEN,
    },
  ]);
};

export const checkPurchaseMoneyValidation = (purchaseMoneyInputValue) => {
  validator([
    {
      checker: () => isUnderMinPrice(purchaseMoneyInputValue),
      errorMsg: ERROR_MESSAGE.IS_UNDER_PRODUCT_MIN_PRICE,
    },
    {
      checker: () => isOverPurchaseInputMaxPrice(purchaseMoneyInputValue),
      errorMsg: ERROR_MESSAGE.IS_OVER_PRODUCT_MAX_PRICE,
    },
    {
      checker: () => cannotDividedByTen(purchaseMoneyInputValue),
      errorMsg: ERROR_MESSAGE.MONEY_CANNOT_DIVIDED_BY_TEN,
    },
  ]);
};

export const checkCanPurchaseValidation = (moneyInput, productPrice) => {
  validator([
    {
      checker: () => isProductPriceMoreExpensive(moneyInput, productPrice),
      errorMsg: ERROR_MESSAGE.IS_OVER_MONEY_INPUT,
    },
  ]);
};

export const checkNewUserInfoValidation = ({ password, passwordConfirm }) => {
  validator([
    {
      checker: () => isNotCorrectedPassword(password),
      errorMsg: ERROR_MESSAGE.IS_NOT_CORRECTED_PASSWORD,
    },
    {
      checker: () => isNotMatchedPassword(password, passwordConfirm),
      errorMsg: ERROR_MESSAGE.IS_NOT_MATCHED_PASSWORD,
    },
  ]);
};
