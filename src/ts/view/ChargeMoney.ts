import { DomainView, Admin } from '../../index.d';
import { $ } from '../util/index';
import AdminImpl from '../interactor/AdminImpl';
import Snackbar from './Snackbar';

export default class ChargeMoney implements DomainView {
  private $chargeMoneyForm: HTMLElement;
  private $chargeMoneyInput: HTMLElement;
  private $totalAmount: HTMLElement;
  private $coin500: HTMLElement;
  private $coin100: HTMLElement;
  private $coin50: HTMLElement;
  private $coin10: HTMLElement;
  private admin: Admin;
  private snackbar: Snackbar;

  constructor(snackbar: Snackbar) {
    this.$chargeMoneyForm = $('#charge-money-form');
    this.$chargeMoneyInput = $('#charge-money-input');
    this.$totalAmount = $('#total-amount');
    this.$coin500 = $('#coin-500-count');
    this.$coin100 = $('#coin-100-count');
    this.$coin50 = $('#coin-50-count');
    this.$coin10 = $('#coin-10-count');
    this.admin = AdminImpl.getInstance();
    this.snackbar = snackbar;
  }

  render(): void {
    if (!this.admin.isLogin()) {
      history.back();
      return;
    }
    
    this.$coin10.innerText = `${this.admin.vendingMachine.coins[0].count}개`;
    this.$coin50.innerText = `${this.admin.vendingMachine.coins[1].count}개`;
    this.$coin100.innerText = `${this.admin.vendingMachine.coins[2].count}개`;
    this.$coin500.innerText = `${this.admin.vendingMachine.coins[3].count}개`;
    this.$totalAmount.innerText = String(this.admin.vendingMachine.calculateTotalAmount());
    this.$chargeMoneyInput.focus();
  }

  bindEvent(): void {
    this.$chargeMoneyForm.addEventListener('submit', this.handleSubmitForm.bind(this));
  }

  private handleSubmitForm(e: Event): void {
    e.preventDefault();

    try {
      const inputMoney = Number((this.$chargeMoneyInput as HTMLInputElement).value);
      this.admin.chargeMoney(inputMoney);
      this.render();
    } catch ({ message }) {
      this.snackbar.on(message);
    }
  }
}
