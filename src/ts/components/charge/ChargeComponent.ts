import { $ } from "../../utils/dom";
import { chargeTemplate } from "./chargeTemplate";
import ChargeManager from "../../mananger/ChargeManager";

class ChargeComponent {
  chargeContainer: HTMLElement;
  chargeForm: HTMLFormElement;
  chargeInput: HTMLInputElement;
  chargeAmountText: HTMLSpanElement;
  chargeCoin500: HTMLElement;
  chargeCoin100: HTMLElement;
  chargeCoin50: HTMLElement;
  chargeCoin10: HTMLElement;

  constructor(private chargeManager: ChargeManager) {
    this.chargeContainer = $(".charge-manange__container");
    this.chargeContainer.replaceChildren();
    this.chargeContainer.insertAdjacentHTML("beforeend", chargeTemplate());

    this.chargeForm = $(".charge-manange__form");
    this.chargeInput = $(".charge-manange__input");
    this.chargeAmountText = $(".charge-manange__amount");
    this.chargeCoin500 = $(".charge-manange__table-coin--500");
    this.chargeCoin100 = $(".charge-manange__table-coin--100");
    this.chargeCoin50 = $(".charge-manange__table-coin--50");
    this.chargeCoin10 = $(".charge-manange__table-coin--10");

    this.chargeForm.addEventListener("submit", this.handleAddCharge);
  }

  handleAddCharge = (e: Event) => {
    e.preventDefault();
    const charge = this.chargeInput.valueAsNumber;

    try {
      const randomCoins = this.chargeManager.getRandomCoins(charge);
      this.chargeManager.addCoins(randomCoins);
      this.renderAmount();
      this.renderRandomCoins();
    } catch ({ message }) {
      alert(message);
    }
  };

  renderAmount() {
    this.chargeAmountText.textContent = `${this.chargeManager.getTotalCharge()}`;
  }

  renderRandomCoins() {
    const countList = Object.values(this.chargeManager.getTotalCoins());

    [this.chargeCoin10, this.chargeCoin50, this.chargeCoin100, this.chargeCoin500].forEach((chargeCoin, index) => {
      chargeCoin.textContent = `${countList[index]}개`;
    });
  }

  show() {
    this.chargeContainer.classList.remove("hide");
    this.chargeInput.focus();
    this.renderRandomCoins();
    this.renderAmount();
  }
}

export default ChargeComponent;
