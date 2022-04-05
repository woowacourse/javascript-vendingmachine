import VendingMachineTab from './VendingMachineTab';
import { Coin } from '../types';
import { generateCoinRechargeTabContentTemplate } from '../template';
import { selectDom, selectDoms } from '../utils';
import { ID, CLASS } from '../constant/selector';

class CoinRechargeTab extends VendingMachineTab {
  cashChargeForm: HTMLElement | null = null;

  cashChargeInput: HTMLInputElement | null = null;

  chargedAmountText: HTMLElement | null = null;

  coinCountList: NodeListOf<HTMLElement> | null = null;

  render(): void {
    const totalCoinAmount: number = this.vendingMachine.calculateTotalCoinAmount();

    this.changeTabContent(
      generateCoinRechargeTabContentTemplate(totalCoinAmount, this.vendingMachine.coinCollection)
    );

    this.cashChargeForm = selectDom(`#${ID.CASH_CHARGE_FORM}`, this.content);
    this.cashChargeInput = selectDom(`.${CLASS.CASH_CHARGE_INPUT}`, this.cashChargeForm);
    this.chargedAmountText = selectDom(`#${ID.CHARGED_AMOUNT}`, this.content);
    this.coinCountList = selectDoms(`.${CLASS.COIN_COUNT}`, this.content);

    this.cashChargeForm.addEventListener('submit', this.onSubmitCashChargeForm);
  }

  private onSubmitCashChargeForm = (e: SubmitEvent): void => {
    e.preventDefault();

    const chargedCash = this.cashChargeInput.valueAsNumber;

    try {
      this.vendingMachine.validateCashInput(chargedCash);
    } catch (error) {
      return alert(error.message);
    }

    this.renderChargedCoinState(
      this.vendingMachine.chargeCoin(chargedCash),
      this.vendingMachine.coinCollection
    );
  };

  private renderChargedCoinState(
    totalCoinAmount: number,
    currentCoinCollection: Record<Coin, number>
  ): void {
    this.chargedAmountText.textContent = String(totalCoinAmount);
    this.coinCountList.forEach((coinCount) => {
      coinCount.textContent = `${currentCoinCollection[coinCount.dataset.coinValue]}개`;
    });
  }
}

export default CoinRechargeTab;
