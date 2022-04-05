import { selectDom, addEvent } from "../../utils/dom";
import { validateCharge } from "../../utils/validation";
import { showSnackbar } from "../snackbar/snackbar";
import { insertMoneyText } from "../snackbar/snackbarTemplate";
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
    validateCharge(charge);
    showSnackbar(insertMoneyText(charge))
    this.chargeInfo.convertRandomCharge(charge);
    this.chargeView.showRandomChargeResult(this.chargeInfo.getCoinList(), this.chargeInfo.getTotalCharge());
  };

  render() {
    this.chargeView.renderChargeView(this.chargeInfo.getUserName());
    if (this.chargeInfo.getUserName()) {
      this.chargeView.showRandomChargeResult(this.chargeInfo.getCoinList(), this.chargeInfo.getTotalCharge());
      this.bindChargeDom();
    }
  }
}

export default Charge;
