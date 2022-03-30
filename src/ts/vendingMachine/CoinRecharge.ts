import { CASH_ERROR_MESSAGE } from '../constant/errorMessage';
import { CASH, COIN_10, COIN_50, COIN_100, COIN_500 } from '../constant/rule';

interface CoinRechargeInterface {
  chargeCoin: (rechargeCoin: number) => void;
  calculateTotalCoinAmount: () => number;
}

class CoinRecharge implements CoinRechargeInterface {
  private _coinCollection: Object;

  constructor() {
    this._coinCollection = {
      [COIN_500]: 0,
      [COIN_100]: 0,
      [COIN_50]: 0,
      [COIN_10]: 0,
    };
  }

  get coinCollection(): Object {
    return this._coinCollection;
  }

  chargeCoin(rechargeCoin: number) {
    let candidateCoins = [COIN_500, COIN_100, COIN_50, COIN_10];
    let remainCoin = rechargeCoin;

    while (remainCoin !== 0) {
      if (COIN_50 > remainCoin) {
        this._coinCollection[COIN_10] += remainCoin / COIN_10;
        break;
      }
      if (COIN_100 > remainCoin && remainCoin >= COIN_50) {
        candidateCoins = [COIN_50, COIN_10];
      }
      if (COIN_500 > remainCoin && remainCoin >= COIN_100) {
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

export default CoinRecharge;
