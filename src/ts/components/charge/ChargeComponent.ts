import { $ } from "../../utils/dom";
import { chargeTemplate } from "./chargeTemplate";
import ChargeManager from "../../mananger/ChargeManager";

class ChargeComponent {
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
      const randomCoins = this.chargeManager.getRandomCoins(charge);
      this.chargeManager.addCoins(randomCoins);
      this.increaseRandomCoins();
      this.increaseHoldingAmount();
    } catch ({ message }) {
      alert(message);
    }
  };

  increaseHoldingAmount() {
    this.chargeHoldingAmount.textContent = `${this.chargeManager.getTotalCharge()}`;
  }

  increaseRandomCoins() {
    const countList = Object.values(this.chargeManager.getTotalCoins());

    [this.chargeCoin10, this.chargeCoin50, this.chargeCoin100, this.chargeCoin500].forEach((chargeCoin, index) => {
      chargeCoin.textContent = `${countList[index]}개`;
    });
  }

  show() {
    this.chargeContainer.classList.remove("hide");
  }
}

export default ChargeComponent;
