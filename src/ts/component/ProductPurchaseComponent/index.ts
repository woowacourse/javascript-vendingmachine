import CoinManagement from '../../domain/CoinManagement';
import MoneyManagement from '../../domain/MoneyManagement';
import ProductManagement from '../../domain/ProductManagement';
import { $, replaceHTML } from '../../utils/dom';
import CoinReturnComponent from './CoinReturnComponent';
import MoneyChargeComponent from './MoneyChargeComponent';
import ProductMenuComponent from './ProductMenuComponent';

export default class ProductPurchaseComponent {
  #productManagement: ProductManagement;
  #coinManagement: CoinManagement;
  #moneyManagement: MoneyManagement;

  constructor(
    readonly productManagement: ProductManagement,
    readonly coinManagement: CoinManagement,
    readonly moneyManagement: MoneyManagement,
  ) {
    this.#productManagement = productManagement;
    this.#moneyManagement = moneyManagement;
    this.#coinManagement = coinManagement;
  }

  render() {
    replaceHTML($('#main-content'), this.#template());
    this.#bindDOM();
  }

  #template() {
    return `
      <section class="money-charge input-section">
        <h2 hidden>투입할 금액 입력</h2>
        <form class="money-charge__form">
          <label
            class="money-charge__description input-description"
            for="cash-amount"
          >
            상품을 구매할 금액을 투입해주세요
          </label>
          <input
            type="number"
            id="cash-amount"
            class="money-charge__input"
            placeholder="금액"
            name="moneyInput"
          />
          <button class="money-charge__button submit-button">투입</button>
        </form>
        <p class="money-charge__total-cash-description">투입한 금액: <span class="money-charge__total-money">${
          this.#moneyManagement.money
        }</span>원</p>
      </section>
      <section class="product-menu">
        <h2 class="product-menu__title section-title">구매 가능상품 현황</h2>
        <div class="product-menu__container grid-container"></div>
      </section>
      <section class="coin-return">
        <h2 class="coin-return__title section-title">잔돈 반환</h2>
        <div class="coin-return__container grid-container"></div>
        <button class="coin-return__button">반환</button>
      </section>
    `;
  }

  #bindDOM() {
    new MoneyChargeComponent(this.#moneyManagement);
    new ProductMenuComponent(this.#productManagement, this.#moneyManagement);
    new CoinReturnComponent(this.#coinManagement, this.#moneyManagement);
  }
}
