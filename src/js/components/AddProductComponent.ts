import vendingMachine from '../model/VendingMachine';
import { Product } from '../interfaces/VendingMachine.interface';
import throwableFunctionHandler from '../utils/throwableFunctionHandler';
import * as Component from './abstractComponents/Component';

class AddProductComponent extends Component.StaticComponent {
  parentElement: HTMLElement;
  noticeStateChanged: Function;
  $productAddForm: HTMLElement;
  $productList: HTMLElement;

  constructor(parentElement: HTMLElement, noticeStateChanged: Function) {
    super();
    this.parentElement = parentElement;
    this.noticeStateChanged = noticeStateChanged;
  }

  protected bindEventAndElement = () => {
    this.$productAddForm = this.parentElement.querySelector('#product-add-form');
    this.$productList = this.parentElement.querySelector('#product-list');

    this.$productAddForm.addEventListener('submit', this.onSubmitNewProduct);
  };

  private onSubmitNewProduct = async (e: SubmitEvent) => {
    e.preventDefault();

    const name = (<HTMLInputElement>this.$productAddForm.querySelector('#product-name-input')).value;
    const price = (<HTMLInputElement>this.$productAddForm.querySelector('#product-price-input')).valueAsNumber;
    const amount = (<HTMLInputElement>this.$productAddForm.querySelector('#product-amount-input')).valueAsNumber;

    const newProduct: Product = { name, price, amount };

    if (await throwableFunctionHandler(() => vendingMachine.addProduct(newProduct))) {
      this.noticeStateChanged('add', newProduct);
    }
  };

  render = () => {
    this.parentElement.insertAdjacentHTML('beforeend', this.template());
    this.bindEventAndElement();
  };

  protected template = () => `
  <div id="product-manage-container">
    <p>추가할 상품 정보를 입력해주세요.</p>
    <form id="product-add-form">
      <input
        type="text"
        id="product-name-input"
        placeholder="상품명"
        required
      />
      <input
        type="number"
        id="product-price-input"
        placeholder="가격"
        required
      />
      <input
        type="number"
        id="product-amount-input"
        placeholder="수량"
        required
      />
      <input type="submit" id="product-add-button" value="추가" />
    </form>
  </div>`;
}

export default AddProductComponent;
