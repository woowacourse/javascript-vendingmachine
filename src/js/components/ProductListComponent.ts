import vendingMachine from '../model/VendingMachine';
import ModifyProductComponent from './ModifyProductComponent';
import ProductItemComponent from './ProductItemComponent';
import { Product } from '../interfaces/VendingMachine.interface';
import { REMOVE_CONFIRM_MESSAGE } from '../constants';
import throwableFunctionHandler from '../utils/throwableFunctionHandler';

class ProductListComponent {
  ModifyProductComponent: ModifyProductComponent;
  parentElement: HTMLElement;
  noticeStateChanged: Function;
  $productList: HTMLElement;

  constructor(parentElement: HTMLElement, noticeStateChanged: Function) {
    this.parentElement = parentElement;
    this.noticeStateChanged = noticeStateChanged;
    this.ModifyProductComponent = new ModifyProductComponent(parentElement);
  }

  private bindEvent = () => {
    this.$productList = this.parentElement.querySelector('#product-list');
    this.$productList.addEventListener('click', this.onClickModifyButton);
    this.$productList.addEventListener('click', this.onClickRemoveButton);
  };

  private onClickModifyButton = (e: PointerEvent) => {
    if ((<HTMLElement>e.target).className !== 'product-modify-button') {
      return;
    }

    const ul = (<HTMLElement>e.target).closest('ul');
    const oldLi = (<HTMLElement>e.target).closest('li');
    const product = {
      name: (<HTMLElement>oldLi.querySelector('.product-name')).textContent,
      price: parseInt((<HTMLElement>oldLi.querySelector('.product-price')).textContent),
      amount: parseInt((<HTMLElement>oldLi.querySelector('.product-amount')).textContent),
    };

    ul.replaceChild(this.replaceList(product, this.ModifyProductComponent.render), oldLi);
    this.ModifyProductComponent.bindEvent();
  };

  private onClickRemoveButton = (e: PointerEvent) => {
    if ((<HTMLElement>e.target).className !== 'product-remove-button') {
      return;
    }

    if (!window.confirm(REMOVE_CONFIRM_MESSAGE)) {
      return;
    }

    const parentList = (<HTMLElement>e.target).closest('li');
    const name = (<HTMLElement>parentList.querySelector('.product-name')).textContent;

    if (throwableFunctionHandler(() => vendingMachine.removeProduct(name))) {
      parentList.remove();
    }
  };

  private replaceList = (product: Product, component: Function) => {
    const fragment = new DocumentFragment();
    const li = document.createElement('li');

    li.insertAdjacentHTML('beforeend', component(product));
    fragment.appendChild(li);

    return fragment;
  };

  addProductItem(product: Product) {
    const fragment = new DocumentFragment();
    const li = document.createElement('li');

    li.insertAdjacentHTML('beforeend', ProductItemComponent(product, true));
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
    <div id="product-list-wrapper">
      <h4>상품 현황</h4>
      <ul id="product-list">
        <li class="list-header">
          <span>상품명</span>
          <span>가격</span>
          <span>수량</span>
          <span></span>
        </li>
      </ul>
    </div>
  </section>`;
}

export default ProductListComponent;
