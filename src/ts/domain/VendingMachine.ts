import {
  ItemInfoType,
  Coin,
  ItemInputValidationInfo,
  CashInputValidationInfo,
  CoinRechargeInputValidationInfo,
  ValidationInfo,
  TestCase,
  VendingMachineInterface,
} from '../types';
import {
  itemInputTestCases,
  cashInputTestCases,
  itemPurchaseCashInputTestCases,
} from './validation/vendingMachineValidator';
import {
  ITEM_PURCHASE_CASH_ERROR_MESSAGE,
  COIN_RETURN_ERROR_MESSAGE,
} from '../constant/errorMessage';
import { COIN_10, COIN_50, COIN_100, COIN_500, INITIAL_COIN_COLLECTION } from '../constant/rule';

class VendingMachine implements VendingMachineInterface {
  private _itemList: ItemInfoType[] = [];

  private _coinCollection: Record<Coin, number> = INITIAL_COIN_COLLECTION;

  private itemPurchaseCash = 0;

  public get itemList(): ItemInfoType[] {
    return this._itemList;
  }

  public get coinCollection(): Record<Coin, number> {
    return this._coinCollection;
  }

  getItemPurchaseCash(): number {
    return this.itemPurchaseCash;
  }

  addItem(itemInfo: ItemInfoType) {
    this._itemList = [...this._itemList, itemInfo];
    return itemInfo;
  }

  deleteItem(itemName: string) {
    this._itemList = this._itemList.filter((savedItem) => savedItem.itemName !== itemName);
  }

  editItem(itemInfo: ItemInfoType, itemIndex: number) {
    this._itemList[itemIndex] = itemInfo;
  }

  purchaseItem(itemIndex: number): void {
    const itemInfo: ItemInfoType = this.itemList[itemIndex];

    if (this.itemPurchaseCash < itemInfo.itemPrice) {
      throw new Error(ITEM_PURCHASE_CASH_ERROR_MESSAGE.LACK_MONEY);
    }

    this.itemList[itemIndex] = { ...itemInfo, itemQuantity: itemInfo.itemQuantity - 1 };
    this.itemPurchaseCash -= itemInfo.itemPrice;
  }

  chargeCoin(rechargeCoin: number): number {
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
      this._coinCollection[selectedCoin] += 1;
      remainCoin -= selectedCoin;
    }

    return this.calculateTotalCoinAmount();
  }

  returnCoin(): Record<Coin, number> {
    if (this.hasNotCash()) {
      throw new Error(COIN_RETURN_ERROR_MESSAGE.NO_CASH);
    }

    const returnedCoinCollection: Record<Coin, number> = {
      [COIN_500]: 0,
      [COIN_100]: 0,
      [COIN_50]: 0,
      [COIN_10]: 0,
    };

    Object.entries(this._coinCollection).forEach(([coin, count]) => {
      const returnedCoin = this.calculateReturnedCoin(coin, count);

      this.coinCollection[coin] -= returnedCoin;
      returnedCoinCollection[coin] = returnedCoin;
      this.itemPurchaseCash -= Number(coin) * returnedCoin;
    });

    if (this.isNotReturnedCoin(returnedCoinCollection)) {
      throw new Error(COIN_RETURN_ERROR_MESSAGE.NO_RETURN_COIN);
    }

    return returnedCoinCollection;
  }

  calculateTotalCoinAmount(): number {
    return Object.entries(this._coinCollection).reduce(
      (prev, [key, value]) => prev + Number(key) * value,
      0
    );
  }

  chargeCash(chargedCash: number): number {
    this.itemPurchaseCash += chargedCash;

    return this.itemPurchaseCash;
  }

  validateItemInput(itemInfo: ItemInfoType, isAddMode = true, itemIndex: number | null = null) {
    const validationInfo: ItemInputValidationInfo = {
      itemInfo,
      isAddMode,
      itemIndex,
      itemList: this._itemList,
    };

    this.validateTestCase(itemInputTestCases, validationInfo);
  }

  validateCoinRechargeInput(inputtedCashAmount: number) {
    const validationInfo: CoinRechargeInputValidationInfo = {
      inputtedCashAmount,
      rechargedCoinAmount: this.calculateTotalCoinAmount(),
    };

    this.validateTestCase(cashInputTestCases, validationInfo);
  }

  validateItemPurchaseCashInput(inputtedCashAmount: number) {
    const validationInfo: CashInputValidationInfo = {
      inputtedCashAmount,
    };

    this.validateTestCase(itemPurchaseCashInputTestCases, validationInfo);
  }

  private calculateReturnedCoin(coin: string, count: number): number {
    const requiredCoinCount = Math.floor(this.itemPurchaseCash / Number(coin));

    return Math.min(requiredCoinCount, count);
  }

  private hasNotCash(): boolean {
    return this.itemPurchaseCash === 0;
  }

  private validateTestCase(testCases: TestCase[], validationInfo: ValidationInfo) {
    testCases.every(({ testCase, errorMessage }) => {
      if (testCase(validationInfo)) throw new Error(errorMessage);
      return true;
    });
  }

  private isNotReturnedCoin(returnedCoinCollection: Record<Coin, number>): boolean {
    return Object.values(returnedCoinCollection).every((coinCount) => coinCount === 0);
  }
}

export default VendingMachine;
