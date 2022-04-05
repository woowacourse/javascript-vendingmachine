import { DomainView, VendingMachine, Coin } from '../../index.d';
import { $ } from '../util/index';
import VendingMachineImpl from '../interactor/VendingMachineImpl';

export default class ChargeMoney implements DomainView {
  private $chargeMoneyForm: HTMLElement;
  private $chargeMoneyInput: HTMLElement;
  private $totalAmount: HTMLElement;
  private $coin500: HTMLElement;
  private $coin100: HTMLElement;
  private $coin50: HTMLElement;
  private $coin10: HTMLElement;
  private vendingMachine: VendingMachine;

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

  render(): void {
    this.$coin10.innerText = `${this.vendingMachine.coinCollection.coins[0].count}개`;
    this.$coin50.innerText = `${this.vendingMachine.coinCollection.coins[1].count}개`;
    this.$coin100.innerText = `${this.vendingMachine.coinCollection.coins[2].count}개`;
    this.$coin500.innerText = `${this.vendingMachine.coinCollection.coins[3].count}개`;
    this.$totalAmount.innerText = String(this.vendingMachine.coinCollection.calculateTotalAmount());
  }

  bindEvent(): void {
    this.$chargeMoneyForm.addEventListener('submit', this.handleSubmitForm.bind(this));
  }

  private handleSubmitForm(e: Event): void {
    e.preventDefault();

    try {
      const inputMoney = Number((this.$chargeMoneyInput as HTMLInputElement).value);
      this.vendingMachine.chargeMoney(inputMoney);
      this.render();
    } catch ({ message }) {
      alert(message);
    }
  }
}
