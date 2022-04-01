import { SUCCESS_MESSAGE } from '../constants';
import { VendingMachineInterface } from '../domain/VendingMachine';
import { $ } from '../utils';
import { renderToastModal } from '../components/ToastNotification';

export default class RechargeView {
  $rechargeForm: HTMLFormElement;
  $rechargeInput: HTMLInputElement;
  $currentHoldingMoney: HTMLSpanElement;
  $coin500: HTMLSpanElement;
  $coin100: HTMLSpanElement;
  $coin50: HTMLSpanElement;
  $coin10: HTMLSpanElement;
  vendingMachine: VendingMachineInterface;

  constructor(vendingMachine: VendingMachineInterface) {
    this.$rechargeForm = <HTMLFormElement>$('#recharge-form');
    this.$rechargeInput = <HTMLInputElement>$('#recharge-input', this.$rechargeForm);
    this.$currentHoldingMoney = $('#current-holding-money');
    this.$coin500 = $('#coin-500');
    this.$coin100 = $('#coin-100');
    this.$coin50 = $('#coin-50');
    this.$coin10 = $('#coin-10');
    this.vendingMachine = vendingMachine;

    this.$rechargeForm.addEventListener('submit', this.handleSubmit);
  }

  public renderRechargeTab = () => {
    this.renderHoldingMoney();
    this.renderCoinTable();
    this.$rechargeInput.focus();
  };

  private renderHoldingMoney = () => {
    this.$currentHoldingMoney.textContent = String(this.vendingMachine.getHoldingMoney());
  };

  private renderCoinTable = () => {
    this.$coin500.textContent = String(this.vendingMachine.getCoin(500).count);
    this.$coin100.textContent = String(this.vendingMachine.getCoin(100).count);
    this.$coin50.textContent = String(this.vendingMachine.getCoin(50).count);
    this.$coin10.textContent = String(this.vendingMachine.getCoin(10).count);
  };

  private handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const moneyToRecharge = +this.$rechargeInput.value;

    try {
      this.vendingMachine.rechargeMoney(moneyToRecharge);
      this.renderRechargeTab();
      this.$rechargeInput.value = '';
      renderToastModal('success', SUCCESS_MESSAGE.MONEY_RECHARGED);
    } catch (error) {
      renderToastModal('error', error.message);
    }
  };
}
