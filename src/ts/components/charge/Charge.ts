import { $ } from "../../utils/dom";
import { chargeTemplate } from "./ChargeTemplate";

class Charge {
  main: HTMLElement;

  constructor() {
    this.main = $(".main");
  }

  render() {
    this.main.replaceChildren();
    this.main.insertAdjacentHTML("beforeend", chargeTemplate());
  }
}

export default Charge;
