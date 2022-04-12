import vendingMachine from '../model/VendingMachine';
import ProductItemComponent from './ProductItemComponent';
import { Product } from '../interfaces/VendingMachine.interface';
import throwableFunctionHandler from '../utils/throwableFunctionHandler';

class ProductListComponent {
  parentElement: HTMLElement;
  noticeStateChanged: Function;
  $productList: HTMLElement;

  constructor(parentElement: HTMLElement, noticeStateChanged: Function) {
    this.parentElement = parentElement;
    this.noticeStateChanged = noticeStateChanged;
  }

  private bindEvent = () => {
    this.$productList = this.parentElement.querySelector('#product-list');
    this.$productList.addEventListener('click', this.onClickPurchaseButton);
  };

  private onClickPurchaseButton = async (e: PointerEvent) => {
    if ((<HTMLElement>e.target).className !== 'product-purchase-button') {
      return;
    }

    const parentList = (<HTMLElement>e.target).closest('li');
    const productName = (<HTMLInputElement>parentList.querySelector('.product-name')).textContent;
    const $productAmount = <HTMLInputElement>parentList.querySelector('.product-amount');
    const productAmount = $productAmount.textContent;

    if (await throwableFunctionHandler(() => vendingMachine.purchaseProduct(productName))) {
      $productAmount.textContent = (Number(productAmount) - 1).toString();
      this.noticeStateChanged();
    }
  };

  addProductItem(product: Product) {
    const fragment = new DocumentFragment();
    const li = document.createElement('li');
    const productItemComponent = new ProductItemComponent(product);

    li.insertAdjacentHTML('beforeend', productItemComponent.render());
    fragment.appendChild(li);
    this.$productList.appendChild(fragment);
  }

  refreshComponent = () => {
    const products = vendingMachine.getProducts();

    products.forEach(product => {
      this.addProductItem(product);
    });
  };

  render = () => {
    this.parentElement.insertAdjacentHTML('beforeend', this.template());
    this.bindEvent();
  };

  private template = () => `
  <section id="product-list-container">
    <div id="product-list-wrapper" class="single-input-container">
      <h4>구매 가능 상품 현황</h4>
      <ul id="product-list">
        <li class="list-header">
          <span>상품명</span>
          <span>가격</span>
          <span>수량</span>
          <span>구매</span>
        </li>
      </ul>
    </div>
  </section>`;
}

export default ProductListComponent;
