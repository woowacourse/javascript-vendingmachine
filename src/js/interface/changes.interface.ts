export interface ICharge {
  (money: number): void;
}

export interface ICoins {
  500: number;
  100: number;
  50: number;
  10: number;
}

export interface IGetTotalChanges {
  (): number;
}

export interface IGenerateCoins {
  (money: number): ICoins;
}

export interface IGetCoins {
  (): ICoins;
}

export interface IChangeProcessMachine {
  coins: ICoins;

  charge: ICharge;

  getCoins: IGetCoins;

  getTotalChanges: IGetTotalChanges;

  generateCoins: IGenerateCoins;
}
