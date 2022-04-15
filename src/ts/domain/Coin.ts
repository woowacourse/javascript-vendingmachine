import { CoinKind, CoinInterface } from '../types';

class Coin implements CoinInterface {
  private _count = 0;

  private kind: CoinKind;

  get count() {
    return this._count;
  }

  constructor(coinKind: CoinKind) {
    this.kind = coinKind;
  }

  chargeCoin(count = 1) {
    this._count += count;
  }

  useCoin(count = 1) {
    this._count -= count;
  }
}

export default Coin;
