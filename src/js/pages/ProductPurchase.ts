import ChangeListWrapper from '../components/ChangeListWrapper';
import PurchaseDialog from '../components/PurchaseDialog';
import showSnackbar from '../components/Snackbar';
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
  $changeReturnButton: HTMLButtonElement;

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
      }),
    );

    ChangeListWrapper.createElement({
      targetElement: this.$contentsContainer,
      title: '잔돈 반환',
      tabName: this.tabName,
    });

    this.$headerTitle = document.querySelector('#header-title');
    this.$headerTitle.textContent = '🍿 자판기 🍿';

    this.$moneyAddForm = this.$inputSection.querySelector('#money-add-form');
    this.$totalChange = this.$inputSection.querySelector('#total-money');
    this.$productList = this.$contentsContainer.querySelector('#product-list');

    this.$changeReturnButton = this.$contentsContainer.querySelector('#change-return-button');

    this.$productList.addEventListener('click', this.onClickPurchaseButton);
    this.$moneyAddForm.addEventListener('submit', this.onSubmitMoneyAdd);
    this.$changeReturnButton.addEventListener('click', this.onReturnChange);

    this.renderProducts();
    this.refreshUserMoney();
  }

  callbackSubmitQuantity = props => {
    const { quantity, product, li } = props;

    vendingMachine.purchaseProduct(product, quantity);
    li.querySelector('.product-amount').textContent = product.amount;
    this.refreshUserMoney();
  };

  onClickPurchaseButton = (e: PointerEvent) => {
    if (!(e.target instanceof HTMLButtonElement)) return;

    const li = e.target.closest('li');
    const name = li.querySelector('.product-name').textContent;

    const product = vendingMachine.getProduct(name);
    const userMoney = vendingMachine.getUserMoney();

    if (product.price > userMoney) {
      showSnackbar(ERROR_MESSAGE.TOO_SHORT_MONEY);
      return;
    }

    if (product.amount === 0) {
      showSnackbar(ERROR_MESSAGE.SOLD_OUT_PRODUCT);
      return;
    }

    PurchaseDialog({
      product,
      userMoney,
      callbackSubmitQuantity: this.callbackSubmitQuantity,
      li,
    });
  };

  onSubmitMoneyAdd = (e: SubmitEvent) => {
    e.preventDefault();
    const inputMoney = (<HTMLInputElement>this.$moneyAddForm.querySelector('#money-add-input')).valueAsNumber;

    try {
      vendingMachine.putMoney(inputMoney);
      this.refreshUserMoney();
    } catch (err) {
      showSnackbar(err.message);
    }
  };

  onReturnChange = (e: PointerEvent) => {
    try {
      const userChanges = vendingMachine.getUserChanges();
      ChangeListWrapper.setState(userChanges);
      this.refreshUserMoney();
    } catch (err) {
      showSnackbar(err.message);
    }
  };

  renderProducts() {
    const products = vendingMachine.getProducts();

    if (products.length === 0) return;

    this.$productList.appendChild(this.productsElement(products));
  }

  productsElement(products: Array<Product>) {
    const fragment = new DocumentFragment();

    products.forEach(product => {
      const li = document.createElement('li');
      li.insertAdjacentHTML('beforeend', template.purchaseProductItem(product));
      fragment.appendChild(li);
    });

    return fragment;
  }

  refreshUserMoney() {
    this.$totalChange.textContent = vendingMachine.getUserMoney().toLocaleString();
  }
}
