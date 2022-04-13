import ProductStore from './domains/stores/ProductStore';
import CoinStore from './domains/stores/CoinStore';
import { ERROR_MESSAGE, MONEY, PRODUCT } from './constants';

const isBlank = (value) => value === '';

const isNotInteger = (number) => !Number.isInteger(number);

const cannotDividedByTen = (number) => number % 10;

const isOverMaxProductNameLength = (name) => name.length > PRODUCT.NAME.MAX_LENGTH;

const isAlreadyExistProduct = (name) => {
  const products = ProductStore.instance.products ?? [];
  const existProductNames = products.map((product) => product.name);

  return existProductNames.includes(name);
};

const isUnderMinPrice = (price) => price < PRODUCT.PRICE.MIN;

const isOverMaxPrice = (price) => price > PRODUCT.PRICE.MAX;

const isUnderMinQuantity = (quantity) => quantity < PRODUCT.QUANTITY.MIN;

const isOverMaxQuantity = (quantity) => quantity > PRODUCT.QUANTITY.MAX;

const isUnderMinMoney = (money) => money < MONEY.MIN;

const isOverMaxMachineMoney = (inputMachineMoney) => {
  const currentMachineMoney = CoinStore.instance.machine.money;

  return currentMachineMoney + inputMachineMoney > MONEY.MACHINE_MAX;
};

const isOverMaxCustomerMoney = (inputCustomerMoney) => {
  const currentCustomerMoney = CoinStore.instance.customer.money;

  return currentCustomerMoney + inputCustomerMoney > MONEY.CUSTOMER_MAX;
};

const isSoldOut = (quantity) => {
  return quantity === 0;
};

const isPriceOverCustomerMoney = (price) => {
  return price > CoinStore.instance.customer.money;
};

const isNoCustomerMoney = () => {
  return CoinStore.instance.customer.money === 0;
};

const isPasswordConfirmNotMatchPassword = (password, passwordConfirm) => {
  return password !== passwordConfirm;
};

const validator = (conditions) => {
  conditions.forEach(({ checker, errorMessage }) => {
    if (checker()) throw new Error(errorMessage);
  });
};

// eslint-disable-next-line max-lines-per-function
export const checkProductValidation = ({ name, price, quantity }) => {
  validator([
    {
      checker: () => isBlank(name),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.IS_BLANK_PRODUCT_NAME,
    },
    {
      checker: () => isOverMaxProductNameLength(name),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.IS_OVER_MAX_PRODUCT_NAME_LENGTH,
    },

    {
      checker: () => isNotInteger(price),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.IS_NOT_INTEGER_PRICE,
    },
    {
      checker: () => isUnderMinPrice(price),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.IS_UNDER_MIN_PRICE,
    },
    {
      checker: () => isOverMaxPrice(price),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.IS_OVER_MAX_PRICE,
    },
    {
      checker: () => cannotDividedByTen(price),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.PRICE_CANNOT_DIVIDED_BY_TEN,
    },

    {
      checker: () => isNotInteger(quantity),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.IS_NOT_INTEGER_QUANTITY,
    },
    {
      checker: () => isUnderMinQuantity(quantity),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.IS_UNDER_MIN_QUANTITY,
    },
    {
      checker: () => isOverMaxQuantity(quantity),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.IS_OVER_MAX_QUANTITY,
    },
  ]);
};

export const checkProductAddValidation = (product) => {
  validator([
    {
      checker: () => isAlreadyExistProduct(product.name),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.IS_ALREADY_EXIST_PRODUCT_WHEN_ADD,
    },
  ]);

  checkProductValidation(product);
};

export const checkDuplicateProductWhenModify = ({ name }) => {
  validator([
    {
      checker: () => isAlreadyExistProduct(name),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.IS_ALREADY_EXIST_PRODUCT_WHEN_MODIFY,
    },
  ]);
};

export const checkMachineMoneyValidation = (machineMoneyInputValue) => {
  validator([
    {
      checker: () => isNotInteger(machineMoneyInputValue),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.IS_NOT_INTEGER_MONEY,
    },
    {
      checker: () => isUnderMinMoney(machineMoneyInputValue),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.IS_UNDER_MIN_MONEY,
    },
    {
      checker: () => isOverMaxMachineMoney(machineMoneyInputValue),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.IS_OVER_MAX_MACHINE_MONEY,
    },
    {
      checker: () => cannotDividedByTen(machineMoneyInputValue),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.MONEY_CANNOT_DIVIDED_BY_TEN,
    },
  ]);
};

export const checkCustomerMoneyValidation = (customerMoneyInputValue) => {
  validator([
    {
      checker: () => isNotInteger(customerMoneyInputValue),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.IS_NOT_INTEGER_MONEY,
    },
    {
      checker: () => isUnderMinMoney(customerMoneyInputValue),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.IS_UNDER_MIN_MONEY,
    },
    {
      checker: () => isOverMaxCustomerMoney(customerMoneyInputValue),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.IS_OVER_MAX_CUSTOMER_MONEY,
    },
    {
      checker: () => cannotDividedByTen(customerMoneyInputValue),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.MONEY_CANNOT_DIVIDED_BY_TEN,
    },
  ]);
};

export const checkProductPurchaseValidation = (productPrice, productQuantity) => {
  validator([
    {
      checker: () => isPriceOverCustomerMoney(productPrice),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.IS_PRICE_OVER_CUSTOMER_MONEY,
    },
    {
      checker: () => isSoldOut(productQuantity),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.IS_SOLD_OUT,
    },
  ]);
};

export const checkChangeReturnValidation = () => {
  validator([
    {
      checker: () => isNoCustomerMoney(),
      errorMessage: ERROR_MESSAGE.VENDING_MACHINE.IS_NO_CUSTOMER_MONEY,
    },
  ]);
};

export const checkSignupValidation = (userName, password, passwordConfirm) => {
  validator([
    {
      checker: () => isBlank(userName),
      errorMessage: ERROR_MESSAGE.AUTH.IS_BLANK_USER_NAME,
    },
    {
      checker: () => isPasswordConfirmNotMatchPassword(password, passwordConfirm),
      errorMessage: ERROR_MESSAGE.AUTH.IS_PASSWORD_CONFIRM_NOT_MATCH_PASSWORD,
    },
  ]);
};
