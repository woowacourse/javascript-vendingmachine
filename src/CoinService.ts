import { Coin } from './Coin';

export default class CoinService {
  coinList: Map<number, Coin>;

  constructor(initCoinList) {
    this.coinList = initCoinList.reduce(
      (coinList: Map<number, Coin>, coin) => coinList.set(coin.value, coin),
      new Map()
    );
  }

  add(amount: number): void {}

  getTotalMoney(): number {
    return undefined;
  }
}
