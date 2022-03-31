import { MESSAGE } from '../../constants';
import { $, replaceHTML } from '../../utils/dom';
import { viewPainter } from '../ViewPainter';

export default class ProductStatusUI {
  private $container: HTMLElement;
  private productDomain;
  private purchaseCashDomain;

  constructor(productDomain, purchaseCashDomain) {
    this.$container = $('.product-status__container');
    this.productDomain = productDomain;
    this.purchaseCashDomain = purchaseCashDomain;
    this.render();
    this.$container.addEventListener('click', this.purchaseButtonClickHandler);
  }

  render() {
    replaceHTML(this.$container, this.template());
  }

  private template() {
    const { products } = this.productDomain;
    const baseTemplate = `
      <div class="product-status__item grid-item grid-header">
        상품명
      </div>
      <div class="product-status__item grid-item grid-header">
        가격(원)
      </div>
      <div class="product-status__item grid-item grid-header">
        수량
      </div>
      <div class="product-status__item grid-item grid-header"></div>
    `;
    const productsTemplate = products
      .map(product => {
        const { name, price, quantity } = product.product;
        if (quantity <= 0) return '';
        return `
          <div class="product-status__item grid-item">${name}</div>
          <div class="product-status__item grid-item">${price}</div>
          <div class="product-status__item grid-item">${quantity}</div>
          <div class="product-status__item grid-item">
            <button
              type="button"
              title="구매"
              data-product-name="${name}"
              data-product-price=${price}
              data-product-quantity=${quantity}
              class="product-status__button product-status__edit-button grid-button"
            >
              구매
            </button>
          </div>
        `;
      })
      .join('');

    return baseTemplate + productsTemplate;
  }

  private purchaseButtonClickHandler = (e: MouseEvent) => {
    const { target } = e;
    if (!(target instanceof HTMLButtonElement)) return;

    const { productName, productPrice, productQuantity } = target.dataset;

    if (this.purchaseCashDomain.cash < productPrice) {
      alert(MESSAGE.ERROR_LACK_CASH);
      return;
    }

    this.productDomain.editProduct(productName, {
      name: productName,
      price: productPrice,
      quantity: Number(productQuantity) - 1,
    });
    this.purchaseCashDomain.addCash(-productPrice);

    viewPainter.renderPurchaseCash();
    this.render();
  };
}
