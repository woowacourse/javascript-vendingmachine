import { $ } from '../util/dom';
import { ProductBuy } from './declaration';
import { Product, Coin } from '../resource/declaration';
import { isValidInputMoney } from '../validation/isValidInputMoney';

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
        this.drawProductList.bind(this),
      );

      $('#charge-money-form', this.$buy).addEventListener(
        'submit',
        this.handleChargeMoney.bind(this),
      );
    });
  }

  handleChargeMoney(e) {
    e.preventDefault();

    const inputMoney = Number($('#charge-money-input', this.$buy).value);

    if (isValidInputMoney(inputMoney)) {
      this.totalMoney += inputMoney;
      $(
        '.input-money-indicator',
      ).textContent = `투입한 금액: ${this.totalMoney}원`;
    }
  }

  chargeMoney(coinList: number[]): void {}

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

  drawCoins(): void {}
}

export default ProductBuyImpl;
