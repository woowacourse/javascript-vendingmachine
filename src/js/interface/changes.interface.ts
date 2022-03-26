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

  charge: Charge; // 돈을 충전함

  getCoins: GetCoins;

  getTotalChanges: GetTotalChanges; // 총 잔돈을 계산함

  generateCoins: GenerateCoins; // 동전을 무작위로 생성함
}
