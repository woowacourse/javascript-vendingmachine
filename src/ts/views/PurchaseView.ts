import { VendingMachineInterface } from '../domains/VendingMachine';
import { $, renderTemplate } from '../utils';
import { renderToastModal } from '../components/ToastNotification';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../constants';
import { getPurchaseProduct } from './template';

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
  }

  public render = () => {
    renderTemplate(getPurchaseProduct);
    this.$insertMoneyForm = <HTMLFormElement>$('#insert-money-form');
    this.$insertMoneyInput = <HTMLInputElement>$('#insert-money-input');
    this.$currentInsertedMoney = <HTMLSpanElement>$('#current-inserted-money');
    this.$purchasableProductTable = <HTMLTableSectionElement>$('#purchasable-product-table');
    this.$coin500 = $('#purchase-tab-coin-500');
    this.$coin100 = $('#purchase-tab-coin-100');
    this.$coin50 = $('#purchase-tab-coin-50');
    this.$coin10 = $('#purchase-tab-coin-10');
    this.$refundButton = <HTMLButtonElement>$('#refund-button');
    this.$insertMoneyForm.addEventListener('submit', this.handleInsertMoneyForm);
    this.$purchasableProductTable.addEventListener('click', this.handlePurchaseButton);
    this.$refundButton.addEventListener('click', this.handleRefundButton);

    this.renderPurchaseTable();
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

  private handleInsertMoneyForm = (event: SubmitEvent) => {
    event.preventDefault();
    try {
      const insertedMoney = String(
        this.vendingMachine.addInsertedMoney(+this.$insertMoneyInput.value),
      );
      this.renderInsertedMoney(insertedMoney);
      this.$insertMoneyInput.value = '';
      renderToastModal('success', SUCCESS_MESSAGE.MONEY_INSERTED);
    } catch (error) {
      renderToastModal('error', error.message);
    }
  };

  private renderInsertedMoney = (money: string) => {
    this.$currentInsertedMoney.textContent = money;
  };

  private handleRefundButton = () => {
    if (this.vendingMachine.insertedMoney === 0) {
      renderToastModal('error', ERROR_MESSAGE.NOT_INSERTED_HOLDING_MONEY);
      const initializedCoins = [0, 0, 0, 0];
      this.renderRefundableCoinTable(initializedCoins);
      return;
    }

    const refundableCoins = this.vendingMachine.getRefundableCoins();
    this.renderRefundableCoinTable(refundableCoins);
    const nonRefundableCoinMoney = this.vendingMachine.getNonRefundableCoinMoney();
    this.renderRefundMoneyToastModal(nonRefundableCoinMoney);
    this.renderInsertedMoney('0');

    this.vendingMachine.deductRefundableCoins(refundableCoins);
    this.vendingMachine.resetInsertedMoney();
  };

  private renderRefundableCoinTable = ([
    coin500Count,
    coin100Count,
    coin50Count,
    coin10Count,
  ]: number[]) => {
    this.$coin500.textContent = String(coin500Count);
    this.$coin100.textContent = String(coin100Count);
    this.$coin50.textContent = String(coin50Count);
    this.$coin10.textContent = String(coin10Count);
  };

  private renderRefundMoneyToastModal = (nonRefundableCoinMoney: number) => {
    if (nonRefundableCoinMoney > 0) {
      renderToastModal(
        'error',
        `보유 중인 잔돈이 부족하여, ${nonRefundableCoinMoney}원은 반환하지 못하였습니다.`,
      );
    } else {
      renderToastModal('success', SUCCESS_MESSAGE.REFUND_COMPLETE);
    }
  };
}
