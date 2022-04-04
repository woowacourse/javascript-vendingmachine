import { on } from '../utils/event.js';
import { SECTION_CONTAINER } from '../constants/constants.js';
import PurchaseAmountModel from '../models/PurchaseAmount.ts';
import ReturnedCoinModel from '../models/ReturnedCoin.ts';
import ProductPurchaseView from '../views/ProductPurchaseView.js';

export default class ProductPurchase {
  constructor(product, coin) {
    this.productModel = product;
    this.coinModel = coin;
    this.purchaseAmountModel = new PurchaseAmountModel();
    this.returnedCoinModel = new ReturnedCoinModel();
    this.productPurchaseView = new ProductPurchaseView();

    on(SECTION_CONTAINER, '@purchase', this.#handlePurchaseAmount.bind(this));
  }

  initPurchase() {
    this.productPurchaseView.initPurchaseDom();
    this.productPurchaseView.renderTotalAmount(this.purchaseAmountModel.getAmount());
    const products = this.productModel.getProducts();
    if (products.length > 0) {
      this.productPurchaseView.renderProducts(products);
    }
    this.productPurchaseView.renderReturnedCoin(this.returnedCoinModel.getReturnedCoin());
  }

  #handlePurchaseAmount(e) {
    const { inputAmount } = e.detail;
    this.purchaseAmountModel.addAmount(inputAmount);
    this.productPurchaseView.renderTotalAmount(this.purchaseAmountModel.getAmount());
    this.productPurchaseView.resetAmountInput();
  }
}
