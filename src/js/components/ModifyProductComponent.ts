import vendingMachine from '../model/VendingMachine';
import ProductItemComponent from './ProductItemComponent';
import { Product } from '../interfaces/VendingMachine.interface';
import throwableFunctionHandler from '../utils/throwableFunctionHandler';

class ModifyProductComponent {
  name: string;
  price: number;
  amount: number;
  parentElement: HTMLElement;
  $productList: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
  }

  bindEvent = () => {
    this.$productList = this.parentElement.querySelector('#product-list');
    this.$productList.addEventListener('click', this.onSubmitModifyCompleteButton);
  };

  private onSubmitModifyCompleteButton = async (e: PointerEvent) => {
    if ((<HTMLElement>e.target).className !== 'product-modify-submit-button') {
      return;
    }

    const ul = (<HTMLElement>e.target).closest('ul');
    const parentList = (<HTMLElement>e.target).closest('li');
    const product = {
      name: (<HTMLInputElement>parentList.querySelector('.product-name-modify-input')).value,
      price: parseInt((<HTMLInputElement>parentList.querySelector('.product-price-modify-input')).value),
      amount: parseInt((<HTMLInputElement>parentList.querySelector('.product-amount-modify-input')).value),
    };

    const prevName = (<HTMLElement>parentList.querySelector('.product-modify-submit-button')).dataset.name;

    if (await throwableFunctionHandler(() => vendingMachine.modifyProduct(prevName, product))) {
      ul.replaceChild(this.replaceList(product, ProductItemComponent), parentList);
    }
  };

  private replaceList = (product: Product, component: Function) => {
    const fragment = new DocumentFragment();
    const li = document.createElement('li');

    li.insertAdjacentHTML('beforeend', component(product, true));
    fragment.appendChild(li);

    return fragment;
  };

  render = (product: Product) => {
    this.name = product.name;
    this.price = product.price;
    this.amount = product.amount;
    return this.template();
  };

  private template = () => `
    <span>
      <input
      type="text"
      class="product-name-modify-input"
      value="${this.name}"
      placeholder="상품명"
      required
      />
    </span>
    <span>
      <input
      type="text"
      class="product-price-modify-input"
      value="${this.price}"
      placeholder="가격"
      required
      />
    </span>
    <span>
      <input
      type="text"
      class="product-amount-modify-input"
      value="${this.amount}"
      placeholder="수량"
      required
      />  
    </span>
    <span>
      <button type="button" class="product-modify-submit-button" data-name="${this.name}">
        확인
      </button>
    </span>
  `;
}

export default ModifyProductComponent;
