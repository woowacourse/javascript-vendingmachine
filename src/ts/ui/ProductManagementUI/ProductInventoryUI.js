import { viewPainter } from '../../..';
import { MESSAGE } from '../../constants';
import { $, $$, replaceHTML } from '../../utils/dom';
import { validateProductInfo } from '../../utils/validator';

export default class ProductInventoryUI {
  constructor(productDomain) {
    this.$container = $('.product-inventory__container');
    this.productDomain = productDomain;
    this.render();
    this.bindEvents();
  }

  bindEvents() {
    this.$container.addEventListener('click', ({ target }) => {
      if (target.tagName !== 'BUTTON') return;

      switch (target.innerText) {
        case '수정':
          this.activateEditMode(target);
          break;
        case '확인':
          this.finishEditMode(target);
          break;
        case '삭제':
          const { productName } = target.dataset;
          if (!confirm(`🥤${productName}🥤${MESSAGE.CONFIRM_DELETE_PRODUCT}`))
            return;
          this.deleteProduct(productName);
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
    const prevProductName = $button.dataset.productName;

    const $$inputs = $$(`input[data-product-name="${prevProductName}"]`);

    const product = {
      name: $$inputs[0].value,
      price: $$inputs[1].valueAsNumber,
      quantity: $$inputs[2].valueAsNumber,
    };

    try {
      const products = this.productDomain.products;
      validateProductInfo(products, product, prevProductName);
    } catch ({ message }) {
      alert(message);
      return;
    }

    this.productDomain.editProduct($button.dataset.productName, product);
    this.deactivateEditMode($button);
    // viewPainter.renderProducts();
  }

  deleteProduct(productName) {
    const $$tableRow = $$(`div[data-product-name="${productName}"]`);
    $$tableRow.forEach($item => $item.remove());
  }

  render() {
    replaceHTML(this.$container, this.template());
  }

  template() {
    const products = this.productDomain.products;
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
          <div class="product-inventory__item grid-item" data-product-name="${name}">
            <input class="product-inventory__input" value="${name}" data-product-name="${name}" readonly />
          </div>
          <div class="product-inventory__item grid-item" data-product-name="${name}">
            <input type="number" class="product-inventory__input" value="${price}" data-product-name="${name}" readonly />
          </div>
          <div class="product-inventory__item grid-item" data-product-name="${name}">
            <input type="number" class="product-inventory__input" value="${quantity}" data-product-name="${name}" readonly />
          </div>
          <div class="product-inventory__item grid-item" data-product-name="${name}">
            <button
              type="button"
              data-product-name="${name}"
              class="product-inventory__button product-inventory__edit-button grid-button"
            >
              수정
            </button>
          </div>
          <div class="product-inventory__item grid-item" data-product-name="${name}">
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
