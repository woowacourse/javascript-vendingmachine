import { VendingMachineInterface } from '../domain/VendingMachine';
import { $, $$ } from '../utils';

export interface RechargeViewInterface {
  $rechargeForm: HTMLFormElement;
  $currentHoldingMoney: HTMLSpanElement;
  $rechargeInput: HTMLInputElement;
  $coin500: HTMLSpanElement;
  $coin100: HTMLSpanElement;
  $coin50: HTMLSpanElement;
  $coin10: HTMLSpanElement;
  vendingMachine: VendingMachineInterface;

  handleSubmit(event: SubmitEvent): void;
  renderHoldingMoney(): void;
  renderRecharge(): void;
  renderCoinTable(): void;
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
    this.$coin500 = <HTMLSpanElement>$('#coin-500');
    this.$coin100 = <HTMLSpanElement>$('#coin-100');
    this.$coin50 = <HTMLSpanElement>$('#coin-50');
    this.$coin10 = <HTMLSpanElement>$('#coin-10');
    this.vendingMachine = vendingMachine;

    this.$rechargeForm.addEventListener('submit', this.handleSubmit);
  }

  renderCoinTable = () => {
    this.$coin500.textContent = String(this.vendingMachine.getCoinByValue(500).count);
    this.$coin100.textContent = String(this.vendingMachine.getCoinByValue(100).count);
    this.$coin50.textContent = String(this.vendingMachine.getCoinByValue(50).count);
    this.$coin10.textContent = String(this.vendingMachine.getCoinByValue(10).count);
  };

  renderRecharge = () => {
    this.renderHoldingMoney();
    this.renderCoinTable();
  };

  renderHoldingMoney = () => {
    this.$currentHoldingMoney.textContent = String(this.vendingMachine.getHoldingMoney());
  };

  handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const moneyToRecharge = +this.$rechargeInput.value;

    try {
      this.vendingMachine.rechargeMoney(moneyToRecharge);
      this.renderRecharge();
    } catch (error) {
      alert(error.message);
    }
  };
}
