import RandomStrategy from './RandomStrategy';

interface CoinStatus {
  FIVE_HUNDRED_WON: number;
  ONE_HUNDRED_WON: number;
  FIFTY_WON: number;
  TEN_WON: number;
}

interface distributeStrategy {
  distribute(inputMoney: number): CoinStatus;
}

export default class MoneyBox {
  private _coinStatus: CoinStatus;

  private coinDistributeStrategy: distributeStrategy;

  constructor() {
    this._coinStatus = {
      FIVE_HUNDRED_WON: 0,
      ONE_HUNDRED_WON: 0,
      FIFTY_WON: 0,
      TEN_WON: 0,
    };
    this.coinDistributeStrategy = RandomStrategy;
  }

  set strategy(strategy) {
    this.coinDistributeStrategy = strategy;
  }

  get coinStatus() {
    return this._coinStatus;
  }

  charge(inputMoney: number): void {
    const newCoins = this.coinDistributeStrategy.distribute(inputMoney);

    Object.keys(this._coinStatus).forEach((key) => {
      this._coinStatus[key] += newCoins[key];
    });
  }
}
