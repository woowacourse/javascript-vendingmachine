import { Notification, Tab } from '../CustomElement';
import TEMPLATE from '../../templates';
import storage from '../../storage';
import Product from '../../domain/Product';
import { $, $$, markUnit, addEvent, emit, showSnackbar } from '../../utils';
import { Safe } from '../../domain/Safe';
import { COINS, CUSTOM_EVENT, ELEMENT_ACTION, SUCCESS_MESSAGE } from '../../constants';

class PurchaseTab extends Tab {
  connectedCallback() {
    super.connectedCallback();
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
    addEvent(this, 'click', '.return-button', () => emit('.return-button', CUSTOM_EVENT.RETURN_OF_CHANGE, {}, this));
  }

  handleInsertCoin(e: SubmitEvent & { target: HTMLFormElement }) {
    e.preventDefault();

    emit('.user-amount-form', CUSTOM_EVENT.INSERT_COIN, { userInputMoney: e.target.change.valueAsNumber }, this);
  }

  handlePurchase(e: MouseEvent & { target: HTMLButtonElement }) {
    const productItem = e.target.closest('.product-item') as HTMLElement;

    emit(
      '#purchasable-product-list-table',
      CUSTOM_EVENT.PRODUCT.PURCHASE,
      { productId: productItem.dataset.productId },
      this,
    );
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
      case ELEMENT_ACTION.INSERT_COIN:
        this.updateAmount(userAmount);
        showSnackbar(SUCCESS_MESSAGE.INSERT_COIN);
        return;

      case ELEMENT_ACTION.PURCHASE:
        this.updateAmount(userAmount);
        this.purchase(product);
        showSnackbar(SUCCESS_MESSAGE.PURCHASE);
        return;

      case ELEMENT_ACTION.UPDATE_PRODUCT:
        this.updateProductTable(ELEMENT_ACTION.UPDATE_PRODUCT, product);
        return;

      case ELEMENT_ACTION.DELETE_PRODUCT:
        this.updateProductTable(ELEMENT_ACTION.DELETE_PRODUCT, product);
        return;

      case ELEMENT_ACTION.RETURN_OF_CHANGE:
        this.returnChange(amount, userAmount);
        showSnackbar(SUCCESS_MESSAGE.RETURN);
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
      case ELEMENT_ACTION.UPDATE_PRODUCT:
        targetProduct?.remove();
        this.insertPurchableProduct(product, productTable);
        return;

      case ELEMENT_ACTION.DELETE_PRODUCT:
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
