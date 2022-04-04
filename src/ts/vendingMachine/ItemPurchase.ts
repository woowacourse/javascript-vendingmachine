import type { CoinCollectionType } from './CoinRecharge';

import { COIN_10, COIN_100, COIN_50, COIN_500, MONEY } from '../constant/rule';
import { MONEY_ERROR_MESSAGE, PURCHASE_ERROR_MESSAGE } from '../constant/errorMessage';

class ItemPurchase {
  private _change: CoinCollectionType;
  private _money: number;

  constructor() {
    this._money = 0;
    this._change = {
      [COIN_500]: 0,
      [COIN_100]: 0,
      [COIN_50]: 0,
      [COIN_10]: 0,
    };
  }

  get change(): CoinCollectionType {
    return this._change;
  }

  get money(): number {
    return this._money;
  }

  insertMoney(moneyInput: number) {
    this._money += moneyInput;
  }

  purchaseItem(itemPrice: number) {
    this._money -= itemPrice;
  }

  calculateChange(coinCollection: CoinCollectionType) {
    const coins = { ...coinCollection };

    Object.keys(coins)
      .sort((a, b) => Number(b) - Number(a))
      .forEach((coin) => {
        const coinValue = Number(coin);
        while (coinValue <= this._money) {
          if (coins[coinValue] === 0) break;
          this._change[coinValue]++;
          this._money -= coinValue;
          coins[coinValue] -= 1;
        }
      });
    return coins;
  }

  calculateTotalChange() {
    return Object.entries(this._change).reduce(
      (prev, [key, value]) => prev + Number(key) * value,
      0
    );
  }

  validateMoneyInput(moneyInput: number) {
    if (this.isNotNumberTypeMoney(moneyInput)) {
      throw new Error(MONEY_ERROR_MESSAGE.NOT_NUMBER_TYPE);
    }

    if (this.isExceedTotalAmountRange(moneyInput)) {
      throw new Error(MONEY_ERROR_MESSAGE.EXCEED_TOTAL_AMOUNT_RANGE);
    }

    if (this.isNotDividedByUnitCash(moneyInput)) {
      throw new Error(MONEY_ERROR_MESSAGE.NOT_DIVIDED_BY_UNIT);
    }
  }

  validatePurchasingBehavior(itemQuantity: number, itemPrice: number, remainedMoneyInput: number) {
    if (this.isOutOfStock(itemQuantity)) {
      throw new Error(PURCHASE_ERROR_MESSAGE.OUT_OF_STOCK);
    }

    if (this.isNotEnoughMoney(itemPrice, remainedMoneyInput)) {
      throw new Error(PURCHASE_ERROR_MESSAGE.NOT_ENOUGH_MONEY);
    }
  }

  private isNotNumberTypeMoney(moneyInput: number) {
    return isNaN(moneyInput);
  }
  private isExceedTotalAmountRange(moneyInput: number) {
    return moneyInput < MONEY.MIN || moneyInput > MONEY.MAX;
  }
  private isNotDividedByUnitCash(moneyInput: number) {
    return moneyInput % MONEY.UNIT !== 0;
  }

  private isOutOfStock(itemQuantity: number) {
    return itemQuantity === 0;
  }
  private isNotEnoughMoney(itemPrice: number, remainedMoneyInput: number) {
    return itemPrice > remainedMoneyInput;
  }
}

export default ItemPurchase;
