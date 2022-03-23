import { CoinList } from './Coin';

export default class CoinService {
  static createRandomCoins(amount: number): CoinList {
    const coinList = [10, 50, 100, 500];
    const coins: CoinList = {
      10: 0,
      50: 0,
      100: 0,
      500: 0,
    };
    let sum = 0;

    while (sum !== amount) {
      const randomIndex = Math.floor(Math.random() * 4);
      const randomCoin = coinList[randomIndex];

      if (sum + randomCoin <= amount) {
        sum += randomCoin;

        coins[randomCoin] += 1;
      }
    }

    return coins;
  }

  coinList: CoinList;

  constructor(initCoinList: CoinList) {
    this.init(initCoinList);
  }

  init(initCoinList: CoinList): void {
    this.coinList = initCoinList;
  }

  add(amount: number): void {
    if (amount < 10 || amount > 100000) throw new Error('error');

    if (amount % 10 !== 0) throw new Error('error');

    if (this.getTotalMoney() + amount > 100000) throw new Error('error');

    const randomCoinList = CoinService.createRandomCoins(amount);

    Object.keys(this.coinList).forEach((key) => {
      this.coinList[key] += randomCoinList[key];
    });
  }

  getTotalMoney(): number {
    return Object.entries(this.coinList).reduce(
      (sum: number, [key, value]) => sum + Number(key) * value,
      0
    );
  }
}
