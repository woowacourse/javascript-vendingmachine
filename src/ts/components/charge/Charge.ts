import { selectDom, addEvent } from "../../utils/dom";
import { CoinType } from "../../utils/interface";
import { verifyCharge } from "../../utils/validation";
import ChargeInfo from "./ChargeInfo";
import ChargeView from "./ChargeView";
class Charge {
  chargeInfo: ChargeInfo;
  chargeView: ChargeView;
  chargeForm: HTMLElement;
  chargeInput: HTMLElement | HTMLInputElement;
  currentContainCharge: HTMLElement;

  constructor() {
    this.chargeInfo = new ChargeInfo();
    this.chargeView = new ChargeView();
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
    this.chargeInfo.convertRandomCharge(charge);
    this.chargeView.showRandomChargeResult(this.chargeInfo.getCoinList(), this.chargeInfo.getTotalCharge());
  };

  render() {
    this.chargeView.renderChargeView();
    this.chargeView.showRandomChargeResult(this.chargeInfo.getCoinList(), this.chargeInfo.getTotalCharge());
    this.bindChargeDom();
  }
}

export default Charge;
