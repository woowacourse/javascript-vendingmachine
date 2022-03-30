import { selectDom, selectDomAll } from "../../utils/dom";
import { CoinType } from "../../utils/interface";
import { chargeTemplate } from "./chargeTemplate";

class ChargeView {
  vendingmachineFunctionWrap: HTMLElement;
  currentContainCharge: HTMLElement;

  constructor() {
    this.vendingmachineFunctionWrap = selectDom(".main");
  }

  showRandomChargeResult(coinsKindCount: CoinType, totalCharge: number) {
    this.currentContainCharge = selectDom("#current-contain-charge");
    
    const chargeResult = Object.values(coinsKindCount).reverse();
    const chargeCoinCount = selectDomAll(".charge-coin-count");
    this.currentContainCharge.textContent = `${totalCharge}`;
    chargeCoinCount.forEach((coinCount, index) =>
      (coinCount.innerText = `${chargeResult[index]}개`));
  }

  renderChargeView() {
    this.vendingmachineFunctionWrap.replaceChildren();
    this.vendingmachineFunctionWrap.insertAdjacentHTML("beforeend", chargeTemplate());
  }
}

export default ChargeView;
