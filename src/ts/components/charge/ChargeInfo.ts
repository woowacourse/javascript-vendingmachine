import { CoinType } from "../../utils/interface";

class ChargeInfo {
  private coinsKindCount: CoinType;
  private totalCharge: number;

  constructor() {
    this.coinsKindCount = this.getCoinList();
    this.totalCharge = this.getTotalCharge();
  }

  convertRandomCharge(charge: number) {
    let totalAmount = 0;
    this.totalCharge += charge;
    while (totalAmount !== charge) {
      const randomCoin = this.pickNumberInList();
      totalAmount += randomCoin;
      if (totalAmount > charge) {
        totalAmount -= randomCoin;
      } else if (totalAmount <= charge) {
        this.coinsKindCount[randomCoin]++;
      }
    }

    this.setCoinList();
    this.setTotalCharge();
  }

  pickNumberInList(): number {
    const coinList = [10, 50, 100, 500];
    const randomNumber = Math.floor(Math.random() * coinList.length);
    return coinList[randomNumber];
  }

  setCoinList() {
    localStorage.setItem("COIN_LIST", JSON.stringify(this.coinsKindCount));
  }

  getCoinList() {
    return JSON.parse(localStorage.getItem("COIN_LIST")) || { 10: 0, 50: 0, 100: 0, 500: 0 };
  }

  setTotalCharge() {
    localStorage.setItem("TOTAL_CHARGE", JSON.stringify(this.totalCharge));
  }

  getTotalCharge() {
    return JSON.parse(localStorage.getItem("TOTAL_CHARGE")) || 0;
  }
}

export default ChargeInfo;

