import { ITEM_ERROR_MESSAGE, CASH_ERROR_MESSAGE } from './constant/errorMessage';
import { ITEM, CASH, COIN_10, COIN_50, COIN_100, COIN_500 } from './constant/rule';

interface VendingMachineInterface {
  addItem: (itemName: string, itemPrice: number, itemQuantity: number) => void;
  editItem: (itemName: string, itemPrice: number, itemQuantity: number, itemIndex: number) => void;
  deleteItem: (itemName: string) => void;

  chargeCoin: (rechargeCoin: number) => void;
  calculateTotalCoinAmount: () => number;
}

class VendingMachine implements VendingMachineInterface {
  private _itemList: { itemName: string; itemPrice: number; itemQuantity: number }[];
  private _coinCollection: Object;

  constructor() {
    this._itemList = [];
    this._coinCollection = {
      [COIN_500]: 0,
      [COIN_100]: 0,
      [COIN_50]: 0,
      [COIN_10]: 0,
    };
  }

  get itemList(): Object[] {
    return this._itemList;
  }

  get coinCollection(): Object {
    return this._coinCollection;
  }

  addItem(itemName: string, itemPrice: number, itemQuantity: number) {
    const newItem = { itemName, itemPrice, itemQuantity };
    this._itemList = [...this._itemList, newItem];

    return newItem;
  }

  deleteItem(itemName: string) {
    this._itemList = this._itemList.filter((savedItem) => savedItem.itemName !== itemName);
  }

  editItem(itemName: string, itemPrice: number, itemQuantity: number, itemIndex: number) {
    this._itemList[itemIndex] = { itemName, itemPrice, itemQuantity };
  }

  chargeCoin(rechargeCoin) {
    let candidateCoins = [COIN_500, COIN_100, COIN_50, COIN_10];
    let remainCoin = rechargeCoin;

    while (remainCoin !== 0) {
      if (COIN_50 > remainCoin) {
        this._coinCollection[COIN_10] += remainCoin / COIN_10;
        break;
      } else if (COIN_100 > remainCoin) {
        candidateCoins = [COIN_50, COIN_10];
      } else if (COIN_500 > remainCoin) {
        candidateCoins = [COIN_100, COIN_50, COIN_10];
      }

      const selectedCoin = candidateCoins[Math.floor(Math.random() * candidateCoins.length)];
      this._coinCollection[selectedCoin]++;
      remainCoin -= selectedCoin;
    }
  }

  calculateTotalCoinAmount() {
    return Object.entries(this._coinCollection).reduce(
      (prev, [key, value]) => prev + Number(key) * value,
      0
    );
  }

  validateItemInput(
    itemInfo: { itemName: string; itemPrice: number; itemQuantity: number },
    isAddMode = true
  ) {
    const testCases = [
      { testCase: this.isBlank, errorMessage: ITEM_ERROR_MESSAGE.BLANK_NOT_ALLOWED },
      { testCase: this.isNotNumberType, errorMessage: ITEM_ERROR_MESSAGE.NOT_NUMBER_TYPE },
      {
        testCase: this.isExceedMaxNameLength,
        errorMessage: ITEM_ERROR_MESSAGE.ITEM_NAME_MAX_LENGTH,
      },
      { testCase: this.isAlreadyExist.bind(this), errorMessage: ITEM_ERROR_MESSAGE.ALREADY_EXIST },
      { testCase: this.isExceedPriceRange, errorMessage: ITEM_ERROR_MESSAGE.EXCEED_PRICE_RANGE },
      {
        testCase: this.isNotDividedByPriceUnit,
        errorMessage: ITEM_ERROR_MESSAGE.NOT_DIVIDED_BY_UNIT,
      },
      {
        testCase: this.isExceedQuantityRange,
        errorMessage: ITEM_ERROR_MESSAGE.EXCEED_QUANTITY_RANGE,
      },
    ];

    testCases.every(({ testCase, errorMessage }) => {
      if (testCase({ ...itemInfo, isAddMode })) throw new Error(errorMessage);
      return true;
    });
  }

  validateCashInput(rechargedCash: number) {
    const testCases = [
      { testCase: this.isNotNumberTypeCash, errorMessage: CASH_ERROR_MESSAGE.NOT_NUMBER_TYPE },
      { testCase: this.isLowerThanMinRange, errorMessage: CASH_ERROR_MESSAGE.LOWER_THAN_MIN_RANGE },
      {
        testCase: this.isExceedTotalAmountRange.bind(this),
        errorMessage: CASH_ERROR_MESSAGE.EXCEED_TOTAL_AMOUNT_RANGE,
      },
      {
        testCase: this.isNotDividedByUnitCash,
        errorMessage: CASH_ERROR_MESSAGE.NOT_DIVIDED_BY_UNIT,
      },
    ];

    testCases.every(({ testCase, errorMessage }) => {
      if (testCase(rechargedCash)) throw new Error(errorMessage);
      return true;
    });
  }

  private isBlank({
    itemName,
  }: {
    itemName: string;
    itemPrice: number;
    itemQuantity: number;
    isAddMode: boolean;
  }) {
    return itemName.length === 0;
  }

  private isNotNumberType({
    itemPrice,
    itemQuantity,
  }: {
    itemName: string;
    itemPrice: number;
    itemQuantity: number;
    isAddMode: boolean;
  }) {
    return isNaN(itemPrice) || isNaN(itemQuantity);
  }
  private isExceedMaxNameLength({
    itemName,
  }: {
    itemName: string;
    itemPrice: number;
    itemQuantity: number;
    isAddMode: boolean;
  }) {
    return itemName.length > ITEM.NAME_MAX_LENGTH;
  }
  private isAlreadyExist({
    itemName,
    isAddMode,
  }: {
    itemName: string;
    itemPrice: number;
    itemQuantity: number;
    isAddMode: boolean;
  }) {
    return isAddMode && this._itemList.some((savedItem) => savedItem.itemName === itemName);
  }
  private isExceedPriceRange({
    itemPrice,
  }: {
    itemName: string;
    itemPrice: number;
    itemQuantity: number;
    isAddMode: boolean;
  }) {
    return itemPrice < ITEM.MIN_PRICE || itemPrice > ITEM.MAX_PRICE;
  }
  private isNotDividedByPriceUnit({
    itemPrice,
  }: {
    itemName: string;
    itemPrice: number;
    itemQuantity: number;
    isAddMode: boolean;
  }) {
    return itemPrice % ITEM.PRICE_UNIT !== 0;
  }
  private isExceedQuantityRange({
    itemQuantity,
  }: {
    itemName: string;
    itemPrice: number;
    itemQuantity: number;
    isAddMode: boolean;
  }) {
    return itemQuantity < ITEM.MIN_QUANTITY || itemQuantity > ITEM.MAX_QUANTITY;
  }

  private isNotNumberTypeCash(rechargedCash: number) {
    return isNaN(rechargedCash);
  }
  private isLowerThanMinRange(rechargedCash: number) {
    return rechargedCash < CASH.MIN;
  }
  private isExceedTotalAmountRange(rechargedCash: number) {
    return rechargedCash > CASH.MAX - this.calculateTotalCoinAmount();
  }
  private isNotDividedByUnitCash(rechargedCash: number) {
    return rechargedCash % CASH.UNIT !== 0;
  }
}

export default VendingMachine;
