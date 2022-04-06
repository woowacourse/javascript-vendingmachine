import VendingMachineTab from './VendingMachineTab';
import { generateItemPurchaseTabContentTemplate } from '../template';
import { selectDom, selectDoms } from '../utils';
import { ID, CLASS } from '../constant/selector';

class ItemPurchaseTab extends VendingMachineTab {
  private cashChargeForm: HTMLFormElement | null;

  private cashChargeInput: HTMLInputElement | null;

  private chargedAmountSpan: HTMLSpanElement | null;

  render(): void {
    const chargedCash = this.vendingMachine.getItemPurchaseCash();

    this.changeTabContent(generateItemPurchaseTabContentTemplate(chargedCash));

    this.bindEvent();
  }

  private bindEvent(): void {
    this.cashChargeForm = selectDom(`#${ID.CASH_CHARGE_FORM}`);
    this.cashChargeInput = selectDom(`.${CLASS.CASH_CHARGE_INPUT}`);
    this.chargedAmountSpan = selectDom(`#${ID.CHARGED_AMOUNT}`);

    this.cashChargeForm.addEventListener('submit', this.onSubmitCashChargeForm);
  }

  private onSubmitCashChargeForm = (e: SubmitEvent) => {
    e.preventDefault();

    const inputedCash = this.cashChargeInput.valueAsNumber;

    try {
      this.vendingMachine.validateItemPurchaseCashInput(inputedCash);
    } catch (error) {
      return alert(error.message);
    }

    const chargedAmount = this.vendingMachine.chargeCash(inputedCash);
    this.renderChargedAmount(String(chargedAmount));
  };

  private renderChargedAmount(chargedAmount: string): void {
    this.chargedAmountSpan.textContent = chargedAmount;
  }
}

export default ItemPurchaseTab;
