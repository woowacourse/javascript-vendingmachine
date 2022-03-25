import { ITEM_ERROR_MESSAGE, CASH_ERROR_MESSAGE } from './constant/errorMessage';
import { ITEM, CASH, COIN_10, COIN_50, COIN_100, COIN_500 } from './constant/rule';

type itemInfoType = { itemName: string; itemPrice: number; itemQuantity: number };

interface VendingMachineInterface {
  addItem: (itemInfo: itemInfoType) => Object;
  editItem: (itemInfo: itemInfoType, itemIndex: number) => void;
  deleteItem: (itemName: string) => void;

  chargeCoin: (rechargeCoin: number) => void;
  calculateTotalCoinAmount: () => number;
}

class VendingMachine implements VendingMachineInterface {
  private _itemList: itemInfoType[];
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

  addItem(itemInfo: itemInfoType) {
    this._itemList = [...this._itemList, itemInfo];
    return itemInfo;
  }

  deleteItem(itemName: string) {
    this._itemList = this._itemList.filter((savedItem) => savedItem.itemName !== itemName);
  }

  editItem(itemInfo: itemInfoType, itemIndex: number) {
    this._itemList[itemIndex] = itemInfo;
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

    return this.calculateTotalCoinAmount();
  }

  calculateTotalCoinAmount() {
    return Object.entries(this._coinCollection).reduce(
      (prev, [key, value]) => prev + Number(key) * value,
      0
    );
  }

  validateItemInput(itemInfo: itemInfoType, isAddMode = true) {
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
      if (testCase({ itemInfo, isAddMode })) throw new Error(errorMessage);
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

  private isBlank({ itemInfo: { itemName } }: { itemInfo: itemInfoType; isAddMode: boolean }) {
    return itemName.length === 0;
  }

  private isNotNumberType({
    itemInfo: { itemPrice, itemQuantity },
  }: {
    itemInfo: itemInfoType;
    isAddMode: boolean;
  }) {
    return isNaN(itemPrice) || isNaN(itemQuantity);
  }
  private isExceedMaxNameLength({
    itemInfo: { itemName },
  }: {
    itemInfo: itemInfoType;
    isAddMode: boolean;
  }) {
    return itemName.length > ITEM.NAME_MAX_LENGTH;
  }
  private isAlreadyExist({
    itemInfo: { itemName },
    isAddMode,
  }: {
    itemInfo: itemInfoType;
    isAddMode: boolean;
  }) {
    return isAddMode && this._itemList.some((savedItem) => savedItem.itemName === itemName);
  }
  private isExceedPriceRange({
    itemInfo: { itemPrice },
  }: {
    itemInfo: itemInfoType;
    isAddMode: boolean;
  }) {
    return itemPrice < ITEM.MIN_PRICE || itemPrice > ITEM.MAX_PRICE;
  }
  private isNotDividedByPriceUnit({
    itemInfo: { itemPrice },
  }: {
    itemInfo: itemInfoType;
    isAddMode: boolean;
  }) {
    return itemPrice % ITEM.PRICE_UNIT !== 0;
  }
  private isExceedQuantityRange({
    itemInfo: { itemQuantity },
  }: {
    itemInfo: itemInfoType;
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
