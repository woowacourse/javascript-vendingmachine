import { on } from '../utils/event.js';
import { SECTION_CONTAINER } from '../constants/constants.js';
import PurchaseAmount from '../models/PurchaseAmount.ts';
import ProductPurchaseView from '../views/ProductPurchaseView.js';

export default class ProductPurchase {
  constructor() {
    this.purchaseAmount = new PurchaseAmount();
    this.productPurchaseView = new ProductPurchaseView();

    on(SECTION_CONTAINER, '@purchase', this.#handlePurchaseAmount.bind(this));
  }

  initPurchase() {
    this.productPurchaseView.initPurchaseDom();
    // 금액란
    this.productPurchaseView.renderTotalAmount(this.purchaseAmount.getAmount());
    // 상품 리스트
    // 보유 동전
  }

  #handlePurchaseAmount(e) {
    const { inputAmount } = e.detail;
    this.purchaseAmount.addAmount(inputAmount);
    this.productPurchaseView.renderTotalAmount(this.purchaseAmount.getAmount());
  }
}
