import ProductStatusUI from './ProductStatusUI';
import PurchaseCashChargeUI from './PurchaseCashChargeUI';
import ReturnCoinUI from './ReturnCoinUI';
import { $, replaceHTML } from '../../../utils/dom';
import { viewPainter } from '../../ViewPainter';

export default class ProductPurchaseUI {
  private readonly productDomain;
  private readonly coinDomain;
  private readonly purchaseCashDomain;

  constructor(productDomain, coinDomain, purchaseCashDomain) {
    this.productDomain = productDomain;
    this.coinDomain = coinDomain;
    this.purchaseCashDomain = purchaseCashDomain;
  }

  render() {
    replaceHTML($('#main-content'), this.template());
    this.bindDOM();
  }

  private template() {
    return `
      <section class="purchase-cash-charge input-section">
        <h2 hidden>구매할 금액 투입</h2>
        <form class="purchase-cash-charge__form">
          <label
            class="purchase-cash-charge__description input-description"
            for="cash-amount"
          >
            상품을 구매할 금액을 투입해주세요.
          </label>
          <input
            type="number"
            id="cash-amount"
            class="purchase-cash-charge__input"
            placeholder="금액"
            name="cashInput"
          />
          <button class="purchase-cash-charge__button submit-button">투입</button>
        </form>
        <p class="purchase-cash-charge__total-cash-description">현재 보유 금액: <span class="purchase-cash-charge__total-cash">${this.purchaseCashDomain.cash}</span>원</p>
      </section>
      <section class="product-status">
        <h2 class="product-status__title section-title">구매 가능 상품 현황</h2>
        <div class="product-status__container grid-container"></div>
      </section>
      <section class="return-coin">
        <h2 class="return-coin__title section-title">잔돈 반환</h2>
        <div class="return-coin__container grid-container"></div>
        <button class="return-coin__button">반환</button>
      </section>
    `;
  }

  private bindDOM() {
    const purchaseCashChargeUI = new PurchaseCashChargeUI(
      this.purchaseCashDomain,
    );
    new ProductStatusUI(this.productDomain, this.purchaseCashDomain);
    new ReturnCoinUI(this.coinDomain, this.purchaseCashDomain);
    viewPainter.purchaseCashChargeUI = purchaseCashChargeUI;
  }
}
