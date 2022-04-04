import { $ } from '../util/dom';
import { ProductBuy } from './declaration';
import { Product, Coin } from '../resource/declaration';
import { isValidInputMoney } from '../validation/isValidInputMoney';
import { canBuyProduct } from '../validation/isValidProductInfo';

class ProductBuyImpl implements ProductBuy {
  private coins: Array<Coin>;
  private products: Array<Product>;
  $buy: Document;
  totalMoney: number;

  constructor(products: Array<Product>, coins: Array<Coin>) {
    this.products = products;
    this.coins = coins;
    this.totalMoney = 0;
    this.$buy = $('.buy');

    window.addEventListener('load', () => {
      $('#tab__buy-button').addEventListener(
        'click',
        this.updateResources.bind(this),
      );
      $('#charge-money-form', this.$buy).addEventListener(
        'submit',
        this.handleChargeMoney.bind(this),
      );
      $('#product-list', this.$buy).addEventListener(
        'click',
        this.handleBuyProduct.bind(this),
      );
      $('.return-button', this.$buy).addEventListener(
        'click',
        this.returnMoney.bind(this),
      );
    });
  }

  updateResources() {
    console.log('click');
    this.drawProductList();
    this.drawCoins();
  }

  handleChargeMoney(e) {
    e.preventDefault();
    const inputMoney = Number($('#charge-money-input', this.$buy).value);

    if (isValidInputMoney(inputMoney)) {
      this.totalMoney += inputMoney;
      this.drawTotoalMoney();
    }
  }

  handleBuyProduct(e) {
    if (!e.target.classList.contains('buy-button')) {
      return;
    }
    const productInfo = this.getProductInfoModify(e.target.closest('tr'));
    const index = this.getProductIndex(productInfo.name);
    if (canBuyProduct(productInfo, this.totalMoney)) {
      this.modifyProduct(productInfo, index);
      this.drawProductList();
    }
  }

  returnMoney(): void {
    for (let i = this.coins.length - 1; i > 0; i--) {
      while (
        this.totalMoney >= this.coins[i].amount &&
        this.coins[i].count >= 1
      ) {
        this.totalMoney -= this.coins[i].amount;
        this.coins[i].count -= 1;
      }
    }
    this.drawCoins();
    this.drawTotoalMoney();
  }

  drawProductList(): void {
    console.log(this.products);
    const template = this.products
      .map(
        ({ name, price, quantity }: Product) =>
          `<tr class="product-info">
          <td class="product-info__text">${name}</td>
          <td class="product-info__text">${price}</td>
          <td class="product-info__text">${quantity}</td>
          <td class="product-info__input"><input type="text" minlength="1" maxlength="10" required="required" class="product-info-name" value="${name}" /></td>
          <td class="product-info__input"><input type="number" max="10000" min="100" required="required" class="product-info-price" value="${price}" /></td>
          <td class="product-info__input"><input type="number" max="20" min="1" required="required" class="product-info-quantity" value="${quantity}" /></td>
          <td>
            <button class="buy-button button">구매</button>
          </td>
        </tr>`,
      )
      .join('');
    $('#product-list', this.$buy).replaceChildren();
    $('#product-list', this.$buy).insertAdjacentHTML('beforeend', template);
  }

  drawCoins(): void {
    console.log(this.coins);
    this.coins.forEach(({ amount, count }) => {
      $(`#coin-${amount}-count`, this.$buy).innerText = `${count}개`;
    });
  }

  drawTotoalMoney(): void {
    $(
      '.input-money-indicator',
    ).textContent = `투입한 금액: ${this.totalMoney}원`;
  }

  getProductInfoModify(productNode) {
    const name = $('.product-info-name', productNode).value;
    const price = Number($('.product-info-price', productNode).value);
    const quantity = Number($('.product-info-quantity', productNode).value);

    return { name, price, quantity };
  }

  getProductRowIndex(productRow) {
    return [...$('#product-list').childNodes].findIndex(
      row => row === productRow,
    );
  }

  getProductIndex(name: string) {
    return this.products.findIndex((product: Product) => product.name === name);
  }

  modifyProduct({ price, quantity }: Product, index: number): void {
    quantity -= 1;
    this.totalMoney -= price;
    this.drawTotoalMoney();
  }
}

export default ProductBuyImpl;
