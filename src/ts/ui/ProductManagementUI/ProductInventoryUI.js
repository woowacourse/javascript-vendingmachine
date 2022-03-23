import { viewPainter } from '../../..';
import { $, $$, replaceHTML } from '../../utils/dom';
import { validateProductInfo } from '../../utils/validator';

export default class ProductInventoryUI {
  constructor(productManagementDomain) {
    this.$container = $('.product-inventory__container');
    this.productManagementDomain = productManagementDomain;
    this.render();
    this.bindEvents();
  }

  bindEvents() {
    this.$container.addEventListener('click', e => {
      if (e.target.tagName !== 'BUTTON') return;

      switch (e.target.innerText) {
        case '수정':
          this.activateEditMode(e.target);
          break;
        case '확인':
          this.finishEditMode(e.target);
          break;
        case '삭제':
      }
    });
  }

  activateEditMode($button) {
    $button.innerText = '확인';
    const $$inputs = $$(
      `input[data-product-name="${$button.dataset.productName}"]`,
    );

    $$inputs.forEach($input => {
      $input.removeAttribute('readonly');
    });
  }

  deactivateEditMode($button) {
    $button.innerText = '수정';
    const $$inputs = $$(
      `input[data-product-name="${$button.dataset.productName}"]`,
    );

    $$inputs.forEach($input => {
      $input.setAttribute('readonly', '');
    });
  }

  finishEditMode($button) {
    const $$inputs = $$(
      `input[data-product-name="${$button.dataset.productName}"]`,
    );

    const product = {
      name: $$inputs[0].value,
      price: $$inputs[1].valueAsNumber,
      quantity: $$inputs[2].valueAsNumber,
    };

    try {
      const products = this.productManagementDomain.products;
      validateProductInfo(products, product, true);
    } catch ({ message }) {
      alert(message);
      return;
    }

    this.productManagementDomain.editProduct(
      $button.dataset.productName,
      product,
    );
    this.deactivateEditMode($button);
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
          <div class="product-inventory__item grid-item">
            <input class="product-inventory__input" value="${name}" data-product-name="${name}" readonly />
          </div>
          <div class="product-inventory__item grid-item">
            <input type="number" class="product-inventory__input" value="${price}" data-product-name="${name}" readonly />
          </div>
          <div class="product-inventory__item grid-item">
            <input type="number" class="product-inventory__input" value="${quantity}" data-product-name="${name}" readonly />
          </div>
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
