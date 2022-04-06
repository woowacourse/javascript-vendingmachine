import { CustomElement, Notification } from './CustomElement';
import TEMPLATE from '../templates';
import storage from '../storage';
import Product from '../domain/Product';
import { $, $$, markUnit, addEvent, emit, showSnackbar } from '../utils';
import VendingMachine from '../domain/VendingMachine';
import { Safe } from '../domain/Safe';
import { COINS } from '../constants';

class PurchaseTab extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    VendingMachine.instance.observe('subscribePurchaseTab', this);
  }

  render() {
    this.innerHTML = this.template();

    const products = storage.getLocalStorage('products');
    const productTable = $('#purchasable-product-list-table', this);

    products.forEach((product) => this.insertPurchableProduct(product, productTable));
  }

  template() {
    return TEMPLATE.PURCHASE_TAB;
  }

  setEvent() {
    addEvent(this, 'submit', '.user-amount-form', (e: SubmitEvent & { target: HTMLFormElement }) =>
      this.handleInsertCoin(e),
    );
    addEvent(this, 'click', '.purchase_button', (e: MouseEvent & { target: HTMLButtonElement }) =>
      this.handlePurchase(e),
    );
    addEvent(this, 'click', '.return-button', () => emit('.return-button', '@return', {}, this));
  }

  handleInsertCoin(e: SubmitEvent & { target: HTMLFormElement }) {
    e.preventDefault();

    emit('.user-amount-form', '@insert-coin', { userInputMoney: e.target.change.valueAsNumber }, this);
  }

  handlePurchase(e: MouseEvent & { target: HTMLButtonElement }) {
    const productItem = e.target.closest('.product-item') as HTMLElement;

    emit('#purchasable-product-list-table', '@purchase', { productId: productItem.dataset.productId }, this);
  }

  insertPurchableProduct(product: Product, productTable: Element) {
    $('tbody', productTable).insertAdjacentHTML(
      'beforeend',
      `<tr class="product-item" data-product-name="${product.name}" data-product-id="${product.id}">
          <td>${product.name}</td>
          <td>${markUnit(product.price)}</td>
          <td name="quantity">${product.quantity}</td>
          <td class="product-item__button">
            <button type="button" class="button purchase_button">구매</button>
          </td>
       </tr>
      `,
    );
  }

  notify({ action, amount, product, userAmount }: Notification) {
    switch (action) {
      case 'insert-coin':
        this.updateAmount(userAmount);
        showSnackbar('성공적으로 금액을 투입했습니다.');
        return;

      case 'purchase':
        this.updateAmount(userAmount);
        this.purchase(product);
        showSnackbar('성공적으로 상품을 구매했습니다.');
        return;

      case 'update-product':
        this.updateProductTable('update-product', product);
        return;

      case 'delete-product':
        this.updateProductTable('delete-product', product);
        return;

      case 'return':
        this.returnChange(amount, userAmount);
        showSnackbar(
          '성공적으로 잔돈이 반환되었습니다. 자판기의 잔액이 부족할 경우 자판기에 존재하는 금액만큼만 반환됩니다.',
        );
    }
  }

  updateAmount(userAmount: number) {
    $('.user-amount', this).textContent = markUnit(userAmount);
  }

  purchase(product: Product) {
    const productItems = $$(`[data-product-id="${product.id}"]`);

    productItems.forEach((item) => {
      $('[name=quantity]', item).textContent = String(product.quantity);
    });

    this.deleteProductItem(product, productItems);
  }

  updateProductTable(action: string, product: Product) {
    const productTable = $('#purchasable-product-list-table', this);
    const targetProduct = $(`[data-product-id="${product.id}"]`, productTable);

    switch (action) {
      case 'update-product':
        targetProduct?.remove();
        this.insertPurchableProduct(product, productTable);
        return;

      case 'delete-product':
        targetProduct.remove();
        return;
    }
  }

  returnChange(amount: Safe, userAmount: number) {
    $('.user-amount', this).textContent = markUnit(userAmount);
    COINS.forEach((coin) => ($(`.change-${coin}-quantity`).textContent = amount.userChange[coin].count));
  }

  deleteProductItem(product: Product, productItems: Element[]) {
    if (product.quantity > 0) return;

    productItems.forEach((item) => item.remove());
  }
}

customElements.define('purchase-tab', PurchaseTab);

export default PurchaseTab;
