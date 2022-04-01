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

    this.$purchasableProductTable.addEventListener('click', this.handlePurchaseButton);

    // 반환버튼 이벤트 바인딩
    this.$refundButton.addEventListener('click', this.handleRefundButton);
  }

  public renderPurchaseTab = () => {
    this.renderPurchaseTable();
    this.renderRefundTable();
    this.$insertMoneyInput.focus();
  };

  private renderPurchaseTable = () => {
    this.$purchasableProductTable.textContent = '';
    const template = this.vendingMachine.products
      .map((product) => this.getProductTemplate(product))
      .join('');
    this.$purchasableProductTable.insertAdjacentHTML('beforeend', template);
  };

  private getProductTemplate = ({ name, price, quantity }) => {
    return `
      <tr class="product-row" data-name="${name}">
        <td class="product-row-name">${name}</td>
        <td class="product-row-price">${price}</td>
        <td class="product-row-quantity">${quantity}</td>
        <td>
          <button class="small-button purchase-button" data-name="${name}">구매</button>
        </td>
      </tr>
      `;
  };

  private handlePurchaseButton = (event: PointerEvent) => {
    const target = <HTMLButtonElement>event.target;
    if (!target.classList.contains('purchase-button')) {
      return;
    }
    const productName = target.dataset.name;
    try {
      const currentInsertedMoney = String(this.vendingMachine.deductInsertedMoney(productName));
      this.renderInsertedMoney(currentInsertedMoney);
      this.vendingMachine.decreaseProductQuantity(productName);
      this.renderPurchaseTable();
      renderToastModal('success', SUCCESS_MESSAGE.PURCHASE);
    } catch (error) {
      renderToastModal('error', error.message);
    }
  };

  private renderRefundTable = () => {};

  private handleInsertMoneyForm = (event: SubmitEvent) => {
    event.preventDefault();
    try {
      const insertedMoney = String(
        this.vendingMachine.addInsertedMoney(+this.$insertMoneyInput.value),
      );
      this.renderInsertedMoney(insertedMoney);
    } catch (error) {
      renderToastModal('error', error.message);
    }
  };

  private renderInsertedMoney = (money: string) => {
    this.$currentInsertedMoney.textContent = money;
  };

  private handleRefundButton = () => {};
}
