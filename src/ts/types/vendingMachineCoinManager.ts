export interface Coins {
  COIN_500: number;
  COIN_100: number;
  COIN_50: number;
  COIN_10: number;
}

export interface ICoins {
  readonly INITIAL_STATE: Coins;
  readonly LIST: number[];
}

export interface CoinManager {
  getCoins(): Coins;
  getTotalAmount(): number;
  addCoins(newCoins: Coins): void;
}
