export interface Charge {
  (money: number): void;
}

export interface Coins {
  500: number;
  100: number;
  50: number;
  10: number;
}

export interface GetTotalChanges {
  (): number;
}

export interface GenerateCoins {
  (money: number): Coins;
}

export interface GetCoins {
  (): Coins;
}

export interface ChangesDomain {
  coins: Coins;

  charge: Charge; 

  getCoins: GetCoins;

  getTotalChanges: GetTotalChanges; 

  generateCoins: GenerateCoins;
}
