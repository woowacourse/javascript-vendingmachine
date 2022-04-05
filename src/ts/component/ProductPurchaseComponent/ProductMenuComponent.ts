import MoneyManagement from '../../domain/MoneyManagement';
import ProductManagement from '../../domain/ProductManagement';
import { insertNBSP, removeNBSP, showSnackbar } from '../../utils';
import { $, $$, replaceHTML } from '../../utils/dom';

export default class ProductMenuComponent {
  private $container: HTMLElement;
  #productManagement: ProductManagement;
  #moneyManagement: MoneyManagement;

  constructor(
    productManagement: ProductManagement,
    moneyManagement: MoneyManagement,
  ) {
    this.$container = $('.product-menu__container');
    this.#productManagement = productManagement;
    this.#moneyManagement = moneyManagement;
    this.render();
    this.$container.addEventListener('click', this.purchaseHandler);
  }

  render() {
    replaceHTML(this.$container, this.template());
  }

  private template() {
    const { products } = this.#productManagement;
    const baseTemplate = `
      <div class="product-menu__item grid-item grid-header">
        상품명
      </div>
      <div class="product-menu__item grid-item grid-header">
        가격(원)
      </div>
      <div class="product-menu__item grid-item grid-header">
        수량
      </div>
      <div class="product-menu__item grid-item grid-header">
        구매
      </div>
    `;

    const productsTemplate = products
      .map(product => {
        const { name, price, quantity } = product.product;
        return `
          <div class="product-menu__item grid-item" data-product-name="${insertNBSP(
            name,
          )}">
            ${name}
          </div>
          <div class="product-menu__item grid-item" data-product-name="${insertNBSP(
            name,
          )}">
            ${price}
          </div>
          <div class="product-menu__item grid-item item-quantity" data-product-name="${insertNBSP(
            name,
          )}">
            ${quantity}
          </div>
          <div class="product-menu__item grid-item" data-product-name="${insertNBSP(
            name,
          )}">
            <button
              type="button"
              data-product-name="${insertNBSP(name)}"
              class="product-menu__button product-menu__edit-button grid-button"
            >
              구매
            </button>
          </div>
        `;
      })
      .join('');

    return baseTemplate + productsTemplate;
  }

  private purchaseHandler = (e: MouseEvent) => {
    const { target } = e;
    if (!(target instanceof HTMLButtonElement)) return;

    this.purchaseProduct(target);
  };

  purchaseProduct($button) {
    const productName: string = removeNBSP($button.dataset.productName);

    const selectedProduct = this.#productManagement.products.find(
      product => product.name === productName,
    );

    if (this.#moneyManagement.money < selectedProduct.price) {
      showSnackbar(
        `금액이 부족하여 🥤${productName}🥤을(를) 구매할 수 없습니다.`,
      );
      return;
    }

    this.#productManagement.buyProduct(productName);
    this.#moneyManagement.subtractMoney(selectedProduct.price);

    $('.money-charge__total-money').innerText = String(
      this.#moneyManagement.money,
    );

    if (selectedProduct.quantity === 0) {
      $$(`[data-product-name=${$button.dataset.productName}`).forEach(el =>
        el.remove(),
      );
      return;
    }
    $(
      `.item-quantity[data-product-name=${$button.dataset.productName}`,
    ).innerText = String(selectedProduct.quantity);
  }
}
