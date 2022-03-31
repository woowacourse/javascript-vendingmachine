import { $, $$ } from "../../utils/dom";
import { verifyCharge } from "../../utils/validation";
import { chargeTemplate } from "./chargeTemplate";

interface CoinType {
  10: number;
  50: number;
  100: number;
  500: number;
}

class Charge {
  chargeForm: HTMLElement;
  chargeInput: HTMLElement | HTMLInputElement;
  currentContainCharge: HTMLElement;
  coinObj: CoinType;
  totalCharge: number;
  chargeContainer: HTMLElement;

  constructor() {
    this.totalCharge = 0;
    this.coinObj = { 10: 0, 50: 0, 100: 0, 500: 0 };

    this.chargeContainer = $(".charge-manange__container");
    this.chargeContainer.replaceChildren();
    this.chargeContainer.insertAdjacentHTML("beforeend", chargeTemplate());

    this.chargeForm = $("#charge-control-form");
    this.chargeInput = $(".charge-control-input");
    this.currentContainCharge = $("#current-contain-charge");

    this.chargeForm.addEventListener("submit", this.handleAddCharge);
  }

  handleAddCharge = (e: Event) => {
    e.preventDefault();
    const charge = (this.chargeInput as HTMLInputElement).valueAsNumber;
    try {
      verifyCharge(charge);
      this.convertRandomCharge(charge);
    } catch ({ message }) {
      alert(message);
      return;
    }
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
        this.coinObj[randomCoin]++;
      }
    }

    this.showRandomCharge(Object.values(this.coinObj).reverse());
  }

  pickNumberInList() {
    const coinList = [10, 50, 100, 500];
    const randomNumber = Math.floor(Math.random() * coinList.length);
    return coinList[randomNumber];
  }

  showRandomCharge(chargeResult: number[]) {
    const chargeCoinCount = $$(".charge-coin-count");
    this.currentContainCharge.textContent = `${this.totalCharge}`;
    Array.from(
      chargeCoinCount,
      (coinCount: HTMLTableElement, index: number) => (coinCount.innerText = `${chargeResult[index]}개`),
    );
  }

  show() {
    this.chargeContainer.classList.remove("hide");
  }
}

export default Charge;
