import { $ } from '../../utils/dom';
import ProductAdditionUI from './ProductAdditionUI';
import ProductInventoryUI from './ProductInventoryUI';

export default class ProductManagementUI {
  constructor(productDomain) {
    this.productDomain = productDomain;
  }

  render() {
    $('#main-content').innerHTML = this.template();
    this.bindDOM();
  }

  template() {
    return `
      <section class="product-addition">
        <h2 hidden>추가할 상품 입력</h2>
        <form class="product-addition__form">
          <label
            class="product-addition__description input-description"
            for="product-name"
          >
            추가할 상품 정보를 입력해주세요.
          </label>
          <input
            id="product-name"
            class="product-addition__input"
            placeholder="상품명"
          />
          <input
            type="number"
            class="product-addition__input"
            placeholder="가격"
          />
          <input
            type="number"
            class="product-addition__input"
            placeholder="수량"
          />
          <button class="product-addition__button submit-button">추가</button>
        </form>
      </section>
      <section class="product-inventory">
        <h2 class="product-inventory__title section-title">상품 현황</h2>
        <div class="product-inventory__container grid-container"></div>
      </section>
    `;
  }

  bindDOM() {
    new ProductAdditionUI(this.productDomain);
    new ProductInventoryUI(this.productDomain);
  }
}
