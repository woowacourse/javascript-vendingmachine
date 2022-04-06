import { selectDom, selectDomAll } from "../../utils/dom";
import { CoinType } from "../../utils/interface";
import { chargeSectionNoAuthority, chargeTemplate } from "./chargeTemplate";

class ChargeView {
  vendingmachineFunctionWrap: HTMLElement;

  constructor() {
    this.vendingmachineFunctionWrap = selectDom(".main");
  }

  showRandomChargeResult(coinsKindCount: CoinType, totalCharge: number) {
    const currentContainCharge = selectDom("#current-contain-charge", this.vendingmachineFunctionWrap);
    const chargeResult = Object.values(coinsKindCount).reverse();
    const chargeCoinCount = selectDomAll(".charge-coin-count", this.vendingmachineFunctionWrap);

    currentContainCharge.textContent = `${totalCharge}`;
    chargeCoinCount.forEach((coinCount, index) =>
      (coinCount.innerText = `${chargeResult[index]}개`));
  }


  renderChargeView(userName: string) {
    this.vendingmachineFunctionWrap.replaceChildren();
    this.vendingmachineFunctionWrap.insertAdjacentHTML("beforeend", userName ?  chargeTemplate : chargeSectionNoAuthority);
  }
}

export default ChargeView;
