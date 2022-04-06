import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../constants';
import { VendingMachineInterface } from '../domain/VendingMachine';
import { $, $$, alertSnackBar } from '../utils';

export interface PurchaseProductViewInterface {
  $purchaseForm: HTMLFormElement;
  $purchaseInput: HTMLInputElement;
  $purchaseMoney: HTMLSpanElement;
  $availableProducts: HTMLTableSectionElement;
  $returnChange: HTMLButtonElement;

  vendingMachine: VendingMachineInterface;

  handleSubmit(event: SubmitEvent): void;
  handlePurchase(event: PointerEvent): void;
  handleReturn(): void;
  renderPurchaseProduct(): void;
  renderReturnCoinTable(decreaseCounts: number[]): void;
  renderAvailableProduct(): void;
}

class PurchaseProductView implements PurchaseProductViewInterface {
  $purchaseForm: HTMLFormElement;
  $purchaseInput: HTMLInputElement;
  $purchaseMoney: HTMLSpanElement;
  $availableProducts: HTMLTableSectionElement;
  $returnChange: HTMLButtonElement;
  $$returnCoins: NodeListOf<HTMLSpanElement>;

  vendingMachine: VendingMachineInterface;

  constructor(vendingMachine) {
    this.$purchaseForm = $('.purchase-form');
    this.$purchaseInput = $('.purchase-input', this.$purchaseForm);
    this.$purchaseMoney = $('.purchase-money', this.$purchaseForm);
    this.$availableProducts = $('.available-products-body');
    this.$returnChange = $('.return-change');
    this.$$returnCoins = $$('.return-coin');

    this.vendingMachine = vendingMachine;

    this.$purchaseForm.addEventListener('submit', this.handleSubmit);
    this.$availableProducts.addEventListener('click', this.handlePurchase);
    this.$returnChange.addEventListener('click', this.handleReturn);
  }

  handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const purchaseMoney = this.$purchaseInput.value;

    try {
      this.vendingMachine.addPurchaseMoney(+purchaseMoney);
      this.renderPurchaseProduct();
      alertSnackBar(`${purchaseMoney}원을 ${SUCCESS_MESSAGE.ADD_PURCHASE_MONEY}`);
    } catch (error) {
      alertSnackBar(error.message);
    }
  };

  handlePurchase = (event: PointerEvent) => {
    const target = <HTMLButtonElement>event.target;

    if (target.classList.contains('purchase-button')) {
      const targetName = target.dataset.name;

      try {
        this.vendingMachine.purchaseProduct(targetName);
        this.renderPurchaseProduct();
        alertSnackBar(SUCCESS_MESSAGE.PURCHASE_PRODUCT);
      } catch (error) {
        alertSnackBar(error.message);
      }
    }
  };

  handleReturn = () => {
    if (this.vendingMachine.getHoldingMoney() === 0) {
      alertSnackBar(ERROR_MESSAGE.NOT_ENOUGH_RECHARGE);
      return;
    }
    const decreasedCounts = this.vendingMachine.returnCoins();
    this.renderReturnCoinTable(decreasedCounts);
    this.renderPurchaseProduct();
    alertSnackBar(SUCCESS_MESSAGE.RETURN_COIN);
  };

  renderReturnCoinTable = (decreasedCounts: number[]) => {
    this.$$returnCoins.forEach(($returnCoin, index) => {
      $returnCoin.textContent = String(decreasedCounts[index]);
    });
  };

  renderPurchaseProduct = () => {
    this.$purchaseMoney.textContent = String(this.vendingMachine.purchaseMoney.money);
    this.$purchaseInput.value = '';

    this.renderAvailableProduct();
  };

  renderAvailableProduct = () => {
    const template = this.vendingMachine.products
      .map(({ name, price, quantity }) => {
        return `
          <tr class="product-row" data-name="${name}">
            <td class="product-row-name">${name}</td>
            <td class="product-row-price">${price}</td>
            <td class="product-row-quantity">${quantity}</td>
            <td>
              <button class="purchase-button small-button" data-name="${name}">구매</button>
            </td>
          </tr>
        `;
      })
      .join('');

    this.$availableProducts.innerHTML = template;
  };
}

export default PurchaseProductView;
