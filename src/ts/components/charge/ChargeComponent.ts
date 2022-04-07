import { $ } from "../../utils/dom";
import { chargeTemplate } from "./chargeTemplate";
import ChargeManager from "../../manager/ChargeManager";
import Snackbar from "../Snackbar";
import { INFOMATION_MESSAGES } from "../../utils/constants";

class ChargeComponent {
  chargeContainer: HTMLElement;
  chargeForm: HTMLFormElement;
  chargeInput: HTMLInputElement;
  chargeAmountText: HTMLSpanElement;
  chargeCoin500: HTMLElement;
  chargeCoin100: HTMLElement;
  chargeCoin50: HTMLElement;
  chargeCoin10: HTMLElement;
  snackbar: Snackbar;

  constructor(private chargeManager: ChargeManager) {
    this.snackbar = new Snackbar();
    this.chargeContainer = $(".charge-manage__container");
    this.chargeContainer.replaceChildren();
    this.chargeContainer.insertAdjacentHTML("beforeend", chargeTemplate());

    this.chargeForm = $(".charge-manage__form");
    this.chargeInput = $(".charge-manage__input");
    this.chargeAmountText = $(".charge-manage__amount");
    this.chargeCoin500 = $(".charge-manage__table-coin--500");
    this.chargeCoin100 = $(".charge-manage__table-coin--100");
    this.chargeCoin50 = $(".charge-manage__table-coin--50");
    this.chargeCoin10 = $(".charge-manage__table-coin--10");

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
      this.snackbar.show(INFOMATION_MESSAGES.SUCCESS_CHARGE);
    } catch ({ message }) {
      this.snackbar.show(message);
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
