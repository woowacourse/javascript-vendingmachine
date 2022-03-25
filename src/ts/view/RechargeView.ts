import { VendingMachineInterface } from '../domain/VendingMachine';
import { $, $$ } from '../utils';

export interface RechargeViewInterface {
  $rechargeForm: HTMLFormElement;
  $currentHoldingMoney: HTMLSpanElement;
  $coin500: HTMLSpanElement;
  $coin100: HTMLSpanElement;
  $coin50: HTMLSpanElement;
  $coin10: HTMLSpanElement;
  vendingMachine: VendingMachineInterface;

  handleSubmit(event: SubmitEvent): void;
  renderHoldingMoney(): void;
  renderRecharge(): void;
}

export default class RechargeView implements RechargeViewInterface {
  $rechargeForm: HTMLFormElement;
  $currentHoldingMoney: HTMLSpanElement;
  $rechargeInput: HTMLInputElement;
  $coin500: HTMLSpanElement;
  $coin100: HTMLSpanElement;
  $coin50: HTMLSpanElement;
  $coin10: HTMLSpanElement;
  vendingMachine: VendingMachineInterface;

  constructor(vendingMachine: VendingMachineInterface) {
    this.$rechargeForm = <HTMLFormElement>$('.recharge-form');
    this.$currentHoldingMoney = $('#current-holding-money');
    this.$rechargeInput = <HTMLInputElement>$('#recharge-input', this.$rechargeForm);
    this.$coin500 = $('.coin-500');
    this.$coin100 = $('.coin-100');
    this.$coin50 = $('.coin-50');
    this.$coin10 = $('.coin-10');
    this.vendingMachine = vendingMachine;

    this.$rechargeForm.addEventListener('submit', this.handleSubmit);
  }

  renderRecharge = () => {
    this.renderHoldingMoney();
  };

  renderHoldingMoney = () => {
    this.$currentHoldingMoney.textContent = String(this.vendingMachine.getHoldingMoney());
  };

  handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const moneyToRecharge = +this.$rechargeInput.value;

    try {
      this.vendingMachine.rechargeMoney(moneyToRecharge);
      this.renderHoldingMoney();
    } catch (error) {
      alert(error.message);
    }
  };
}
