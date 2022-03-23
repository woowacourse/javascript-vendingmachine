import { $, replaceHTML } from '../../utils/dom';

export default class ProductInventoryUI {
  constructor(productManagementDomain) {
    this.$container = $('.product-inventory__container');
    this.productManagementDomain = productManagementDomain;
    this.render();
  }

  render() {
    replaceHTML(this.$container, this.template());
  }

  template() {
    const products = this.productManagementDomain.products;
    const baseTemplate = `
      <div class="product-inventory__item grid-item grid-header">
        상품명
      </div>
      <div class="product-inventory__item grid-item grid-header">
        가격(원)
      </div>
      <div class="product-inventory__item grid-item grid-header">
        수량
      </div>
      <div class="product-inventory__item grid-item grid-header"></div>
      <div class="product-inventory__item grid-item grid-header"></div>
    `;

    const productsTemplate = products
      .map(product => {
        const { name, price, quantity } = product.getProduct();
        return `
        <div class="product-inventory__item grid-item">${name}</div>
        <div class="product-inventory__item grid-item">${price}</div>
        <div class="product-inventory__item grid-item">${quantity}</div>
        <div class="product-inventory__item grid-item">
          <button
            type="button"
            data-product-name="${name}"
            class="product-inventory__button product-inventory__edit-button grid-button"
          >
            수정
          </button>
        </div>
        <div class="product-inventory__item grid-item">
          <button
            type="button"
            data-product-name="${name}"
            class="product-inventory__button product-inventory__delete-button grid-button"
          >
            삭제
          </button>
        </div>
        `;
      })
      .join('');

    return baseTemplate + productsTemplate;
  }
}
