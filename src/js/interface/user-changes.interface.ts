import { Coins, Charge } from "./vending-changes.interface";

export interface Spend {
  (price: number, quantity: number): void;
}

export interface Returned {
  (returnedCoins: Coins): void;
}

export interface UserChangesDomain {
  chargedMoney: number;

  charge: Charge; //층전시 금액 증가

  spend: Spend; // 소비시 금액 감소

  returned: Returned; // 반환시 금액감소
}
