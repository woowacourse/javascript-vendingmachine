export interface Coins {
  QUANTITY_COIN_500: number;
  QUANTITY_COIN_100: number;
  QUANTITY_COIN_50: number;
  QUANTITY_COIN_10: number;
}

export interface InitialCoins {
  readonly INITIAL_QUANTITY_STATE: Coins;
  readonly INITIAL_LIST: number[];
}

export interface ChargeMoneyManager {
  getCoins(): Coins;
  getTotalAmount(): number;
  addCoins(newCoins: Coins): void;
}
