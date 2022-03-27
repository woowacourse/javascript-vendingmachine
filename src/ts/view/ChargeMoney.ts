import { ChargeMoneyView, VendingMachine } from '../../index.d';
import { $ } from '../util/index';
import VendingMachineImpl from '../interactor/VendingMachineImpl';

export default class ChargeMoney implements ChargeMoneyView {
  public readonly $chargeMoneyForm: HTMLElement;
  public readonly $chargeMoneyInput: HTMLElement;
  public readonly $totalAmount: HTMLElement;
  public readonly $coin500: HTMLElement;
  public readonly $coin100: HTMLElement;
  public readonly $coin50: HTMLElement;
  public readonly $coin10: HTMLElement;
  public readonly vendingMachine: VendingMachine;

  constructor() {
    this.$chargeMoneyForm = $('#charge-money-form');
    this.$chargeMoneyInput = $('#charge-money-input');
    this.$totalAmount = $('#total-amount');
    this.$coin500 = $('#coin-500-count');
    this.$coin100 = $('#coin-100-count');
    this.$coin50 = $('#coin-50-count');
    this.$coin10 = $('#coin-10-count');
    this.vendingMachine = VendingMachineImpl.getInstance();
  }

  bindEvent(): void {
    this.$chargeMoneyForm.addEventListener('submit', this.handleSubmitForm.bind(this));
  }

  handleSubmitForm(e: Event): void {
    e.preventDefault();

    try {
      const inputMoney = Number((this.$chargeMoneyInput as HTMLInputElement).value);
      this.vendingMachine.chargeMoney(inputMoney);
      this.render();
    } catch ({ message }) {
      alert(message);
    }
  }

  render(): void {
    this.vendingMachine.coinCollection.coins.forEach(({ amount, count }) => {
      this[`$coin${amount}`].innerText = `${count}개`;
    });
    this.$totalAmount.innerText = String(this.vendingMachine.coinCollection.calculateTotalAmount());
  }
}
