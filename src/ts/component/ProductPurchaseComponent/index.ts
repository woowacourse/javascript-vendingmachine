import MoneyManagement from '../../domain/MoneyManagement';
import ProductManagement from '../../domain/ProductManagement';
import { $, replaceHTML } from '../../utils/dom';
import MoneyChargeComponent from './MoneyChargeComponent';
import ProductMenuComponent from './ProductMenuComponent';

export default class ProductPurchaseComponent {
  #productManagement: ProductManagement;
  #moneyManagement: MoneyManagement;

  constructor(
    productManagement: ProductManagement,
    moneyManagement: MoneyManagement,
  ) {
    this.#productManagement = productManagement;
    this.#moneyManagement = moneyManagement;
  }

  render() {
    replaceHTML($('#main-content'), this.template());
    this.bindDOM();
  }

  private template() {
    return `
      <div>
        <section class="money-charge input-section">
          <h2 hidden>충전할 금액 입력</h2>
          <form class="money-charge__form">
            <label
              class="money-charge__description input-description"
              for="cash-amount"
            >
              자판기가 보유할 금액을 입력해주세요.
            </label>
            <input
              type="number"
              id="cash-amount"
              class="money-charge__input"
              placeholder="금액"
              name="moneyInput"
            />
            <button class="money-charge__button submit-button">충전</button>
          </form>
          <p class="money-charge__total-cash-description">현재 보유 금액: <span class="money-charge__total-money">${
            this.#moneyManagement.money
          }</span>원</p>
        </section>
        <section class="product-menu">
          <h2 class="product-menu__title section-title">구매 가능상품 현황</h2>
          <div class="product-menu__container grid-container"></div>
        </section>
        <section class="coin-return"></section>
      </div>
    `;
  }

  private bindDOM() {
    new MoneyChargeComponent(this.#moneyManagement);
    new ProductMenuComponent(this.#productManagement, this.#moneyManagement);
  }
}
