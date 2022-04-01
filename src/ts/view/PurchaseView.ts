import VendingMachine, { VendingMachineInterface } from '../domain/VendingMachine';
import { $ } from '../utils';
import { renderToastModal } from '../components/ToastNotification';
import { SUCCESS_MESSAGE } from '../constants';

export default class PurchaseView {
  vendingMachine: VendingMachineInterface;
  $insertMoneyForm: HTMLFormElement;
  $insertMoneyInput: HTMLInputElement;
  $currentInsertedMoney: HTMLSpanElement;
  $purchasableProductTable: HTMLTableSectionElement;
  $coin500: HTMLSpanElement;
  $coin100: HTMLSpanElement;
  $coin50: HTMLSpanElement;
  $coin10: HTMLSpanElement;
  $refundButton: HTMLButtonElement;

  constructor(vendingMachine: VendingMachineInterface) {
    this.vendingMachine = vendingMachine;
    this.$insertMoneyForm = <HTMLFormElement>$('#insert-money-form');
    this.$insertMoneyInput = <HTMLInputElement>$('#insert-money-input');
    this.$currentInsertedMoney = <HTMLSpanElement>$('#current-inserted-money');

    this.$purchasableProductTable = <HTMLTableSectionElement>$('#purchasable-product-table');

    this.$coin500 = $('#purchase-tab-coin-500');
    this.$coin100 = $('#purchase-tab-coin-100');
    this.$coin50 = $('#purchase-tab-coin-50');
    this.$coin10 = $('#purchase-tab-coin-10');
    this.$refundButton = <HTMLButtonElement>$('#refund-button');

    // 투입버튼 이벤트 바인딩
    this.$insertMoneyForm.addEventListener('submit', this.handleInsertMoneyForm);
    // 반환버튼 이벤트 바인딩
    this.$refundButton.addEventListener('click', this.handleRefundButton);
  }

  public renderPurchaseTab = () => {
    // this.renderInsertedMoney();
    this.renderPurchaseTable();
    this.renderRefundTable();
  };

  private renderInsertedMoney = (money: number) => {};

  private renderPurchaseTable = () => {
    // 구매버튼 이벤트 바인딩(테이블에서 위임)
  };

  private renderRefundTable = () => {};

  private handleInsertMoneyForm = (event: SubmitEvent) => {
    event.preventDefault();
    try {
      this.$currentInsertedMoney.textContent = String(
        this.vendingMachine.addInsertedMoney(+this.$insertMoneyInput.value),
      );
    } catch (error) {
      renderToastModal('error', error.message);
    }
  };

  private handleRefundButton = () => {};
}
