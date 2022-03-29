import ProductInputComponent from './ProductInputComponent';
import ProductStateComponent from './ProductsStateComponent';

export default class ProductsComponent {
  constructor(private ProductsManager) {
    new ProductInputComponent(this.ProductsManager);
    new ProductStateComponent(this.ProductsManager);
  }
}
