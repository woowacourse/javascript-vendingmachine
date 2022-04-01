export interface Coins {
  500: number;
  100: number;
  50: number;
  10: number;
}

export interface CoinInterface {
  setAmount: (chargedAmount: number) => void;
  getAmount: () => number;
  getCoins: () => Coins;
  addCoinCount: (index: number) => number;
  makeRandomCoins: (amount: number) => void;
}
