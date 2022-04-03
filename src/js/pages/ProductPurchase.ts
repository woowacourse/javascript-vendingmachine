import PurchaseDialog from '../components/PurchaseDialog';
import { ERROR_MESSAGE } from '../constants';
import { Product, Coin } from '../interfaces/VendingMachine.interface';
import vendingMachine from '../model/VendingMachine';
import template from '../template';

export default class ProductPurchase {
  private tabName = 'ProductPurchase';
  $headerTitle: HTMLElement;
  $inputSection: HTMLElement;
  $contentsContainer: HTMLElement;
  $moneyAddForm: HTMLElement;
  $totalChange: HTMLElement;
  $productList: HTMLElement;
  $changeList: HTMLElement;
  $changeReturnButton: HTMLButtonElement;
  $amountCoin500: HTMLElement;
  $amountCoin100: HTMLElement;
  $amountCoin50: HTMLElement;
  $amountCoin10: HTMLElement;

  constructor() {
    this.$inputSection = document.querySelector('.input-section');
    this.$contentsContainer = document.querySelector('.contents-container');
  }

  render() {
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
      template.productListContainer({
        tabName: this.tabName,
        title: '구매 가능 상품 현황',
      }) +
        template.changeListWrapper({
          title: '잔돈 반환',
          tabName: this.tabName,
        }),
    );

    this.$headerTitle = document.querySelector('#header-title');
    this.$headerTitle.textContent = '🍿 자판기 🍿';

    this.$moneyAddForm = this.$inputSection.querySelector('#money-add-form');
    this.$totalChange = this.$inputSection.querySelector('#total-money');
    this.$productList = this.$contentsContainer.querySelector('#product-list');
    this.$changeList = this.$contentsContainer.querySelector('#change-list');

    this.$amountCoin500 = this.$changeList.querySelector('#amount-coin-500');
    this.$amountCoin100 = this.$changeList.querySelector('#amount-coin-100');
    this.$amountCoin50 = this.$changeList.querySelector('#amount-coin-50');
    this.$amountCoin10 = this.$changeList.querySelector('#amount-coin-10');
    this.$changeReturnButton = this.$contentsContainer.querySelector('#change-return-button');

    this.$productList.addEventListener('click', this.onClickPurchaseButton);
    this.$moneyAddForm.addEventListener('submit', this.onSubmitMoneyAdd);
    this.$changeReturnButton.addEventListener('click', this.onReturnChange);

    this.renderProducts();
    this.refreshUserMoney();
  }

  callbackSubmitQuantity = props => {
    const { quantity, product, ul, oldLi } = props;

    vendingMachine.purchaseProduct(product, quantity);
    oldLi.querySelector('.product-amount').textContent = product.amount;
    this.refreshUserMoney();
  };

  onClickPurchaseButton = (e: PointerEvent) => {
    if (!(e.target instanceof HTMLButtonElement)) return;

    const ul = e.target.closest('ul');
    const oldLi = e.target.closest('li');
    const name = oldLi.querySelector('.product-name').textContent;
    const price = parseInt(oldLi.querySelector('.product-price').textContent);
    const amount = parseInt(oldLi.querySelector('.product-amount').textContent);
    const userMoney = vendingMachine.getUserMoney();

    if (price > userMoney) {
      alert(ERROR_MESSAGE.TOO_SHORT_MONEY);
      return;
    }

    if (amount === 0) {
      alert(ERROR_MESSAGE.SOLD_OUT_PRODUCT);
      return;
    }

    PurchaseDialog({
      product: { name, price, amount },
      userMoney,
      callbackSubmitQuantity: this.callbackSubmitQuantity,
      ul,
      oldLi,
    });
  };

  onSubmitMoneyAdd = (e: SubmitEvent) => {
    e.preventDefault();
    const inputMoney = (<HTMLInputElement>this.$moneyAddForm.querySelector('#money-add-input')).valueAsNumber;

    try {
      vendingMachine.putMoney(inputMoney);
      this.refreshUserMoney();
    } catch (message) {
      alert(message);
    }
  };

  onReturnChange = (e: PointerEvent) => {
    try {
      const userChanges = vendingMachine.getUserChanges();
      this.refreshUserChange(userChanges);
      this.refreshUserMoney();
    } catch (message) {
      alert(message);
    }
  };

  renderProducts() {
    const products = vendingMachine.getProducts();

    products.forEach(product => {
      this.renderProductItem(product);
    });
  }

  renderProductItem(product: Product) {
    const fragment = new DocumentFragment();
    const li = document.createElement('li');

    li.insertAdjacentHTML('beforeend', template.purchaseProductItem(product));
    fragment.appendChild(li);
    this.$productList.appendChild(fragment);
  }

  refreshUserChange(userChanges: Coin) {
    const { coin10, coin50, coin100, coin500 } = userChanges;

    this.$amountCoin500.textContent = coin500 + '개';
    this.$amountCoin100.textContent = coin100 + '개';
    this.$amountCoin50.textContent = coin50 + '개';
    this.$amountCoin10.textContent = coin10 + '개';
  }

  refreshUserMoney() {
    this.$totalChange.textContent = vendingMachine.getUserMoney().toLocaleString();
  }
}
