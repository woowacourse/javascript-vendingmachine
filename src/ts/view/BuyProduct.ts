import { DomainView, VendingMachine, Product, ProductName } from '../../index.d';
import { $ } from '../util/index';
import VendingMachineImpl from '../interactor/VendingMachineImpl';
import Snackbar from './Snackbar';

export default class BuyProduct implements DomainView {
  private $buyPriceForm: HTMLElement;
  private $buyPriceInput: HTMLElement;
  private $totalBuyPrice: HTMLElement;
  private $productContainer: HTMLElement;
  private $returnCoin500: HTMLElement;
  private $returnCoin100: HTMLElement;
  private $returnCoin50: HTMLElement;
  private $returnCoin10: HTMLElement;
  private $returnChangeButton: HTMLElement;
  private vendingMachine: VendingMachine;
  private snackbar: Snackbar;

  constructor(snackbar: Snackbar) {
    this.$buyPriceForm = $('#buy-price-form');
    this.$buyPriceInput = $('#buy-price-input');
    this.$totalBuyPrice = $('#total-buy-price');
    this.$productContainer = $('#available-product-list');
    this.$returnCoin500 = $('#return-coin-500-count');
    this.$returnCoin100 = $('#return-coin-100-count');
    this.$returnCoin50 = $('#return-coin-50-count');
    this.$returnCoin10 = $('#return-coin-10-count');
    this.$returnChangeButton = $('#return-change-button');
    this.vendingMachine = VendingMachineImpl.getInstance();
    this.snackbar = snackbar;
  }

  render(): void {
    const template = this.vendingMachine.productCollection.products
      .map(
        ({ name, price, quantity }: Product) =>
          `<tr class="product-info">
          <td class="product-info__text name">${name}</td>
          <td class="product-info__text price">${price}</td>
          <td class="product-info__text quantity">${quantity}</td>
          <td>
            <button class="buy-button gray-button button" data-name="${name}">구매</button>
          </td>
        </tr>`,
      )
      .join('');
    this.$productContainer.replaceChildren();
    this.$productContainer.insertAdjacentHTML('beforeend', template);
  }

  bindEvent(): void {
    this.$buyPriceForm.addEventListener('submit', this.handleSubmitForm.bind(this));
    this.$productContainer.addEventListener('click', this.handleClickBuyButton.bind(this));
    this.$returnChangeButton.addEventListener('click', this.handleClickReturnButton.bind(this));
  }

  private handleSubmitForm(e: Event): void {
    e.preventDefault();

    try {
      const userInputMoney = Number((this.$buyPriceInput as HTMLInputElement).value);

      this.vendingMachine.chargeUserMoney(userInputMoney);
      this.renderTotalBuyPrice();
    } catch ({ message }) {
      this.snackbar.on(message);
    }
  }

  private handleClickBuyButton(e: Event): void {
    try {
      const productName = (e.target as HTMLElement).dataset.name as unknown as ProductName;

      this.vendingMachine.buyProduct(productName);
      this.render();
      this.renderTotalBuyPrice();
    } catch ({ message }) {
      this.snackbar.on(message);
    }
  }

  private handleClickReturnButton(): void {
    const changeCoins = this.vendingMachine.returnChangeCoins();

    this.$returnCoin10.innerText = `${changeCoins[10]}개`;
    this.$returnCoin50.innerText = `${changeCoins[50]}개`;
    this.$returnCoin100.innerText = `${changeCoins[100]}개`;
    this.$returnCoin500.innerText = `${changeCoins[500]}개`;
    this.renderTotalBuyPrice();
  }

  private renderTotalBuyPrice(): void {
    this.$totalBuyPrice.innerText = String(this.vendingMachine.totalUserInputMoney);
  }
}