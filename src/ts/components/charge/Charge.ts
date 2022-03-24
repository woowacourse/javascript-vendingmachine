import { $, addEvent } from "../../utils/dom";
import { verifyCharge } from "../../utils/validation";
import { chargeTemplate } from "./chargeTemplate";

class Charge {
  main: HTMLElement;
  chargeForm: HTMLElement;
  chargeInput: HTMLElement | HTMLInputElement;

  constructor() {
    this.main = $(".main");
  }

  bindChargeDom() {
    this.chargeForm = $("#charge-control-form");
    this.chargeInput = $(".charge-control-input");
    addEvent(this.chargeForm, "submit", this.handleAddCharge);
    addEvent($("#charge-add-button"), "click", this.handleAddCharge);
  }

  handleAddCharge = (e: Event) => {
    e.preventDefault();
    const charge = (this.chargeInput as HTMLInputElement).valueAsNumber;
    try {
      console.log(charge);
      verifyCharge(charge);
    } catch ({ message }) {
      alert(message);
      return;
    }
  };

  render() {
    this.main.replaceChildren();
    this.main.insertAdjacentHTML("beforeend", chargeTemplate());
    this.bindChargeDom();
  }
}

export default Charge;
