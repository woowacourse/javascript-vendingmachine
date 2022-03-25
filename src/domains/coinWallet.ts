import { COIN_KEYS, COIN_VALUES } from '../utils/constants';
import { ICoinWallet, TCoinWallet } from './types';

class CoinWallet implements ICoinWallet {
  coinWallet: TCoinWallet;
  constructor() {
    this.coinWallet = {
      coin500: 0,
      coin100: 0,
      coin50: 0,
      coin10: 0,
    };
  }

  rechargeCoinWallet(charge: number) {
    const coinWallet = this.generateRandomCoinInfo(charge);

    Object.keys(coinWallet).forEach(key => (this.coinWallet[key] += coinWallet[key]));
  }

  computeCoinTotalAmount() {
    return Object.keys(this.coinWallet).reduce(
      (prev, key) => prev + this.coinWallet[key] * COIN_VALUES[key],
      0,
    );
  }

  generateRandomCoinInfo(charge: number) {
    const coinWalletInfo: TCoinWallet = { coin500: 0, coin100: 0, coin50: 0, coin10: 0 };
    while (charge > 0) {
      const coinKey = this.pickRandomCoinKey();
      const coin = COIN_VALUES[coinKey];
      if (coin <= charge) {
        charge -= coin;
        coinWalletInfo[coinKey]++;
      }
    }
    return coinWalletInfo;
  }

  returnChangeCoinInfo(change: number) {
    const returnCoinInfo = {
      coin500: 0,
      coin100: 0,
      coin50: 0,
      coin10: 0,
    };

    const currentCoinTotalAmount = this.computeCoinTotalAmount();
    if (currentCoinTotalAmount <= change) {
      const currentCoinWallet = {
        ...this.coinWallet,
      };
      this.coinWallet = returnCoinInfo;
      return currentCoinWallet;
    }

    while (change > 0) {
      const maxCoinKey = this.findMaxCoinKey(change);
      const maxCoinValue = COIN_VALUES[maxCoinKey];

      change -= maxCoinValue;
      returnCoinInfo[maxCoinKey]++;
      this.coinWallet[maxCoinKey]--;
    }
    return returnCoinInfo;
  }

  pickRandomCoinKey() {
    const randomIndex = Math.floor(Math.random() * COIN_KEYS.length);
    return COIN_KEYS[randomIndex];
  }

  findMaxCoinKey(change: number) {
    return COIN_KEYS.find(
      coinKey => this.coinWallet[coinKey] !== 0 && change >= COIN_VALUES[coinKey],
    );
  }

  getCoinWalletInfo() {
    return this.coinWallet;
  }
}
export default CoinWallet;
