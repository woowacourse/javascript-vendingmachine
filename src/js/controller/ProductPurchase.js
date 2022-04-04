import { on } from '../utils/event.js';
import { SECTION_CONTAINER } from '../constants/constants.js';
import PurchaseAmountModel from '../models/PurchaseAmount.ts';
import ReturnedCoinModel from '../models/ReturnedCoin.ts';
import ProductPurchaseView from '../views/ProductPurchaseView.js';
import { validAffordablePrice } from '../utils/validation.js';

export default class ProductPurchase {
  constructor(product, coin) {
    this.productModel = product;
    this.coinModel = coin;
    this.purchaseAmountModel = new PurchaseAmountModel();
    this.returnedCoinModel = new ReturnedCoinModel();
    this.productPurchaseView = new ProductPurchaseView();

    on(SECTION_CONTAINER, '@purchase', this.#handlePurchaseAmount.bind(this));
    on(SECTION_CONTAINER, '@buy', this.#handleProductPurchase.bind(this));
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

  #handleProductPurchase(e) {
    const { index, product } = e.detail;
    try {
      validAffordablePrice(this.purchaseAmountModel.getAmount(), product.price);
      if (product.quantity === 0) {
        this.productModel.deleteProduct(index);
      } else {
        this.productModel.modifyProduct(index, product);
      }

      this.purchaseAmountModel.deductAmount(product.price);
      this.productPurchaseView.renderTotalAmount(this.purchaseAmountModel.getAmount());
      this.productPurchaseView.renderProducts(this.productModel.getProducts());
    } catch (error) {
      alert(error.message);
    }
  }
}
