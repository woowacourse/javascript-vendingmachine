import { Product } from '../interfaces/VendingMachine.interface';
import AddProductComponent from '../components/AddProductComponent';
import ProductListComponent from '../components/ProductListComponent';

export default class ProductManage {
  $inputSection: HTMLElement;
  $contentsContainer: HTMLElement;
  $productAddForm: HTMLElement;
  AddProductComponent: AddProductComponent;
  ProductListComponent: ProductListComponent;

  constructor() {
    this.$inputSection = document.querySelector('.input-section');
    this.$contentsContainer = document.querySelector('.contents-container');
    this.AddProductComponent = new AddProductComponent(this.$inputSection, this.stateChange);
    this.ProductListComponent = new ProductListComponent(this.$contentsContainer, this.stateChange);
  }

  render() {
    this.AddProductComponent.render();
    this.ProductListComponent.render();

    this.stateChange();
  }

  stateChange = (state: string = '', product: Product = null) => {
    if (state === 'add') {
      this.ProductListComponent.addProductItem(product);
      return;
    }

    this.AddProductComponent.refreshComponent();
    this.ProductListComponent.refreshComponent();
  };
}
