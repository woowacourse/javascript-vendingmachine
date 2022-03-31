import ChargeManager, { Coin } from "../../mananger/ChargeManager";
import { pickNumberInList } from "../../utils/common";
import { $ } from "../../utils/dom";
import { verifyCharge } from "../../utils/validation";
import { chargeTemplate } from "./chargeTemplate";

class Charge {
  chargeContainer: HTMLElement;
  chargeForm: HTMLElement;
  chargeInput: HTMLElement;
  chargeHoldingAmount: HTMLElement;
  chargeManager: ChargeManager;
  chargeCoin500: HTMLElement;
  chargeCoin100: HTMLElement;
  chargeCoin50: HTMLElement;
  chargeCoin10: HTMLElement;

  constructor({ chargeManager }) {
    this.chargeManager = chargeManager;
    this.chargeContainer = $(".charge-manange__container");
    this.chargeContainer.replaceChildren();
    this.chargeContainer.insertAdjacentHTML("beforeend", chargeTemplate());

    this.chargeForm = $(".charge-manange__form");
    this.chargeInput = $(".charge-manange__input");
    this.chargeHoldingAmount = $(".charge-manange__holding-amount");
    this.chargeCoin500 = $(".charge-manange__table-coin--500");
    this.chargeCoin100 = $(".charge-manange__table-coin--100");
    this.chargeCoin50 = $(".charge-manange__table-coin--50");
    this.chargeCoin10 = $(".charge-manange__table-coin--10");

    this.chargeForm.addEventListener("submit", this.handleAddCharge);
  }

  handleAddCharge = (e) => {
    e.preventDefault();

    const charge = (<HTMLInputElement>this.chargeInput).valueAsNumber;

    try {
      verifyCharge(charge);

      const randomCoins = this.getRandomCoins(charge);
      this.chargeManager.addCoins(randomCoins);
      this.addRandomCoins();
      this.addHoldingAmount();
    } catch ({ message }) {
      alert(message);
    }
  };

  getRandomCoins(charge: number): Coin {
    const coinObject = { 10: 0, 50: 0, 100: 0, 500: 0 };
    let coinList = [10, 50, 100, 500];

    while (charge) {
      coinList = coinList.filter((coin) => coin <= charge);
      const randomCoin = pickNumberInList(coinList);
      coinObject[randomCoin]++;
      charge -= randomCoin;
    }

    return coinObject;
  }

  addHoldingAmount() {
    this.chargeHoldingAmount.textContent = `${this.chargeManager.getTotalCharge()}`;
  }

  addRandomCoins() {
    const countList = Object.values(this.chargeManager.getCoins());

    [this.chargeCoin10, this.chargeCoin50, this.chargeCoin100, this.chargeCoin500].forEach((chargeCoin, index) => {
      chargeCoin.textContent = `${countList[index]}개`;
    });
  }

  show() {
    this.chargeContainer.classList.remove("hide");
  }
}

export default Charge;
