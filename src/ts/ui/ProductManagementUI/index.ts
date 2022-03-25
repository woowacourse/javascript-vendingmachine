import { $, replaceHTML } from '../../utils/dom';
import { viewPainter } from '../ViewPainter';
import ProductAdditionUI from './ProductAdditionUI';
import ProductInventoryUI from './ProductInventoryUI';

export default class ProductManagementUI {
  private productDomain;

  constructor(productDomain) {
    this.productDomain = productDomain;
  }

  render() {
    replaceHTML($('#main-content'), this.template());
    this.bindDOM();
  }

  private template() {
    return `
      <section class="product-addition input-section">
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
            name="name"
            placeholder="상품명"
          />
          <input
            type="number"
            class="product-addition__input"
            name="price"
            placeholder="가격"
          />
          <input
            type="number"
            class="product-addition__input"
            name="quantity"
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

  private bindDOM() {
    new ProductAdditionUI(this.productDomain);
    const productInventoryUI = new ProductInventoryUI(this.productDomain);
    viewPainter.productInventoryUI = productInventoryUI;
  }
}
