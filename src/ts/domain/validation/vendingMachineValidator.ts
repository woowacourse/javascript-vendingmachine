import {
  ItemInputValidationInfo,
  CashInputValidationInfo,
  CoinRechargeInputValidationInfo,
  TestCase,
} from '../../types';
import {
  ITEM_ERROR_MESSAGE,
  CASH_ERROR_MESSAGE,
  ITEM_PURCHASE_CASH_ERROR_MESSAGE,
} from '../../constant/message';
import { ITEM, CASH, ITEM_PURCHASE_CASH } from '../../constant/rule';

const isBlank = ({ itemInfo: { itemName } }: ItemInputValidationInfo) => {
  return itemName.length === 0;
};

const isNotNumberType = ({ itemInfo: { itemPrice, itemQuantity } }: ItemInputValidationInfo) => {
  return Number.isNaN(itemPrice) || Number.isNaN(itemQuantity);
};

const isExceedMaxNameLength = ({ itemInfo: { itemName } }: ItemInputValidationInfo) => {
  return itemName.length > ITEM.NAME_MAX_LENGTH;
};

const isAlreadyExist = ({
  itemInfo: { itemName },
  isAddMode,
  itemIndex,
  itemList,
}: ItemInputValidationInfo) => {
  return itemList.some((savedItem, savedItemIndex) => {
    if (!isAddMode && itemIndex === savedItemIndex) {
      return false;
    }

    return savedItem.itemName === itemName;
  });
};

const isExceedPriceRange = ({ itemInfo: { itemPrice } }: ItemInputValidationInfo) => {
  return itemPrice < ITEM.MIN_PRICE || itemPrice > ITEM.MAX_PRICE;
};

const isNotDividedByPriceUnit = ({ itemInfo: { itemPrice } }: ItemInputValidationInfo) => {
  return itemPrice % ITEM.PRICE_UNIT !== 0;
};

const isExceedQuantityRange = ({ itemInfo: { itemQuantity } }: ItemInputValidationInfo) => {
  return itemQuantity < ITEM.MIN_QUANTITY || itemQuantity > ITEM.MAX_QUANTITY;
};

const isNotDividedByQuantityUnit = ({ itemInfo: { itemQuantity } }: ItemInputValidationInfo) => {
  return itemQuantity % ITEM.QUANTITY_UNIT !== 0;
};

const isNotNumberTypeCash = ({ inputtedCashAmount }: CashInputValidationInfo) => {
  return Number.isNaN(inputtedCashAmount);
};

const isLowerThanMinRange = ({ inputtedCashAmount }: CoinRechargeInputValidationInfo) => {
  return inputtedCashAmount < CASH.MIN;
};

const isExceedTotalAmountRange = ({
  inputtedCashAmount,
  rechargedCoinAmount,
}: CoinRechargeInputValidationInfo) => {
  return inputtedCashAmount > CASH.MAX - rechargedCoinAmount;
};

const isNotDividedByUnitCash = ({ inputtedCashAmount }: CoinRechargeInputValidationInfo) => {
  return inputtedCashAmount % CASH.UNIT !== 0;
};

const isExceedItemPurchaseCashRange = ({ inputtedCashAmount }: CashInputValidationInfo) => {
  return inputtedCashAmount < ITEM_PURCHASE_CASH.MIN || inputtedCashAmount > ITEM_PURCHASE_CASH.MAX;
};

const isNotDividedByUnitItemPurchaseCash = ({ inputtedCashAmount }: CashInputValidationInfo) => {
  return inputtedCashAmount % ITEM_PURCHASE_CASH.UNIT !== 0;
};

export const itemInputTestCases: TestCase[] = [
  { testCase: isBlank, errorMessage: ITEM_ERROR_MESSAGE.BLANK_NOT_ALLOWED },
  { testCase: isNotNumberType, errorMessage: ITEM_ERROR_MESSAGE.NOT_NUMBER_TYPE },
  {
    testCase: isExceedMaxNameLength,
    errorMessage: ITEM_ERROR_MESSAGE.ITEM_NAME_MAX_LENGTH,
  },
  { testCase: isAlreadyExist, errorMessage: ITEM_ERROR_MESSAGE.ALREADY_EXIST },
  { testCase: isExceedPriceRange, errorMessage: ITEM_ERROR_MESSAGE.EXCEED_PRICE_RANGE },
  {
    testCase: isNotDividedByPriceUnit,
    errorMessage: ITEM_ERROR_MESSAGE.NOT_DIVIDED_BY_PRICE_UNIT,
  },
  {
    testCase: isExceedQuantityRange,
    errorMessage: ITEM_ERROR_MESSAGE.EXCEED_QUANTITY_RANGE,
  },
  {
    testCase: isNotDividedByQuantityUnit,
    errorMessage: ITEM_ERROR_MESSAGE.NOT_DIVIDED_BY_QUANTITY_UNIT,
  },
];

export const cashInputTestCases: TestCase[] = [
  {
    testCase: isNotNumberTypeCash,
    errorMessage: CASH_ERROR_MESSAGE.NOT_NUMBER_TYPE,
  },
  { testCase: isLowerThanMinRange, errorMessage: CASH_ERROR_MESSAGE.LOWER_THAN_MIN_RANGE },
  {
    testCase: isExceedTotalAmountRange,
    errorMessage: CASH_ERROR_MESSAGE.EXCEED_TOTAL_AMOUNT_RANGE,
  },
  {
    testCase: isNotDividedByUnitCash,
    errorMessage: CASH_ERROR_MESSAGE.NOT_DIVIDED_BY_UNIT,
  },
];

export const itemPurchaseCashInputTestCases: TestCase[] = [
  {
    testCase: isNotNumberTypeCash,
    errorMessage: ITEM_PURCHASE_CASH_ERROR_MESSAGE.NOT_NUMBER_TYPE,
  },
  {
    testCase: isExceedItemPurchaseCashRange,
    errorMessage: ITEM_PURCHASE_CASH_ERROR_MESSAGE.EXCEED_CASH_RANGE,
  },
  {
    testCase: isNotDividedByUnitItemPurchaseCash,
    errorMessage: CASH_ERROR_MESSAGE.NOT_DIVIDED_BY_UNIT,
  },
];
