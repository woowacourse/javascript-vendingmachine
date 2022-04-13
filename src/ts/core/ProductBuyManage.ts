import { $ } from '../utils/dom';
import { ProductBuy } from '../declarations/coreDeclaration';
import { Product, Coin } from '../declarations/resourceDeclaration';
import { renderCoins, renderProductList, renderTotalMoney } from '../views/render';
import { getProductInfoModify, getProductIndex } from '../utils/productUtil';
import VerifyValueValidation from '../validations/verifyValueValidation';

class ProductBuyManage implements ProductBuy {
  private coins: Array<Coin>;
  private products: Array<Product>;
  $buy: Document;
  totalMoney: number;
  verifyValue: VerifyValueValidation;

  constructor(products: Array<Product>, coins: Array<Coin>, verifyValue: VerifyValueValidation) {
    this.verifyValue = verifyValue;
    this.products = products;
    this.coins = coins;
    this.totalMoney = 0;
    this.$buy = $('.app__main.buy');

    window.addEventListener('load', () => {
      $('#tab__buy-button').addEventListener('click', this.updateResources.bind(this));
      $('#input-money-form', this.$buy).addEventListener(
        'submit',
        this.handleChargeMoney.bind(this),
      );
      $('#product-list', this.$buy).addEventListener('click', this.handleBuyProduct.bind(this));
      $('.return-button', this.$buy).addEventListener('click', this.handleReturnMoney.bind(this));
    });
  }

  updateResources() {
    renderProductList.call(this, this.$buy);
    renderCoins.call(this);
  }

  handleChargeMoney(e) {
    e.preventDefault();
    const inputMoney = Number($('#input-money-input', this.$buy).value);

    if (this.verifyValue.verifyInputMoney(inputMoney)) {
      $('#input-money-input', this.$buy).value = '';
      this.totalMoney += inputMoney;
      renderTotalMoney.call(this);
    }
  }

  handleBuyProduct(e) {
    if (!e.target.classList.contains('buy-button')) {
      return;
    }
    const productInfo = getProductInfoModify.call(this, e.target.closest('tr'));
    const index = getProductIndex.call(this, productInfo.name);
    if (this.verifyValue.canBuyProduct(productInfo, this.totalMoney)) {
      this.saleProduct(productInfo, index);
      renderProductList.call(this, this.$buy);
    }
  }

  handleReturnMoney(): void {
    for (let i = this.coins.length - 1; i >= 0; i--) {
      while (this.totalMoney >= this.coins[i].amount && this.coins[i].count >= 1) {
        this.totalMoney -= this.coins[i].amount;
        this.coins[i].count -= 1;
      }
    }
    renderCoins.call(this);
    renderTotalMoney.call(this);
  }

  saleProduct({ name, price, quantity }: Product, index: number): void {
    quantity -= 1;
    this.totalMoney -= price;
    this.products[index] = { name, price, quantity };
    renderProductList.call(this, this.$buy);
    renderTotalMoney.call(this);
  }
}

export default ProductBuyManage;
