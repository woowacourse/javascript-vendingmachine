import { $, replaceHTML } from '../../utils/dom';
import CoinHoldingsUI from './CoinHoldingsUI';

export default class CoinChargeUI {
  constructor(productDomain) {
    this.productDomain = productDomain;
  }

  render() {
    replaceHTML($('#main-content'), this.template());
    this.bindDOM();
  }

  template() {
    return `
      <section class="coin-charge input-section">
        <h2 hidden>충전할 금액 입력</h2>
        <form class="coin-charge__form">
          <label
            class="coin-charge__description input-description"
            for="cash-amount"
          >
            자판기가 보유할 금액을 입력해주세요.
          </label>
          <input
            id="cash-amount"
            class="coin-charge__input"
            placeholder="금액"
          />
          <button class="coin-charge__button submit-button">충전</button>
        </form>
        <p class="coin-charge__total-cash-description">현재 보유 금액: <span class="coin-charge__total-cash">0</span>원</p>
      </section>
      <section class="coin-holdings">
        <h2 class="coin-holdings__title section-title">자판기가 보유한 동전</h2>
        <div class="coin-holdings__container grid-container"></div>
      </section>
    `;
  }

  bindDOM() {
    new CoinHoldingsUI();
  }
}
