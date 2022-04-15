import { VendingMachineInterface } from '../domain/VendingMachine';
import { $ } from '../utils';
import { alertSnackBar } from '../snackbar';
import { COIN, SUCCESS_MESSAGE } from '../constants';

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
  renderRecharge(): void;
  renderHoldingMoney(): void;
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
    this.$rechargeForm = $('.recharge-form');
    this.$currentHoldingMoney = $('#current-holding-money', this.$rechargeForm);
    this.$rechargeInput = $('#recharge-input', this.$rechargeForm);
    this.$coin500 = $('#coin-500');
    this.$coin100 = $('#coin-100');
    this.$coin50 = $('#coin-50');
    this.$coin10 = $('#coin-10');

    this.vendingMachine = vendingMachine;

    this.$rechargeForm.addEventListener('submit', this.handleSubmit);
  }

  handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const moneyToRecharge = +this.$rechargeInput.value;

    try {
      this.vendingMachine.rechargeMoney(moneyToRecharge);
      this.renderRecharge();
      alertSnackBar(SUCCESS_MESSAGE.RECHARGE_MONEY);
    } catch (error) {
      alertSnackBar(error.message);
    }
  };

  renderRecharge = () => {
    this.renderHoldingMoney();
    this.renderCoinTable();

    this.$rechargeInput.value = '';
    this.$rechargeInput.focus();
  };

  renderHoldingMoney = () => {
    this.$currentHoldingMoney.textContent = String(this.vendingMachine.getHoldingMoney());
  };

  renderCoinTable = () => {
    this.$coin500.textContent = String(this.vendingMachine.getCoin(COIN.VALUE_500).count);
    this.$coin100.textContent = String(this.vendingMachine.getCoin(COIN.VALUE_100).count);
    this.$coin50.textContent = String(this.vendingMachine.getCoin(COIN.VALUE_50).count);
    this.$coin10.textContent = String(this.vendingMachine.getCoin(COIN.VALUE_10).count);
  };
}
