import vendingMachine from '../model/VendingMachine';
import { Product } from '../interfaces/VendingMachine.interface';
import AddProductComponent from '../components/AddProductComponent';
import ProductListComponent from '../components/ProductListComponent';
import ProductItemComponent from '../components/ProductItemComponent';
import ModifyProductComponent from '../components/ModifyProductComponent';
import { REMOVE_CONFIRM_MESSAGE } from '../constants';

export default class ProductManage {
  $inputSection: HTMLElement;
  $contentsContainer: HTMLElement;
  $productAddForm: HTMLElement;
  $productList: HTMLElement;

  constructor() {
    this.$inputSection = document.querySelector('.input-section');
    this.$contentsContainer = document.querySelector('.contents-container');
  }

  render() {
    this.$inputSection.insertAdjacentHTML('beforeend', AddProductComponent());
    this.$contentsContainer.insertAdjacentHTML('beforeend', ProductListComponent());

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
    const price = (<HTMLInputElement>this.$productAddForm.querySelector('#product-price-input')).value;
    const amount = (<HTMLInputElement>this.$productAddForm.querySelector('#product-amount-input')).value;

    const newProduct: Product = {
      name: name,
      price: parseInt(price),
      amount: parseInt(amount),
    };

    try {
      vendingMachine.addProduct(newProduct);
      this.renderProductItem(newProduct);
    } catch (message) {
      alert(message);
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
    const newLi = this.replaceList(product, ModifyProductComponent);

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
      price: parseInt((<HTMLInputElement>oldLi.querySelector('.product-price-modify-input')).value),
      amount: parseInt((<HTMLInputElement>oldLi.querySelector('.product-amount-modify-input')).value),
    };

    const prevName = (<HTMLElement>oldLi.querySelector('.product-modify-submit-button')).dataset.name;

    try {
      vendingMachine.modifyProduct(prevName, product);

      const newLi = this.replaceList(product, ProductItemComponent);
      ul.replaceChild(newLi, oldLi);
    } catch (message) {
      alert(message);
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

    li.insertAdjacentHTML('beforeend', ProductItemComponent(product));
    fragment.appendChild(li);
    this.$productList.appendChild(fragment);
  }
}
