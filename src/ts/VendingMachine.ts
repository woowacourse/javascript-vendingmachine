import { ITEM_ERROR_MESSAGE, CASH_ERROR_MESSAGE } from './constant/errorMessage';
import { ITEM, CASH, COIN_10, COIN_50, COIN_100, COIN_500 } from './constant/rule';

interface VendingMachineInterface {
  itemList: Array<Object>;
  coinCollection: Object;

  addItem: (itemName: string, itemPrice: number, itemQuantity: number) => void;
  editItem: (itemName: string, itemPrice: number, itemQuantity: number, itemIndex: number) => void;
  deleteItem: (itemName: string) => void;

  chargeCoin: (rechargeCoin: number) => void;
  calculateTotalCoinAmount: () => number;
}

class VendingMachine implements VendingMachineInterface {
  itemList: { itemName: string; itemPrice: number; itemQuantity: number }[];
  coinCollection: Object;

  constructor() {
    this.itemList = [];
    this.coinCollection = {
      [COIN_500]: 0,
      [COIN_100]: 0,
      [COIN_50]: 0,
      [COIN_10]: 0,
    };
  }

  addItem(itemName: string, itemPrice: number, itemQuantity: number) {
    const newItem = { itemName, itemPrice, itemQuantity };
    this.itemList = [...this.itemList, newItem];

    return newItem;
  }

  deleteItem(itemName: string) {
    this.itemList = this.itemList.filter((savedItem) => savedItem.itemName !== itemName);
  }

  editItem(itemName: string, itemPrice: number, itemQuantity: number, itemIndex: number) {
    this.itemList[itemIndex] = { itemName, itemPrice, itemQuantity };
  }

  chargeCoin(rechargeCoin) {
    let candidateCoins = [COIN_500, COIN_100, COIN_50, COIN_10];
    let remainCoin = rechargeCoin;

    while (remainCoin !== 0) {
      if (COIN_50 > remainCoin) {
        this.coinCollection[COIN_10] += remainCoin / COIN_10;
        break;
      } else if (COIN_100 > remainCoin) {
        candidateCoins = [COIN_50, COIN_10];
      } else if (COIN_500 > remainCoin) {
        candidateCoins = [COIN_100, COIN_50, COIN_10];
      }

      const selectedCoin = candidateCoins[Math.floor(Math.random() * candidateCoins.length)];
      this.coinCollection[selectedCoin]++;
      remainCoin -= selectedCoin;
    }
  }

  calculateTotalCoinAmount() {
    return Object.entries(this.coinCollection).reduce(
      (prev, [key, value]) => prev + Number(key) * value,
      0
    );
  }

  validateItemInput(
    itemName: string,
    itemPrice: number,
    itemQuantity: number,
    isAddMode: boolean = true
  ) {
    if (itemName.length === 0) {
      throw new Error(ITEM_ERROR_MESSAGE.BLANK_NOT_ALLOWED);
    }

    if (isNaN(itemPrice) || isNaN(itemQuantity)) {
      throw new Error(ITEM_ERROR_MESSAGE.NOT_NUMBER_TYPE);
    }

    if (itemName.length > ITEM.NAME_MAX_LENGTH) {
      throw new Error(ITEM_ERROR_MESSAGE.ITEM_NAME_MAX_LENGTH);
    }

    if (isAddMode && this.itemList.some((savedItem) => savedItem.itemName === itemName)) {
      throw new Error(ITEM_ERROR_MESSAGE.ALREADY_EXIST);
    }

    if (itemPrice < ITEM.MIN_PRICE || itemPrice > ITEM.MAX_PRICE) {
      throw new Error(ITEM_ERROR_MESSAGE.EXCEED_PRICE_RANGE);
    }

    if (itemPrice % ITEM.PRICE_UNIT !== 0) {
      throw new Error(ITEM_ERROR_MESSAGE.NOT_DIVIDED_BY_UNIT);
    }

    if (itemQuantity < ITEM.MIN_QUANTITY || itemQuantity > ITEM.MAX_QUANTITY) {
      throw new Error(ITEM_ERROR_MESSAGE.EXCEED_QUANTITY_RANGE);
    }
  }

  validateCashInput(rechargedCash: number) {
    if (isNaN(rechargedCash)) {
      throw new Error(CASH_ERROR_MESSAGE.NOT_NUMBER_TYPE);
    }

    if (rechargedCash < CASH.MIN) {
      throw new Error(CASH_ERROR_MESSAGE.LOWER_THAN_MIN_RANGE);
    }

    if (rechargedCash > CASH.MAX - this.calculateTotalCoinAmount()) {
      throw new Error(CASH_ERROR_MESSAGE.EXCEED_TOTAL_AMOUNT_RANGE);
    }

    if (rechargedCash % CASH.UNIT !== 0) {
      throw new Error(CASH_ERROR_MESSAGE.NOT_DIVIDED_BY_UNIT);
    }
  }
}

export default VendingMachine;
