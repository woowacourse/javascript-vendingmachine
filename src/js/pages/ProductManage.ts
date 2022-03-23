import vendingMachine from '../model/VendingMachine';
import { Product } from '../interfaces/VendingMachine.interface';
import AddProductComponent from '../components/AddProductComponent';
import ProductListComponent from '../components/ProductListComponent';
import ProductItemComponent from '../components/ProductItemComponent';

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
      this.addProductItem(newProduct);
    } catch (message) {
      alert(message);
    }
  };

  renderProducts() {
    const products = vendingMachine.getProducts();
    console.log('products', products);
    products.forEach(product => {
      this.addProductItem(product);
    });
  }

  addProductItem(product: Product) {
    this.$productList.insertAdjacentHTML('beforeend', ProductItemComponent(product));
  }
}
