import { $, replaceHTML } from '../../utils/dom';
import MoneyChargeComponent from './MoneyChargeComponent';

export default class ProductPurchaseComponent {
  #moneyManagement;

  constructor(moneyManagement) {
    this.#moneyManagement = moneyManagement;
  }

  render() {
    replaceHTML($('#main-content'), this.template());
    this.bindDOM();
  }

  private template() {
    return `
      <div>
        <section class="money-charge">
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
        <section class="product-menu"></section>
        <section class="coin-return"></section>
      </div>
    `;
  }

  private bindDOM() {
    new MoneyChargeComponent(this.#moneyManagement);
  }
}
