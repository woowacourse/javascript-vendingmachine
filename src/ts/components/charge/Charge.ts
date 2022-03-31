import { selectDom, selectDomAll, addEvent } from "../../utils/dom";
import { CoinType } from "../../utils/interface";
import { verifyCharge } from "../../utils/validation";
import { chargeTemplate } from "./chargeTemplate";
import ChargeView from "./ChargeView";
class Charge {
  chargeView: ChargeView;
  vendingmachineFunctionWrap: HTMLElement;
  chargeForm: HTMLElement;
  chargeInput: HTMLElement | HTMLInputElement;
  currentContainCharge: HTMLElement;
  coinsKindCount: CoinType;
  totalCharge: number;

  constructor() {
    this.chargeView = new ChargeView();
    this.vendingmachineFunctionWrap = selectDom(".main");
    this.coinsKindCount = this.getCoinList();
    this.totalCharge = this.getTotalCharge();
  }

  bindChargeDom() {
    this.chargeForm = selectDom("#charge-control-form");
    this.chargeInput = selectDom(".charge-control-input");
    this.currentContainCharge = selectDom("#current-contain-charge");
    addEvent(this.chargeForm, "submit", this.handleInputAmount);
  }

  handleInputAmount = (e: Event) => {
    e.preventDefault();
    const charge = (this.chargeInput as HTMLInputElement).valueAsNumber;
    verifyCharge(charge);
    this.convertRandomCharge(charge);
  };

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

    this.chargeView.showRandomChargeResult(this.coinsKindCount, this.totalCharge);
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

  render() {
    this.chargeView.renderChargeView();
    this.chargeView.showRandomChargeResult(this.coinsKindCount, this.totalCharge);
    this.bindChargeDom();
  }
}

export default Charge;
