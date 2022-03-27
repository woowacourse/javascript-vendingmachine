import { coinType } from '../constants';
import { getRandomIndex } from '../utils';

type CoinUnionType = typeof coinType[number];
type Coins = { [K in CoinUnionType]: number } | {};

interface CoinManagementProps {
  addCash: (cash: number) => void;
  addCoins: (cash: number) => void;
}

export default class CoinManagementDomain implements CoinManagementProps {
  #totalCash: number;
  #coins: Coins;

  constructor() {
    this.#totalCash = 0;
    this.#coins = {};
    coinType.forEach(type => {
      this.#coins[type] = 0;
    });
  }

  get totalCash() {
    return this.#totalCash;
  }

  get coins() {
    return this.#coins;
  }

  addCash(cash: number) {
    this.#totalCash += cash;
    this.addCoins(cash);
  }

  addCoins(cash: number) {
    while (cash > 0) {
      const randomIndex = getRandomIndex<CoinUnionType>(coinType);
      const type = coinType[randomIndex];

      if (type > cash) continue;

      this.#coins[type] += 1;
      cash -= type;
    }
  }
}
