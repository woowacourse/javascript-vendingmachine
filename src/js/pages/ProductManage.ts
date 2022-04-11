import vendingMachine from '../model/VendingMachine';
import { Product } from '../interfaces/VendingMachine.interface';
import { REMOVE_CONFIRM_MESSAGE } from '../constants';
import template from '../template/index';
import showSnackbar from '../components/Snackbar';

export default class ProductManage {
  private tabName = 'ProductManage';
  $headerTitle: HTMLElement;
  $inputSection: HTMLElement;
  $contentsContainer: HTMLElement;
  $productAddForm: HTMLElement;
  $productList: HTMLElement;

  constructor() {
    this.$inputSection = document.querySelector('.input-section');
    this.$contentsContainer = document.querySelector('.contents-container');
  }

  render() {
    this.$inputSection.insertAdjacentHTML('beforeend', template.productManageContainer());
    this.$contentsContainer.insertAdjacentHTML(
      'beforeend',
      template.productListContainer({ tabName: this.tabName, title: '상품 현황' }),
    );

    this.$headerTitle = document.querySelector('#header-title');
    this.$headerTitle.textContent = '🍿 자판기 🍿';

    this.$productAddForm = this.$inputSection.querySelector('#product-add-form');
    this.$productList = this.$contentsContainer.querySelector('#product-list');
    this.$productAddForm.addEventListener('submit', this.onSubmitNewProduct);
    this.$productList.addEventListener('click', this.onClickModifyButton);
    this.$productList.addEventListener('click', this.onSubmitModifyCompleteButton);
    this.$productList.addEventListener('click', this.onClickRemoveButton);

    this.renderProducts();
  }

  onSubmitNewProduct = (e: SubmitEvent) => {
    e.preventDefault();

    const name = (<HTMLInputElement>this.$productAddForm.querySelector('#product-name-input')).value;
    const price = (<HTMLInputElement>this.$productAddForm.querySelector('#product-price-input')).valueAsNumber;
    const amount = (<HTMLInputElement>this.$productAddForm.querySelector('#product-amount-input')).valueAsNumber;

    const newProduct: Product = { name, price, amount };

    try {
      vendingMachine.addProduct(newProduct);
      this.renderProductItem(newProduct);
    } catch (err) {
      showSnackbar(err.message);
    }
  };

  onClickModifyButton = (e: PointerEvent) => {
    if ((<HTMLElement>e.target).className !== 'product-modify-button') {
      return;
    }

    const ul = (<HTMLElement>e.target).closest('ul');
    const oldLi = (<HTMLElement>e.target).closest('li');
    const product = {
      name: (<HTMLElement>oldLi.querySelector('.product-name')).textContent,
      price: parseInt((<HTMLElement>oldLi.querySelector('.product-price')).textContent),
      amount: parseInt((<HTMLElement>oldLi.querySelector('.product-amount')).textContent),
    };
    const newLi = this.replaceList(product, template.modifyProductItem);

    ul.replaceChild(newLi, oldLi);
  };

  onSubmitModifyCompleteButton = (e: PointerEvent) => {
    if ((<HTMLElement>e.target).className !== 'product-modify-submit-button') {
      return;
    }

    const ul = (<HTMLElement>e.target).closest('ul');
    const oldLi = (<HTMLElement>e.target).closest('li');
    const product = {
      name: (<HTMLInputElement>oldLi.querySelector('.product-name-modify-input')).value,
      price: (<HTMLInputElement>oldLi.querySelector('.product-price-modify-input')).valueAsNumber,
      amount: (<HTMLInputElement>oldLi.querySelector('.product-amount-modify-input')).valueAsNumber,
    };

    const prevName = (<HTMLElement>oldLi.querySelector('.product-modify-submit-button')).dataset.name;

    try {
      vendingMachine.modifyProduct(prevName, product);

      const newLi = this.replaceList(product, template.productItem);
      ul.replaceChild(newLi, oldLi);
    } catch (err) {
      showSnackbar(err.message);
    }
  };

  onClickRemoveButton = (e: PointerEvent) => {
    if ((<HTMLElement>e.target).className !== 'product-remove-button') {
      return;
    }

    if (!window.confirm(REMOVE_CONFIRM_MESSAGE)) {
      return;
    }

    const parentList = (<HTMLElement>e.target).closest('li');
    const name = (<HTMLElement>parentList.querySelector('.product-name')).textContent;

    vendingMachine.removeProduct(name);
    parentList.remove();
  };

  replaceList = (product: Product, component: Function) => {
    const fragment = new DocumentFragment();
    const li = document.createElement('li');

    li.insertAdjacentHTML('beforeend', component(product));
    fragment.appendChild(li);

    return fragment;
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

    li.insertAdjacentHTML('beforeend', template.productItem(product));
    fragment.appendChild(li);
    this.$productList.appendChild(fragment);
  }
}
