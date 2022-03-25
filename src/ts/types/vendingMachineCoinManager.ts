export interface coins {
  COIN_500: number;
  COIN_100: number;
  COIN_50: number;
  COIN_10: number;
}

export interface Icoins {
  readonly INITIAL_STATE: coins;
  readonly LIST: number[];
}

export interface CoinManager {
  getCoins(): coins;
  getTotalAmount(): number;
  addCoins(newCoins: coins): void;
}
