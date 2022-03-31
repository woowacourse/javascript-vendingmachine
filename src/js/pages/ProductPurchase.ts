import { Product } from '../interfaces/VendingMachine.interface';
import vendingMachine from '../model/VendingMachine';
import template from '../template';

export default class ProductPurchase {
  $inputSection: HTMLElement;
  $contentsContainer: HTMLElement;
  $productList: HTMLElement;
  $changeList: HTMLElement;
  $amountCoin500: HTMLElement;
  $amountCoin100: HTMLElement;
  $amountCoin50: HTMLElement;
  $amountCoin10: HTMLElement;

  constructor() {
    this.$inputSection = document.querySelector('.input-section');
    this.$contentsContainer = document.querySelector('.contents-container');
  }

  render() {
    console.log('productPurchase render');
    this.$inputSection.insertAdjacentHTML(
      'beforeend',
      template.moneyAddContainer({
        labelText: '상품을 구매할 금액을 투입해주세요',
        buttonText: '투입',
        resultText: '투입한 금액',
      }),
    );
    this.$contentsContainer.insertAdjacentHTML(
      'beforeend',
      template.productListContainer() + template.changeListWrapper(),
    );

    this.$productList = this.$contentsContainer.querySelector('#product-list');
    this.$changeList = this.$contentsContainer.querySelector('#change-list');

    this.$amountCoin500 = this.$changeList.querySelector('#amount-coin-500');
    this.$amountCoin100 = this.$changeList.querySelector('#amount-coin-100');
    this.$amountCoin50 = this.$changeList.querySelector('#amount-coin-50');
    this.$amountCoin10 = this.$changeList.querySelector('#amount-coin-10');

    this.renderProducts();
    this.refreshChange();
  }

  renderProducts() {
    const products = vendingMachine.getProducts();

    products.forEach(product => {
      this.renderProductItem(product);
    });
  }

  renderProductItem(product: Product) {
    const fragment = new DocumentFragment();
    const li = document.createElement('li');

    li.insertAdjacentHTML('beforeend', template.productItem(product));
    fragment.appendChild(li);
    this.$productList.appendChild(fragment);
  }

  refreshChange() {
    // this.$totalChange.textContent = vendingMachine.getTotalMoney().toString();
    const { coin10, coin50, coin100, coin500 } = vendingMachine.getChanges();

    this.$amountCoin500.textContent = coin500 + '개';
    this.$amountCoin100.textContent = coin100 + '개';
    this.$amountCoin50.textContent = coin50 + '개';
    this.$amountCoin10.textContent = coin10 + '개';
  }
}
