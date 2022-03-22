interface Charge {
  (money: number): void;
}

interface Coins {
  500: number;
  100: number;
  50: number;
  10: number;
}

interface GetTotalChanges {
  (coins: Coins): number;
}

interface GenerateCoins {
  (money: number): void;
}

export interface ChangesDomain {
  coins: Coins;

  charge: Charge; // 돈을 충전함

  getTotalChanges: GetTotalChanges; // 총 잔돈을 계산함

  generateCoins: GenerateCoins; // 동전을 무작위로 생성함
}
