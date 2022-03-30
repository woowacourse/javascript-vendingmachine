export interface Coins {
  COIN_500: number;
  COIN_100: number;
  COIN_50: number;
  COIN_10: number;
}

export interface InitialCoins {
  readonly INITIAL_STATE: Coins;
  readonly INITIAL_LIST: number[];
}

export interface ChargeMoneyManager {
  getCoins(): Coins;
  getTotalAmount(): number;
  addCoins(newCoins: Coins): void;
}
