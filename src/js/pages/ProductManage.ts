import { Product } from '../interfaces/VendingMachine.interface';
import AddProductComponent from '../components/AddProductComponent';
import ProductListComponent from '../components/ProductListComponent';

export default class ProductManage {
  $inputSection: HTMLElement;
  $contentsContainer: HTMLElement;
  $productAddForm: HTMLElement;
  $userMenu: HTMLElement;
  $sectionContainer: HTMLElement;
  $loginInputSection: HTMLElement;
  AddProductComponent: AddProductComponent;
  ProductListComponent: ProductListComponent;

  constructor() {
    this.$userMenu = document.querySelector('.user-menu');
    this.$sectionContainer = document.querySelector('.section-container');
    this.$inputSection = document.querySelector('.input-section');
    this.$contentsContainer = document.querySelector('.contents-container');
    this.$loginInputSection = document.querySelector('#login-input-container');
    this.AddProductComponent = new AddProductComponent(this.$inputSection, this.stateChange);
    this.ProductListComponent = new ProductListComponent(this.$contentsContainer, this.stateChange);
  }

  render() {
    this.$userMenu.classList.remove('hide');
    this.$sectionContainer.classList.remove('hide');
    this.$loginInputSection.classList.add('hide');

    this.AddProductComponent.render();
    this.ProductListComponent.render();

    this.stateChange();
  }

  private stateChange = (state: string = '', product: Product = null) => {
    if (state === 'add') {
      this.ProductListComponent.addProductItem(product);
      return;
    }

    this.AddProductComponent.refreshComponent();
    this.ProductListComponent.refreshComponent();
  };
}
