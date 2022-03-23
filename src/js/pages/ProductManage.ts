import vendingMachine from '../model/VendingMachine';
import { Product } from '../interfaces/VendingMachine.interface';

export default class ProductManage {
  $inputSection: HTMLElement;
  $contentsContainer: HTMLElement;
  $productAddForm: HTMLElement;

  constructor() {
    this.$inputSection = document.querySelector('.input-section');
    this.$contentsContainer = document.querySelector('.contents-container');
  }

  render() {
    this.$inputSection.insertAdjacentHTML('beforeend', this.inputSection());
    this.$contentsContainer.insertAdjacentHTML('beforeend', this.productList());

    this.$productAddForm = document.querySelector('#product-add-form');
    this.$productAddForm.addEventListener('submit', this.onSubmitNewProduct);
  }

  onSubmitNewProduct = (e: SubmitEvent) => {
    e.preventDefault();

    const name = (<HTMLInputElement>(
      this.$productAddForm.querySelector('#product-name-input')
    )).value;
    const price = (<HTMLInputElement>(
      this.$productAddForm.querySelector('#product-price-input')
    )).value;
    const amount = (<HTMLInputElement>(
      this.$productAddForm.querySelector('#product-amount-input')
    )).value;

    const newProduct: Product = {
      name: name,
      price: parseInt(price),
      amount: parseInt(amount),
    };

    vendingMachine.addProduct(newProduct);
  };

  inputSection() {
    return `
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

  productList() {
    return `
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
        <li>
          <span>콜라</span>
          <span>1500</span>
          <span>20</span>
          <span>
            <button type="button" class="product-modify-button">
              수정
            </button>
          </span>
        </li>
        <li>
          <span>사이다</span>
          <span>1000</span>
          <span>10</span>
          <span>
            <button type="button" class="product-modify-button">
              수정
            </button>
          </span>
        </li>
      </ul>
    </div>
  </section>`;
  }
}
