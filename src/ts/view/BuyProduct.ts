import { DomainView, VendingMachine, Product, ProductName } from '../../index.d';
import { $ } from '../util/index';
import VendingMachineImpl from '../interactor/VendingMachineImpl';

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

  constructor() {
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
            <button class="buy-button gray-button button">구매</button>
          </td>
        </tr>`,
      )
      .join('');
    this.$productContainer.replaceChildren();
    this.$productContainer.insertAdjacentHTML('beforeend', template);
  }

  bindEvent(): void {
    this.$buyPriceForm.addEventListener('submit', this.handleSubmitForm.bind(this));
  }

  private handleSubmitForm(e: Event): void {
    e.preventDefault();

    try {
      const userInputMoney = Number((this.$buyPriceInput as HTMLInputElement).value);

      this.vendingMachine.chargeUserMoney(userInputMoney);
      this.$totalBuyPrice.innerText = String(this.vendingMachine.totalUserInputMoney);
    } catch ({ message }) {
      alert(message);
    }
  }
}