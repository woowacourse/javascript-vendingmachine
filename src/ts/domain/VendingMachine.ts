import {
  ItemInfoType,
  CoinKind,
  CoinInterface,
  ItemInputValidationInfo,
  CashInputValidationInfo,
  CoinRechargeInputValidationInfo,
  ValidationInfo,
  TestCase,
  VendingMachineInterface,
} from '../types';
import Coin from './Coin';
import {
  itemInputTestCases,
  cashInputTestCases,
  itemPurchaseCashInputTestCases,
} from './validation/vendingMachineValidator';
import { ITEM_PURCHASE_CASH_ERROR_MESSAGE, COIN_RETURN_ERROR_MESSAGE } from '../constant/message';
import { COIN_10, COIN_50, COIN_100, COIN_500 } from '../constant/rule';

class VendingMachine implements VendingMachineInterface {
  private _itemList: ItemInfoType[] = [];

  private _coinCollection: Record<CoinKind, CoinInterface> = {
    [COIN_500]: new Coin(COIN_500),
    [COIN_100]: new Coin(COIN_100),
    [COIN_50]: new Coin(COIN_50),
    [COIN_10]: new Coin(COIN_10),
  };

  private itemPurchaseCash = 0;

  public get itemList(): ItemInfoType[] {
    return this._itemList;
  }

  public get coinCollection(): Record<CoinKind, CoinInterface> {
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
        this._coinCollection[COIN_10].chargeCoin(remainCoin / COIN_10);
        break;
      } else if (COIN_100 > remainCoin) {
        candidateCoins = [COIN_50, COIN_10];
      } else if (COIN_500 > remainCoin) {
        candidateCoins = [COIN_100, COIN_50, COIN_10];
      }

      const selectedCoin = candidateCoins[Math.floor(Math.random() * candidateCoins.length)];
      this._coinCollection[selectedCoin].chargeCoin(1);
      remainCoin -= selectedCoin;
    }

    return this.calculateTotalCoinAmount();
  }

  returnCoin(): Record<CoinKind, CoinInterface> {
    if (this.hasNotCash()) {
      throw new Error(COIN_RETURN_ERROR_MESSAGE.NO_CASH);
    }

    const returnedCoinCollection: Record<CoinKind, CoinInterface> = {
      [COIN_500]: new Coin(COIN_500),
      [COIN_100]: new Coin(COIN_100),
      [COIN_50]: new Coin(COIN_50),
      [COIN_10]: new Coin(COIN_10),
    };

    Object.entries(this._coinCollection).forEach(([coinKind, coin]) => {
      const returnedCoin = this.calculateReturnedCoin(coinKind, coin.count);

      this.coinCollection[coinKind].useCoin(returnedCoin);
      returnedCoinCollection[coinKind].chargeCoin(returnedCoin);
      this.itemPurchaseCash -= Number(coinKind) * returnedCoin;
    });

    if (this.isNotReturnedCoin(returnedCoinCollection)) {
      throw new Error(COIN_RETURN_ERROR_MESSAGE.NO_RETURN_COIN);
    }

    return returnedCoinCollection;
  }

  calculateTotalCoinAmount(): number {
    return Object.entries(this._coinCollection).reduce(
      (acc, [coinKind, coin]) => acc + Number(coinKind) * coin.count,
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

  private calculateReturnedCoin(coinKind: string, count: number): number {
    const requiredCoinCount = Math.floor(this.itemPurchaseCash / Number(coinKind));

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

  private isNotReturnedCoin(returnedCoinCollection: Record<CoinKind, CoinInterface>): boolean {
    return Object.values(returnedCoinCollection).every((coin) => coin.count === 0);
  }
}

export default VendingMachine;
