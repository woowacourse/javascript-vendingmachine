import { CustomElement, Notification } from './CustomElement';
import TEMPLATE from '../templates';
import storage from '../storage';
import Product from '../domain/Product';
import { $, $$, markUnit, addEvent, emit } from '../utils';
import VendingMachine from '../domain/VendingMachine';

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

  notify({ action, product, userAmount }: Notification) {
    switch (action) {
      case 'update-amount':
        this.updateAmount(userAmount);
        return;

      case 'purchase':
        this.purchase(product);
        return;

      case 'update-product':
        this.updateProductTable('update-product', product);
        return;

      case 'delete-product':
        this.updateProductTable('delete-product', product);
        return;
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

  deleteProductItem(product: Product, productItems: Element[]) {
    if (product.quantity > 0) return;

    productItems.forEach((item) => item.remove());
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
}

customElements.define('purchase-tab', PurchaseTab);

export default PurchaseTab;
